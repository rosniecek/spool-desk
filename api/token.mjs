import { TOKEN_CA } from '../src/config.mjs';
import { readState } from '../server/store.mjs';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Use GET.'});
 let s={};try{s=(await readState()).data;}catch{}
 const pinned=s.launchState?.pinned;
 res.status(200).json({mint:TOKEN_CA||pinned?.mint||null,status:TOKEN_CA?'configured':pinned?'verified':s.identitySettings?'watching':'unconfigured',proof:pinned?.mint===(TOKEN_CA||pinned?.mint)?pinned:null,lastScheduledCompletion:s.lastScheduledCompletion||null,schedule:'Daily at 09:00 UTC; no active discovery until a dedicated wallet is configured.'});
}
