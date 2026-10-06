import http from 'node:http';
import { createServer } from 'vite';
import inspect from '../api/inspect.mjs';import token from '../api/token.mjs';import watch from '../api/watch.mjs';
const vite=await createServer({server:{middlewareMode:true},appType:'spa'});
http.createServer((req,res)=>{res.status=n=>(res.statusCode=n,res);res.json=data=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));};const path=new URL(req.url,'http://localhost').pathname;const h={'/api/inspect':inspect,'/api/token':token,'/api/watch':watch}[path];if(h)Promise.resolve(h(req,res)).catch(()=>res.status(500).json({error:'Request failed.'}));else vite.middlewares(req,res);}).listen(5251,'127.0.0.1',()=>console.log('SPOOL http://127.0.0.1:5251'));
