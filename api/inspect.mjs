import { analyze } from '../server/analyze.mjs';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Use GET.'});
 const mint=new URL(req.url,'http://localhost').searchParams.get('mint')||'';
 try{return res.status(200).json(await analyze(mint));}catch(e){return res.status(e.status||503).json({error:e.status?e.message:'The inspection could not finish. Retry shortly.'});}
}
