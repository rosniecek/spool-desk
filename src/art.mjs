export const P={paper:'#f0eee3',ink:'#252c25',moss:'#67755a',line:'#c9cebd',orange:'#ec784b',light:'#ffce94',cream:'#fff8da'};
const rect=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
export function mark(c,x,y,s=5,color=P.orange){const rows=['1111111111','1111111111','0011111100','0010011100','0010011100','0011100100','0011100100','0011111100','1111111111','1111111111'];rows.forEach((r,j)=>[...r].forEach((v,i)=>v==='1'&&rect(c,x+i*s,y+j*s,s,s,color)));}
export function keeper(c,x,y,s=3,t=0){const step=Math.floor(t*5)%2;rect(c,x-2*s,y+32*s,23*s,2*s,'#bec3b0');rect(c,x+4*s,y+25*s,5*s,8*s,P.ink);rect(c,x+13*s,y+25*s,5*s,8*s,P.ink);rect(c,x+2*s,y+(32-step)*s,7*s,2*s,P.ink);rect(c,x+13*s,y+(31+step)*s,7*s,2*s,P.ink);rect(c,x+2*s,y+13*s,18*s,13*s,P.moss);rect(c,x+6*s,y+14*s,10*s,13*s,P.orange);rect(c,x+9*s,y+17*s,4*s,5*s,P.cream);rect(c,x-2*s,y+15*s,4*s,10*s,P.moss);rect(c,x+20*s,y+14*s,4*s,9*s,P.moss);rect(c,x+20*s,y+22*s,7*s,3*s,P.light);rect(c,x+4*s,y+3*s,15*s,11*s,P.light);rect(c,x+2*s,y+2*s,17*s,5*s,P.ink);rect(c,x+1*s,y+6*s,21*s,3*s,P.ink);rect(c,x+12*s,y+9*s,3*s,2*s,P.ink);rect(c,x+17*s,y+9*s,3*s,2*s,P.ink);rect(c,x+12*s,y+8*s,8*s,1*s,P.cream);}
export function scene(c,w,h,t=0,progress=1){
 const scale=Math.min(w/800,h/430);c.save();c.translate((w-800*scale)/2,(h-430*scale)/2);c.scale(scale,scale);
 const r=(x,y,w,h,color)=>rect(c,x,y,w,h,color);
 r(0,0,800,430,'#242e29');
 // Architectural light, tiled floor and a warm pool of lamplight.
 const glow=c.createRadialGradient(480,165,10,480,165,330);glow.addColorStop(0,'#45503a');glow.addColorStop(1,'#242e29');c.fillStyle=glow;c.fillRect(0,0,800,360);
 r(0,343,800,87,'#202822');for(let x=-80;x<900;x+=70){c.strokeStyle='#344034';c.lineWidth=1;c.beginPath();c.moveTo(400+(x-400)*.65,343);c.lineTo(x,430);c.stroke();}for(const y of [352,370,397,429])r(0,y,800,1,'#344034');
 r(38,37,218,181,'#18221f');r(43,42,208,171,'#56624c');r(48,47,198,161,'#394636');
 for(let i=0;i<4;i++){const x=61+(i%2)*90,y=65+Math.floor(i/2)*72;r(x+3,y+3,68,52,'#28362b');r(x,y,68,52,i===2?'#d49c69':'#d9d8b7');r(x+29,y-4,12,9,'#9a9f78');for(let j=0;j<3;j++)r(x+10,y+14+j*9,42-j*7,3,'#8e9778');}
 c.strokeStyle='#ed8454';c.lineWidth=2;c.beginPath();c.moveTo(95,97);c.lineTo(185,169);c.lineTo(185,97);c.lineTo(95,169);c.stroke();for(const [x,y]of [[95,97],[185,169],[185,97],[95,169]])r(x-3,y-3,6,6,'#ffb681');
 // Shelves and archive drawers with inset fronts.
 r(565,71,178,11,'#101c18');r(576,44,20,27,'#899278');r(599,34,14,37,'#d38556');r(616,41,23,30,'#657859');r(649,51,47,20,'#bbc2a0');r(654,54,38,4,'#77896a');
 r(578,149,151,196,'#17211c');r(571,144,149,193,'#728064');r(571,144,149,7,'#9ba485');
 for(let j=0;j<3;j++){const y=159+j*56;r(580,y,130,47,'#485b47');r(583,y+3,124,3,'#839073');r(619,y+13,48,15,'#c0c6a5');r(627,y+18,31,3,'#5d6e55');r(632,y+34,23,4,'#17271e');}r(582,337,10,12,'#0e1b15');r(698,337,10,12,'#0e1b15');
 // Workbench, readable monitor, papers and physical spool.
 r(278,258,278,12,'#b78351');r(280,270,274,8,'#624b34');r(294,278,13,75,'#111e18');r(525,278,13,75,'#111e18');r(307,324,218,5,'#475640');
 r(307,175,88,66,'#14221c');r(311,179,80,53,'#7f9b72');r(316,184,70,43,'#203e2d');for(let j=0;j<4;j++){r(322,191+j*8,5,3,'#e79c62');r(331,191+j*8,39-j*5,3,'#90b47b');}r(344,241,12,12,'#101e17');r(329,252,43,5,'#101e17');
 r(412,246,42,11,'#e1dfbe');r(417,241,39,6,'#f8e6c0');r(424,245,21,2,'#aaa27c');
 const bob=Math.sin(t*1.3)*2;mark(c,454,180+bob,6,'#ec8455');r(465,194+bob,38,3,'#fcb180');r(465,201+bob,38,2,'#ad5938');r(465,207+bob,38,2,'#ffb47f');r(465,215+bob,38,2,'#ad5938');
 // Adjustable task lamp.
 r(521,245,25,8,'#17241c');r(531,124,6,124,'#bdbe91');r(494,122,44,5,'#bdbe91');r(478,128,43,7,'#d6c087');r(472,135,55,10,'#e8dca0');r(481,145,37,4,'#fbeabb');
 c.fillStyle='rgba(245,218,145,.055)';c.beginPath();c.moveTo(477,149);c.lineTo(522,149);c.lineTo(562,258);c.lineTo(414,258);c.closePath();c.fill();
 // Bobbin follows a thread to the bench; decorative, never fake activity.
 const x=151-92*(1-progress);c.save();c.translate(x,221);keeper(c,0,0,3.7,Math.sin(t*.5)*.15);c.restore();
 c.strokeStyle='#ee9360';c.lineWidth=3;c.beginPath();c.moveTo(x+98,307);c.lineTo(264,307);c.lineTo(264,211);c.lineTo(264+215*progress,211);c.stroke();r(258,301,12,12,'#ffb27c');
 for(let i=0;i<5;i++){const py=73+((t*7+i*61)%210);r(287+i*49,py,2,2,'rgba(245,218,145,.22)');}
 r(43,280,60,61,'#2d422f');r(48,286,50,53,'#40563b');r(67,253,9,38,'#718457');r(51,257,22,13,'#91a26a');r(72,244,26,12,'#667d4f');r(60,238,14,18,'#acb580');
 c.restore();
}
export function brand(c,w,h,kind='banner',t=3,variant=0){c.clearRect(0,0,w,h);if(kind==='transparent'){mark(c,w*.18,h*.18,w*.064);return;}rect(c,0,0,w,h,P.paper);if(kind==='avatar'||kind==='logo'||kind==='mark'){rect(c,0,0,w,h,P.ink);mark(c,w*.2,h*.2,w*.06,P.orange);return;}
const sx=w/1500,sy=h/500;c.save();c.scale(sx,sy);rect(c,0,0,1500,500,P.paper);for(let i=0;i<30;i++)rect(c,i*54,0,1,500,'#e6e6d9');rect(c,52,48,16,16,P.orange);c.fillStyle=P.ink;c.font='600 20px "IBM Plex Mono"';c.fillText('SPOOL / SOLANA INVESTIGATION DESK',84,65);
const title=variant===1?'Less noise.':variant===2?'Keep the evidence.':'Pull the thread.';let fs=83;c.font=`700 ${fs}px "Space Grotesk"`;while(c.measureText(title).width>680){fs--;c.font=`700 ${fs}px "Space Grotesk"`;}c.fillText(title,50,198);c.font='400 24px "Space Grotesk"';c.fillText(variant===1?'Mint authorities. Real markets. Clear sources.':variant===2?'Export the snapshot. Bring the sources.':'One token address. A clearer picture.',54,245);c.font='400 15px "IBM Plex Mono"';c.fillText('READ-ONLY  /  NO WALLET REQUIRED',54,422);c.save();c.translate(754,110+Math.sin(t)*4);scene(c,715,320,t);c.restore();rect(c,50,465,1400,2,P.ink);c.restore();}
export function film(c,w,h,t=0,variant=0){brand(c,w,h,'banner',t,variant);const progress=Math.min(1,t/1.4);if(progress<1){c.fillStyle=P.paper;c.fillRect(w*progress,0,w*(1-progress),h);}c.fillStyle=P.orange;c.fillRect(0,h-7,w*Math.min(t/8,1),7);}
