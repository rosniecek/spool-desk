import { createHash } from 'node:crypto';
import { isAddress } from './pump.mjs';
import { createRpc, MAINNET_GENESIS } from './rpc.mjs';
export const PROGRAMS = ['TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA','TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'];
export function parseMint(r){
 const a=r?.value, info=a?.data?.parsed?.info;
 if(!a) throw Error('No account found at this address.');
 if(!PROGRAMS.includes(a.owner)||a.data?.parsed?.type!=='mint'||!info?.isInitialized||!Number.isSafeInteger(r.context?.slot)||!Number.isInteger(info.decimals)||info.decimals<0||info.decimals>255||!/^\d+$/.test(info.supply)||![info.mintAuthority,info.freezeAuthority].every(v=>v===null||isAddress(v))) throw Error('This address is not a supported initialized SPL mint.');
 return {slot:r.context.slot,program:a.owner,supply:info.supply,decimals:info.decimals,mintAuthority:info.mintAuthority,freezeAuthority:info.freezeAuthority,extensions:info.extensions||[]};
}
const number = v => typeof v==='number'&&Number.isFinite(v)&&v>=0?v:null;
export function parsePairs(raw,mint){
 if(!Array.isArray(raw))throw Error('Market provider returned an invalid response.');
 return raw.filter(p=>p.chainId==='solana'&&p.baseToken?.address===mint&&isAddress(p.pairAddress)).map(p=>({address:p.pairAddress,dex:String(p.dexId||'Unknown').slice(0,50),name:String(p.baseToken.name||'Unnamed').slice(0,100),symbol:String(p.baseToken.symbol||'?').slice(0,20),quote:String(p.quoteToken?.symbol||'?').slice(0,20),priceUsd:p.priceUsd&&Number.isFinite(Number(p.priceUsd))&&Number(p.priceUsd)>=0?Number(p.priceUsd):null,liquidity:number(p.liquidity?.usd),volume24h:number(p.volume?.h24),marketCap:number(p.marketCap),createdAt:number(p.pairCreatedAt)})).sort((a,b)=>(b.liquidity??-1)-(a.liquidity??-1)).slice(0,30);
}
export async function analyze(mint,{rpc=createRpc(),fetcher=fetch,now=()=>new Date().toISOString()}={}){
 if(!isAddress(mint))throw Object.assign(Error('Enter a valid Solana mint address (32-byte base58).'),{status:400});
 const startedAt=now();
 const [chain,market]=await Promise.allSettled([
 (async()=>{if(await rpc('getGenesisHash')!==MAINNET_GENESIS)throw Error('RPC network identity is not Solana mainnet.');return parseMint(await rpc('getAccountInfo',[mint,{encoding:'jsonParsed',commitment:'finalized'}]));})(),
 (async()=>{const r=await fetcher(`https://api.dexscreener.com/token-pairs/v1/solana/${mint}`,{signal:AbortSignal.timeout(12000),redirect:'error'});if(!r.ok)throw Error('DEX Screener is unavailable. Retry later.');const body=await r.text();if(body.length>2000000)throw Error('Market response exceeded the size limit.');return parsePairs(JSON.parse(body),mint);})()
 ]);
 const report={version:'spool/1',mint,startedAt,completedAt:now(),status:chain.status==='fulfilled'&&market.status==='fulfilled'?'complete':'partial',chain:chain.status==='fulfilled'?chain.value:null,pairs:market.status==='fulfilled'?market.value:[],sources:[{name:'Solana mainnet RPC',status:chain.status==='fulfilled'?'observed':'unavailable',error:chain.status==='rejected'?chain.reason.message:null,url:`https://solscan.io/token/${mint}`},{name:'DEX Screener',status:market.status==='fulfilled'?'observed':'unavailable',error:market.status==='rejected'?'Market provider unavailable. Retry this scan.':null,url:`https://dexscreener.com/solana/${mint}`}],limits:['Snapshot, not continuous monitoring.','No holder concentration, liquidity-lock, honeypot or creator checks.','Revoked authorities do not prove that a token is safe.','Token-2022 extension details are raw RPC data, not a full transfer-policy analysis.','DEX prices and liquidity are provider estimates. Upstream observation age is unknown.']};
 report.checksum=createHash('sha256').update(JSON.stringify(report)).digest('hex');
 return report;
}
