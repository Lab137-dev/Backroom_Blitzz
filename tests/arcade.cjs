const fs=require('node:fs'),vm=require('node:vm');
const elements=new Map(),buttons=[];function el(){return {hidden:false,style:{},textContent:'',disabled:false,dataset:{},setAttribute(){},addEventListener(){},setPointerCapture(){},getContext(){return new Proxy({},{get:()=>()=>{},set:()=>true})}};}
const document={hidden:false,getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},querySelectorAll(){return buttons},addEventListener(){}};
const sandbox={document,window:{addEventListener(){}},localStorage:{getItem(){return null},setItem(){}},requestAnimationFrame(){},console,Math};vm.createContext(sandbox);const html=fs.readFileSync(process.argv[2]||'index.html','utf8');vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`
reset();if(boxes.length!==1||mode!=='playing')throw Error('start');
const first=front();sort(first.kind);if(score!==100||combo!==1||resolved!==1)throw Error('correct sort');
spawn();sort(KINDS.find(k=>k!==front().kind));if(lives!==4||combo!==0)throw Error('wrong sort');
pause();const time=elapsed;update(1);if(elapsed!==time||mode!=='paused')throw Error('pause');pause();
spawn();front().y=531;update(.01);if(lives!==3)throw Error('miss');
reset();spawned=18;boxes=[];spawn();sort(front().kind);if(slow!==6)throw Error('pizza');
reset();while(mode==='playing'){if(!boxes.length)spawn();sort(front().kind);}if(resolved!==88||score<=0||lives!==5||mode!=='ended')throw Error('win');
reset();while(mode==='playing'){if(!boxes.length)spawn();sort(KINDS.find(k=>k!==front().kind));}if(lives!==0||resolved!==5)throw Error('loss');
for(const kind of KINDS)for(const item of MERCH[kind])for(let pattern=0;pattern<3;pattern++)merchandise(450,300,{kind,item,color:ITEM_COLORS[pattern],pattern,pizza:true});
for(let i=0;i<50;i++){reset();const b=front();if(!MERCH[b.kind].includes(b.item)||!ITEM_COLORS.includes(b.color))throw Error('merchandise mapping');}
reset();draw();if(score||resolved||lives!==5||mode!=='playing')throw Error('restart');
`,sandbox);console.log('PASS: correct/wrong sort, misses, pause, pizza, full truck win, loss, restart, renderer calls');
