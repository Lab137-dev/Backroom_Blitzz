// Dependency-free smoke test of the real inline simulation; layout needs browser QA.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map();
function element(){return {style:{},dataset:{},textContent:'',className:'',clientWidth:1200,clientHeight:675,width:1200,height:675,setAttribute(){},append(){},replaceChildren(){},addEventListener(){},getBoundingClientRect(){return {width:1200,top:0,left:0}},getContext(){return ctx}};}
const ctx=new Proxy({measureText:()=>({width:30})},{get:(o,k)=>k in o?o[k]:()=>{},set:(o,k,v)=>(o[k]=v,true)});
const document={readyState:'loading',getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id)},querySelectorAll(){return []},createElement:element,addEventListener(){}};
const sandbox={document,window:{devicePixelRatio:1,addEventListener(){}},performance:{now:()=>100},console,setTimeout(){},setInterval(){},clearInterval(){},Math};vm.createContext(sandbox);
const html=fs.readFileSync('index.html','utf8');vm.runInContext(html.match(/<script>\s*([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`
SFX_ENABLED=false;startGame();
if(state.palletsTotal<6)throw Error('missing truck');
state.crew.forEach(w=>{w.status='work';w.visible=true;w.arrival=0;w.mBreak=9999;w.lunch=9999;w.aBreak=9999;});
state.selectedWorker=state.crew[0];assignJob('freight');
for(let i=0;i<90;i++){simMinute();state.crew.forEach(w=>{if(w.visible&&w.status==='work'&&!w.task)assignShuttle(w);});}
if(!state.boxesDone)throw Error('no freight processed');
if(state.crew.some(w=>!Number.isFinite(w.x)||!Number.isFinite(w.y)))throw Error('invalid positions');
const worker=state.crew[0];worker.visible=false;worker.status='break';worker.nextStatusChange=state.minute+15;simMinute();if(worker.status!=='break'||worker.visible)throw Error('break interrupted by arrival');

for(const [label,duration,status] of [['break',15,'break'],['lunch',45,'break'],['assist',20,'assist'],['rest',30,'rest']]){
  startGame();state.crew=[makeWorker(0)];const w=state.crew[0];w.status='work';w.visible=true;w.arrival=0;w.mBreak=w.lunch=w.aBreak=9999;
  if(status==='rest')startRest(w);else if(status==='assist')startAssist(w,duration,label);else startBreak(w,duration,label);
  for(let i=0;i<duration-1;i++)simMinute();
  if(w.status!==status)throw Error(label+' ended early');
  simMinute();if(w.status!=='work'||!w.visible)throw Error(label+' did not return');
  for(let i=0;i<3;i++)simMinute();
  if(!w.task||!['workPallet','bringPallet'].includes(w.task.kind))throw Error(label+' did not resume freight');
}
startGame();const departed=makeWorker(6);departed.name='Rando-1';departed.status='assist';departed.visible=false;departed.nextStatusChange=0;bannedNames.add(departed.name);state.crew=[departed];simMinute();if(departed.visible||departed.status==='work')throw Error('departed temp returned');
const before=state.minute;state.paused=true;tick(100);if(state.minute!==before)throw Error('pause advanced time');
startGame();if(state.boxesDone!==0||state.level!==1||state.paused)throw Error('restart failed');
setupCanvas();draw();
`,sandbox);
assert.ok(html.startsWith('<!DOCTYPE html>'));
console.log('PASS: freight processing, worker positions, break handling, pause, restart, renderer smoke test');
