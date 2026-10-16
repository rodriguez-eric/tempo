/* Pure timer transitions. Absolute deadlines keep time after a suspended tab. */
(function(root){
 const presets={writing:{label:'Writing',focus:25,short:5,long:15,every:4},grading:{label:'Grading',focus:40,short:10,long:20,every:4},deep:{label:'Deep work',focus:50,short:10,long:20,every:4}};
 const defaults={focus:25,short:5,long:15,every:4,sound:true,awake:false};
 function fresh(settings={...defaults}){return {settings,mode:'focus',duration:settings.focus*60000,remaining:settings.focus*60000,endAt:null,running:false,cycle:0,task:'',sessionTask:'',history:[],id:null};}
 function left(s,now){return Math.max(0,s.running?s.endAt-now:s.remaining);}
 function start(s,now,id){if(s.running)return s;return {...s,running:true,endAt:now+s.remaining,id:s.id||id,sessionTask:s.id?s.sessionTask:s.task};}
 function pause(s,now){return {...s,remaining:left(s,now),running:false,endAt:null};}
 function select(s,mode){return {...s,mode,duration:s.settings[mode]*60000,remaining:s.settings[mode]*60000,running:false,endAt:null,id:null,sessionTask:''};}
 function nextMode(s){return s.mode==='focus'?(s.cycle+1>=s.settings.every?'long':'short'):'focus';}
 function finish(s,now,credit=true,early=false){
  const next=nextMode(s);let cycle=s.cycle,history=s.history;
  if(s.mode==='focus'&&credit){cycle+=1;history=[...history,{id:s.id,task:s.sessionTask,minutes:(early?s.duration-left(s,now):s.duration)/60000,endedAt:early?now:(s.endAt||now),early}].slice(-500);}
  if(s.mode==='long')cycle=0;
  const result=select({...s,cycle,history},credit?next:(s.mode==='focus'?(cycle>=s.settings.every?'long':'short'):'focus'));
  return result;
 }
 function extend(s,now){if(s.running&&left(s,now)<=0)return s;return {...s,duration:s.duration+300000,remaining:s.remaining+300000,endAt:s.running?s.endAt+300000:s.endAt};}
 function finishEarly(s,now){if(s.mode!=='focus'||!s.id||s.duration-left(s,now)<1000)return s;return finish(s,now,true,true);}
 function currentPreset(s){return Object.keys(presets).find(key=>['focus','short','long','every'].every(k=>s.settings[k]===presets[key][k]))||null;}
 function applyPreset(s,key){const p=presets[key];if(!p)return s;const {label,...durations}=p;return select({...s,settings:{...s.settings,...durations}},'focus');}
 const api={presets,currentPreset,applyPreset,defaults,fresh,left,start,pause,select,nextMode,finish,extend,finishEarly};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TimerCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
