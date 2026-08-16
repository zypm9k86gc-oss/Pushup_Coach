
const PLAN_START = new Date("2026-08-17T00:00:00");
const GOAL_DATE = new Date("2026-10-31T23:59:59");

const targets = [
  {pushups:80, plank:70},
  {pushups:90, plank:80},
  {pushups:100, plank:90},
  {pushups:120, plank:105},
  {pushups:140, plank:120},
  {pushups:160, plank:135},
  {pushups:120, plank:105, deload:true},
  {pushups:180, plank:150},
  {pushups:220, plank:180},
  {pushups:280, plank:240},
  {pushups:320, plank:270},
  {pushups:356, plank:300}
];

const checkpoints = [
  ["30.08.2026","90 Liegestütze / 80 s Plank"],
  ["20.09.2026","140 Liegestütze / 120 s Plank"],
  ["04.10.2026","Deload abgeschlossen"],
  ["25.10.2026","280 Liegestütze / 4:00 Plank"],
  ["31.10.2026","356 Liegestütze / 5:00 Plank"]
];

const STORAGE_KEY = "pushupPlankCoach.v1";

let state = {
  todayDate: todayKey(),
  todayPushups: 0,
  todayPlank: 0,
  records: []
};

let timer = null;
let timerStart = null;
let timerElapsed = 0;

function todayKey(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function fmtTime(sec){
  sec = Math.max(0, Math.floor(sec));
  return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,"0")}`;
}

function fmtLong(sec){
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec/3600);
  const m = Math.floor((sec%3600)/60);
  const s = sec%60;
  return h ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
}

function currentTarget(){
  const now = new Date();
  if(now >= GOAL_DATE) return {pushups:356, plank:300};
  const days = Math.max(0, Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate()) - PLAN_START)/86400000));
  const week = Math.min(Math.floor(days/7), targets.length-1);
  return targets[week];
}

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) state = {...state, ...JSON.parse(raw)};
  }catch(e){}
  rollover();
}

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function rollover(){
  const t = todayKey();
  if(state.todayDate !== t){
    if(state.todayPushups > 0 || state.todayPlank > 0){
      state.records.push({
        date: state.todayDate,
        pushups: state.todayPushups,
        plank: state.todayPlank
      });
    }
    state.todayDate = t;
    state.todayPushups = 0;
    state.todayPlank = 0;
    save();
  }
}

function totals(){
  const completedPush = state.records.reduce((a,r)=>a+(r.pushups||0),0);
  const completedPlank = state.records.reduce((a,r)=>a+(r.plank||0),0);
  const bestPush = Math.max(state.todayPushups, ...state.records.map(r=>r.pushups||0), 0);
  const bestPlank = Math.max(state.todayPlank, ...state.records.map(r=>r.plank||0), 0);
  return {
    pushups: completedPush,
    plank: completedPlank,
    bestPush,
    bestPlank
  };
}

function render(){
  rollover();
  const t = currentTarget();
  const pushPct = Math.min(100, Math.round(t.pushups/356*100));
  const plankPct = Math.min(100, Math.round(t.plank/300*100));
  const todayPushPct = Math.min(100, Math.round(state.todayPushups/t.pushups*100));
  const todayPlankPct = Math.min(100, Math.round(state.todayPlank/t.plank*100));

  document.querySelector("#targetPushups").textContent = t.pushups;
  document.querySelector("#targetPlank").textContent = fmtTime(t.plank);
  document.querySelector("#goalPushPercent").textContent = pushPct+"%";
  document.querySelector("#goalPlankPercent").textContent = plankPct+"%";
  document.querySelector("#goalPushProgress").value = t.pushups;
  document.querySelector("#goalPlankProgress").value = t.plank;

  document.querySelector("#todayPushups").textContent = state.todayPushups;
  document.querySelector("#todayPushTarget").textContent = t.pushups;
  document.querySelector("#todayPushPercent").textContent = todayPushPct+"%";
  document.querySelector("#todayPushProgress").max = t.pushups;
  document.querySelector("#todayPushProgress").value = state.todayPushups;

  document.querySelector("#todayPlank").textContent = fmtTime(state.todayPlank);
  document.querySelector("#todayPlankTarget").textContent = fmtTime(t.plank);
  document.querySelector("#todayPlankPercent").textContent = todayPlankPct+"%";
  document.querySelector("#todayPlankProgress").max = t.plank;
  document.querySelector("#todayPlankProgress").value = state.todayPlank;

  const x = totals();
  document.querySelector("#totalPushups").textContent = x.pushups;
  document.querySelector("#totalPlankSeconds").textContent = x.plank;
  document.querySelector("#bestPushups").textContent = x.bestPush;
  document.querySelector("#bestPlank").textContent = fmtTime(x.bestPlank);
  document.querySelector("#totalPlankTime").textContent = fmtLong(x.plank);

  document.querySelector("#checkpoints").innerHTML =
    checkpoints.map(c=>`<div class="checkpoint"><span class="date">${c[0]}</span><span>${c[1]}</span></div>`).join("");

  const hist = [...state.records].reverse();
  document.querySelector("#history").innerHTML = hist.length
    ? hist.map(r=>`<div class="history-row"><span>${r.date}</span><strong>${r.pushups} LS</strong><strong>${fmtTime(r.plank)}</strong></div>`).join("")
    : `<div class="empty">Noch keine abgeschlossenen Trainingstage.</div>`;
}

document.querySelectorAll("[data-add]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    state.todayPushups += Number(btn.dataset.add);
    save(); render();
  });
});

document.querySelector("#addPushBtn").addEventListener("click", ()=>{
  const inp = document.querySelector("#pushInput");
  const n = Number(inp.value);
  if(n > 0){
    state.todayPushups += n;
    inp.value = "";
    save(); render();
  }
});

document.querySelector("#finishWorkout").addEventListener("click", ()=>{
  if(state.todayPushups===0 && state.todayPlank===0) return;
  state.records.push({
    date: state.todayDate,
    pushups: state.todayPushups,
    plank: state.todayPlank
  });
  state.todayPushups = 0;
  state.todayPlank = 0;
  save(); render();
});

document.querySelector("#resetToday").addEventListener("click", ()=>{
  if(confirm("Heutige Eingaben wirklich löschen?")){
    state.todayPushups = 0;
    state.todayPlank = 0;
    save(); render();
  }
});

document.querySelector("#timerStart").addEventListener("click", ()=>{
  if(timer) return;
  timerStart = Date.now() - timerElapsed*1000;
  timer = setInterval(()=>{
    timerElapsed = Math.floor((Date.now()-timerStart)/1000);
    document.querySelector("#timerDisplay").textContent = fmtTime(timerElapsed);
  },250);
});

document.querySelector("#timerStop").addEventListener("click", ()=>{
  if(timer){
    clearInterval(timer); timer=null;
  }
  if(timerElapsed > 0){
    state.todayPlank += timerElapsed;
    save();
    timerElapsed = 0;
    document.querySelector("#timerDisplay").textContent = "0:00";
    render();
  }
});

document.querySelector("#timerReset").addEventListener("click", ()=>{
  if(timer){ clearInterval(timer); timer=null; }
  timerElapsed = 0;
  document.querySelector("#timerDisplay").textContent = "0:00";
});

document.querySelector("#themeBtn").addEventListener("click", ()=>{
  const cur = document.documentElement.dataset.theme;
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
});

const savedTheme = localStorage.getItem("theme");
if(savedTheme) document.documentElement.dataset.theme = savedTheme;

if("serviceWorker" in navigator){
  window.addEventListener("load", ()=>navigator.serviceWorker.register("sw.js"));
}

load();
render();
