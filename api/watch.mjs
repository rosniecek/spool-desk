import { timingSafeEqual } from 'node:crypto';
import { watchLaunch } from '../server/launch.mjs';
import { updateState } from '../server/store.mjs';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const expected=`Bearer ${process.env.CRON_SECRET||''}`,actual=req.headers.authorization||'';
 if(!process.env.CRON_SECRET||actual.length!==expected.length||!timingSafeEqual(Buffer.from(actual),Buffer.from(expected)))return res.status(401).json({error:'Unauthorized.'});
 if(req.method!=='GET')return res.status(405).json({error:'Use GET.'});
 try{const result=await watchLaunch();await updateState(s=>({...s,lastScheduledCompletion:new Date().toISOString()}));res.status(200).json(result);}catch{res.status(503).json({error:'Launch monitor unavailable. No address selected.'});}
}
