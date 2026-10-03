
const PLAN_START = new Date("2026-08-17T00:00:00");
const GOAL_DATE = new Date("2026-11-30T23:59:59");

const targets = [
  {pushups:80, plank:70},
  {pushups:120, plank:105},
  {pushups:160, plank:135},
  {pushups:188, plank:159},
  {pushups:216, plank:173},
  {pushups:250, plank:189},
  {pushups:283, plank:205},
  {pushups:317, plank:221},
  {pushups:350, plank:237},
  {pushups:356, plank:240}
];

const checkpoints = [
  ["30.08.2026","90 Liegestütze / 80 s Plank"],
  ["20.09.2026","140 Liegestütze / 120 s Plank"],
  ["02.10.2026","216 Liegestütze / 2:53 Plank"],
  ["16.10.2026","250 Liegestütze / 3:09 Plank"],
  ["30.10.2026","283 Liegestütze / 3:25 Plank"],
  ["13.11.2026","317 Liegestütze / 3:41 Plank"],
  ["27.11.2026","350 Liegestütze / 3:57 Plank"],
  ["30.11.2026","356 Liegestütze / 4:00 Plank"]
];

const EXACT_PLAN=[{"date":"2026-08-24","pushups":80,"plank":70,"sets":"10×8","checkpoint":false},{"date":"2026-08-26","pushups":89,"plank":77,"sets":"5×8 + 7×7","checkpoint":false},{"date":"2026-08-28","pushups":98,"plank":85,"sets":"10×9 + 1×8","checkpoint":false},{"date":"2026-08-31","pushups":107,"plank":92,"sets":"11×9 + 1×8","checkpoint":false},{"date":"2026-09-02","pushups":116,"plank":100,"sets":"12×9 + 1×8","checkpoint":false},{"date":"2026-09-04","pushups":125,"plank":107,"sets":"8×10 + 5×9","checkpoint":true},{"date":"2026-09-07","pushups":134,"plank":114,"sets":"8×10 + 6×9","checkpoint":false},{"date":"2026-09-09","pushups":143,"plank":122,"sets":"8×10 + 7×9","checkpoint":false},{"date":"2026-09-11","pushups":152,"plank":129,"sets":"12×11 + 2×10","checkpoint":false},{"date":"2026-09-14","pushups":161,"plank":137,"sets":"11×11 + 4×10","checkpoint":false},{"date":"2026-09-16","pushups":170,"plank":144,"sets":"10×11 + 6×10","checkpoint":false},{"date":"2026-09-18","pushups":179,"plank":152,"sets":"14×12 + 1×11","checkpoint":true},{"date":"2026-09-21","pushups":188,"plank":159,"sets":"12×12 + 4×11","checkpoint":false},{"date":"2026-09-23","pushups":194,"plank":162,"sets":"2×13 + 14×12","checkpoint":false},{"date":"2026-09-25","pushups":199,"plank":164,"sets":"7×13 + 9×12","checkpoint":false},{"date":"2026-09-28","pushups":205,"plank":167,"sets":"13×13 + 3×12","checkpoint":false},{"date":"2026-09-30","pushups":210,"plank":170,"sets":"2×14 + 14×13","checkpoint":false},{"date":"2026-10-02","pushups":216,"plank":173,"sets":"8×14 + 8×13","checkpoint":true},{"date":"2026-10-05","pushups":222,"plank":175,"sets":"14×14 + 2×13","checkpoint":false},{"date":"2026-10-07","pushups":227,"plank":178,"sets":"3×15 + 13×14","checkpoint":false},{"date":"2026-10-09","pushups":233,"plank":181,"sets":"9×15 + 7×14","checkpoint":false},{"date":"2026-10-12","pushups":238,"plank":183,"sets":"14×15 + 2×14","checkpoint":false},{"date":"2026-10-14","pushups":244,"plank":186,"sets":"6×15 + 11×14","checkpoint":false},{"date":"2026-10-16","pushups":250,"plank":189,"sets":"12×15 + 5×14","checkpoint":true},{"date":"2026-10-19","pushups":255,"plank":191,"sets":"17×15","checkpoint":false},{"date":"2026-10-21","pushups":261,"plank":194,"sets":"6×16 + 11×15","checkpoint":false},{"date":"2026-10-23","pushups":266,"plank":197,"sets":"11×16 + 6×15","checkpoint":false},{"date":"2026-10-26","pushups":272,"plank":199,"sets":"17×16","checkpoint":false},{"date":"2026-10-28","pushups":278,"plank":202,"sets":"6×17 + 11×16","checkpoint":false},{"date":"2026-10-30","pushups":283,"plank":205,"sets":"11×17 + 6×16","checkpoint":true},{"date":"2026-11-02","pushups":289,"plank":208,"sets":"17×17","checkpoint":false},{"date":"2026-11-04","pushups":294,"plank":210,"sets":"5×18 + 12×17","checkpoint":false},{"date":"2026-11-06","pushups":300,"plank":213,"sets":"12×17 + 6×16","checkpoint":false},{"date":"2026-11-09","pushups":306,"plank":216,"sets":"18×17","checkpoint":false},{"date":"2026-11-11","pushups":311,"plank":218,"sets":"5×18 + 13×17","checkpoint":false},{"date":"2026-11-13","pushups":317,"plank":221,"sets":"11×18 + 7×17","checkpoint":true},{"date":"2026-11-16","pushups":322,"plank":224,"sets":"16×18 + 2×17","checkpoint":false},{"date":"2026-11-18","pushups":328,"plank":227,"sets":"4×19 + 14×18","checkpoint":false},{"date":"2026-11-20","pushups":334,"plank":229,"sets":"10×19 + 8×18","checkpoint":false},{"date":"2026-11-23","pushups":339,"plank":232,"sets":"15×19 + 3×18","checkpoint":false},{"date":"2026-11-25","pushups":345,"plank":235,"sets":"3×20 + 15×19","checkpoint":false},{"date":"2026-11-27","pushups":350,"plank":237,"sets":"8×20 + 10×19","checkpoint":true},{"date":"2026-11-30","pushups":356,"plank":240,"sets":"14×20 + 4×19","checkpoint":true}];
function planForDate(k){return EXACT_PLAN.find(x=>x.date===k)||null;}
function nextPlanEntry(k){return EXACT_PLAN.find(x=>x.date>=k)||null;}
function latestPlanOnOrBefore(k){
  let found=null;
  for(const item of EXACT_PLAN){
    if(item.date<=k) found=item;
    else break;
  }
  return found;
}

function workoutProgress(item){
  const idx=EXACT_PLAN.findIndex(x=>x.date===item.date);
  const next=EXACT_PLAN[idx+1]||null;
  const end=next?next.date:"9999-12-31";
  const recs=state.records.filter(r=>r.date>=item.date && r.date<end);
  let push=recs.reduce((a,r)=>a+(r.pushups||0),0);
  let plank=recs.reduce((a,r)=>a+(r.plank||0),0);
  if(todayKey()>=item.date && todayKey()<end){push+=state.todayPushups;plank+=state.todayPlank;}

  const manuallyCompleted = state.records.some(r =>
    r.completedWorkout === true && (r.targetDate || r.date) === item.date
  );

  return {push,plank,done:manuallyCompleted || (push>=item.pushups && plank>=item.plank)};
}
function openWorkout(){
  const key=todayKey(), due=EXACT_PLAN.filter(x=>x.date<=key);
  const latest=due.length?due[due.length-1]:null;
  if(!latest)return null;
  const p=workoutProgress(latest);
  return p.done?null:{...latest,progressPush:p.push,progressPlank:p.plank};
}

function fmtDateDE(key){
  if(!key) return "";
  const [y,m,d]=key.split("-").map(Number);
  return new Intl.DateTimeFormat("de-DE",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(y,m-1,d));
}


const STORAGE_KEY = "pushupPlankCoach.v2";

let state = {
  todayDate: todayKey(),
  todayPushups: 0,
  todayPlank: 0,
  todayBestSinglePlank: 0,
  records: [],
  kneeSets: {},
  kneeDone: {}
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
  const open=openWorkout();
  if(open)return open;
  const latest=latestPlanOnOrBefore(todayKey());
  return latest||{pushups:80,plank:70,sets:""};
}

function createRecordId(){
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `rec-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function ensureRecordIds(){
  let changed=false;
  state.records=state.records.map(r=>{
    if(r.id) return r;
    changed=true;
    return {...r,id:createRecordId()};
  });
  if(changed) save();
}

function findRecordById(id){
  return state.records.find(r=>r.id===id) || null;
}

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) state = {...state, ...JSON.parse(raw)};
  }catch(e){}
  rollover();
  ensureRecordIds();
}

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function rollover(){
  const t = todayKey();
  if(state.todayDate !== t){
    if(state.todayPushups > 0 || state.todayPlank > 0){
      state.records.push({
        id: createRecordId(),
        date: state.todayDate,
        pushups: state.todayPushups,
        plank: state.todayPlank,
        bestSinglePlank: state.todayBestSinglePlank || 0
      });
    }
    state.todayDate = t;
    state.todayPushups = 0;
    state.todayPlank = 0;
    state.todayBestSinglePlank = 0;
    save();
  }
}

function totals(){
  const workoutRecords = state.records.filter(r=>r.type!=="knee");
  const completedPush = workoutRecords.reduce((a,r)=>a+(r.pushups||0),0);
  const completedPlank = workoutRecords.reduce((a,r)=>a+(r.plank||0),0);
  const bestPush = Math.max(state.todayPushups, ...workoutRecords.map(r=>r.pushups||0), 0);
  const bestPlank = Math.max(state.todayBestSinglePlank||0, ...workoutRecords.map(r=>r.bestSinglePlank||0), 0);
  return {
    pushups: completedPush,
    plank: completedPlank,
    bestPush,
    bestPlank
  };
}

function mondayKeyFor(dateLike){
  const d=typeof dateLike==="string" ? new Date(dateLike+"T12:00:00") : new Date(dateLike);
  const day=(d.getDay()+6)%7;
  d.setDate(d.getDate()-day);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function isoWeekLabel(key){
  const [y,m,d]=key.split("-").map(Number);
  const date=new Date(Date.UTC(y,m-1,d));
  const day=date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate()+4-day);
  const yearStart=new Date(Date.UTC(date.getUTCFullYear(),0,1));
  const week=Math.ceil((((date-yearStart)/86400000)+1)/7);
  return `KW${String(week).padStart(2,"0")}`;
}

function weeklyPerformance(weeks=8){
  const currentMonday=new Date(mondayKeyFor(todayKey())+"T12:00:00");
  const rows=[];
  for(let i=weeks-1;i>=0;i--){
    const d=new Date(currentMonday);
    d.setDate(d.getDate()-i*7);
    const key=mondayKeyFor(d);
    rows.push({key,label:isoWeekLabel(key),pushups:0,plank:0});
  }
  const byKey=new Map(rows.map(r=>[r.key,r]));
  state.records.filter(r=>r.type!=="knee" && r.date).forEach(r=>{
    const wk=mondayKeyFor(r.date);
    const row=byKey.get(wk);
    if(!row) return;
    row.pushups+=Number(r.pushups)||0;
    row.plank+=Number(r.plank)||0;
  });
  return rows;
}

function historyDaySummaries(){
  const byDate=new Map();

  state.records.forEach(record=>{
    const date=record?.date;
    if(!date) return;
    if(!byDate.has(date)){
      byDate.set(date,{
        date,
        workoutRecords:[],
        kneeRecords:[],
        pushups:0,
        plank:0,
        bestSinglePlank:0,
        kneeCompletedSets:0,
        kneeTotalSets:0,
        kneeDone:false,
        kneeExercises:[]
      });
    }
    const day=byDate.get(date);
    if(record.type==="knee"){
      day.kneeRecords.push(record);
    }else{
      day.workoutRecords.push(record);
      day.pushups+=Number(record.pushups)||0;
      day.plank+=Number(record.plank)||0;
      day.bestSinglePlank=Math.max(day.bestSinglePlank,Number(record.bestSinglePlank)||0);
    }
  });

  for(const day of byDate.values()){
    // Normalerweise existiert pro Tag genau ein Stabilitätseintrag. Falls alte Daten
    // mehrere enthalten, wird je Übung der höchste erfasste Satzstand verwendet.
    const exerciseMap=new Map();
    day.kneeRecords.forEach(record=>{
      (record.kneeExercises||[]).forEach(ex=>{
        const existing=exerciseMap.get(ex.id);
        const doneSets=Math.max(0,Number(ex.doneSets)||0);
        const sets=Math.max(0,Number(ex.sets)||0);
        if(!existing){
          exerciseMap.set(ex.id,{...ex,sets,doneSets:Math.min(sets,doneSets)});
        }else{
          existing.sets=Math.max(existing.sets,sets);
          existing.doneSets=Math.max(existing.doneSets,Math.min(sets,doneSets));
          existing.name=existing.name||ex.name;
          existing.prescription=existing.prescription||ex.prescription;
        }
      });
    });
    day.kneeExercises=[...exerciseMap.values()];

    // Falls für einen Trainingstag noch kein eigener Historieneintrag der Stabilität
    // existiert, trotzdem den geplanten/aktuellen Satzstand dieses Tages anzeigen.
    if(!day.kneeExercises.length){
      const planned=kneePlanFor(day.date);
      if(planned.exercises.length){
        day.kneeExercises=planned.exercises.map(ex=>({
          id:ex.id,
          name:ex.name,
          sets:ex.sets,
          doneSets:exerciseCompletionCount(day.date,ex),
          prescription:ex.prescription
        }));
      }
    }

    if(day.kneeExercises.length){
      day.kneeCompletedSets=day.kneeExercises.reduce((sum,ex)=>sum+Math.min(ex.sets,ex.doneSets),0);
      day.kneeTotalSets=day.kneeExercises.reduce((sum,ex)=>sum+ex.sets,0);
      day.kneeDone=day.kneeTotalSets>0 && day.kneeCompletedSets===day.kneeTotalSets;
    }else if(day.kneeRecords.length){
      day.kneeCompletedSets=Math.max(0,...day.kneeRecords.map(r=>Number(r.kneeCompletedSets)||0));
      day.kneeTotalSets=Math.max(0,...day.kneeRecords.map(r=>Number(r.kneeTotalSets)||0));
      day.kneeDone=day.kneeTotalSets>0 && day.kneeCompletedSets===day.kneeTotalSets;
    }
  }

  return [...byDate.values()].sort((a,b)=>b.date.localeCompare(a.date));
}

function workoutRecordsForDate(date){
  return state.records.filter(r=>r.date===date && r.type!=="knee");
}

function kneeRecordsForDate(date){
  return state.records.filter(r=>r.date===date && r.type==="knee");
}

function mergedKneeExercisesForDate(date){
  const summary=historyDaySummaries().find(d=>d.date===date);
  return summary?.kneeExercises || [];
}

function renderKneeEditorForDate(date, preferredExercises=null, preferredPlanDate=null){
  const dayKneeRecords=kneeRecordsForDate(date);
  const existingRecord=dayKneeRecords[0] || null;
  const source=preferredExercises || mergedKneeExercisesForDate(date);

  let planDate=preferredPlanDate || existingRecord?.kneeDate || null;
  let plan=planDate ? kneePlanFor(planDate) : kneePlanFor(date);

  if(!planDate && plan.exercises.length){
    planDate=date;
  }

  // Wenn an diesem Kalendertag kein eigenes Stabilitätsprogramm geplant war,
  // das zuletzt fällige Programm anbieten. So lassen sich nachgeholte Einheiten
  // dem tatsächlichen Durchführungstag zuordnen und vollständig bearbeiten.
  if(!plan.exercises.length && !(source||[]).length){
    const fallbackDate=latestKneeDateOnOrBefore(date);
    if(fallbackDate){
      const fallbackPlan=kneePlanFor(fallbackDate);
      if(fallbackPlan.exercises.length){
        planDate=fallbackDate;
        plan=fallbackPlan;
      }
    }
  }

  if(!planDate && (source||[]).length){
    planDate=existingRecord?.kneeDate || date;
  }

  const sourceMap=new Map((source||[]).map(ex=>[ex.id,ex]));
  const exercises=plan.exercises.length
    ? plan.exercises.map(ex=>({
        id:ex.id,
        name:ex.name,
        sets:ex.sets,
        prescription:ex.prescription,
        doneSets:Math.max(0,Math.min(ex.sets,
          Number(sourceMap.get(ex.id)?.doneSets ?? exerciseCompletionCount(planDate,ex)) || 0
        ))
      }))
    : (source||[]).map(ex=>({
        ...ex,
        sets:Math.max(0,Number(ex.sets)||0),
        doneSets:Math.max(0,Math.min(Number(ex.sets)||0,Number(ex.doneSets)||0))
      }));

  editKneeFieldsList.dataset.kneePlanDate=planDate || date;

  if(!exercises.length){
    editKneeFieldsList.innerHTML=`<div class="edit-knee-help">Für diesen Tag ist kein Stabilitätsprogramm verfügbar.</div>`;
    return;
  }

  const carryoverNote=planDate && planDate!==date
    ? `<div class="edit-knee-program-note"><strong>Nachgeholtes Stabilitätsprogramm</strong><br>Ursprünglich fällig: ${fmtDateDE(planDate)} · Durchführung wird diesem Trainingstag zugeordnet.</div>`
    : `<div class="edit-knee-program-note"><strong>Stabilitätsprogramm dieses Trainingstags</strong></div>`;

  editKneeFieldsList.innerHTML=carryoverNote+exercises.map((ex,idx)=>`<label class="edit-field edit-knee-item">
    <span>Übung ${idx+1}: ${ex.name} <small>(${ex.sets} Sätze)</small></span>
    <input type="number" min="0" max="${ex.sets}" step="1" inputmode="numeric" data-knee-edit-id="${ex.id}" data-knee-name="${ex.name.replace(/"/g,"&quot;")}" data-knee-sets="${ex.sets}" data-knee-prescription="${(ex.prescription||"").replace(/"/g,"&quot;")}" value="${ex.doneSets}">
  </label>`).join("");
}

function renderWeeklyChart(){
  const el=document.querySelector("#weeklyChart");
  if(!el) return;
  const rows=weeklyPerformance(8);
  const maxPush=Math.max(1,...rows.map(r=>r.pushups));
  const maxPlank=Math.max(1,...rows.map(r=>r.plank));

  const series=(kind,title,unit,maxValue)=>`<div class="weekly-series ${kind}">
    <div class="weekly-series-title"><span>${title}</span><span class="weekly-series-unit">${unit}</span></div>
    <div class="weekly-bars">${rows.map(r=>{
      const value=kind==="push"?r.pushups:r.plank;
      const pct=value>0?Math.max(4,Math.round(value/maxValue*100)):0;
      const label=kind==="push"?String(value):(value?`${Math.round(value/60)} min`:"0 min");
      return `<div class="weekly-bar-col">
        <div class="weekly-value">${label}</div>
        <div class="weekly-bar-track"><div class="weekly-bar-fill" style="height:${pct}%"></div></div>
        <div class="weekly-week-label">${r.label}</div>
      </div>`;
    }).join("")}</div>
  </div>`;

  el.innerHTML=series("push","Liegestütze","Wiederholungen / Woche",maxPush)
    +series("plank","Plank","Gesamtzeit / Woche",maxPlank);
}


function render(){
  rollover();
  const t = currentTarget();
  const key=todayKey();
  const exactToday=planForDate(key);
  const open=openWorkout();
  const program=document.querySelector("#todayProgram");
  const trainingPanel=document.querySelector("#trainingPanel");
  const restPanel=document.querySelector("#restPanel");
  const actionsPanel=document.querySelector(".actions");
  const nextDateEl=document.querySelector("#nextTrainingDate");

  if(open){
    const overdue=open.date<key;
    program.innerHTML=(overdue?`<strong>Training noch offen.</strong>`:`<strong>Training ist heute fällig.</strong>`)
      +`<br>${open.pushups} Liegestütze + ${fmtTime(open.plank)} Plank`
      +(open.sets?`<br><span>Satzvorschlag: ${open.sets}</span>`:"")
      +(overdue?`<br><span>Fällig seit: ${fmtDateDE(open.date)}</span>`:"")
      +(open.checkpoint?`<br><span>✓ Kontrollpunkt / Zieltest</span>`:"");
    trainingPanel.hidden=false;restPanel.hidden=true;actionsPanel.hidden=false;
  }else{
    program.innerHTML=`<strong style="color:var(--plank)">Regenerationstag.</strong><br><span>Das letzte fällige Training ist erfüllt.</span>`;
    trainingPanel.hidden=true;restPanel.hidden=false;actionsPanel.hidden=false;
    const next=nextPlanEntry(key);
    if(nextDateEl)nextDateEl.textContent=next?`Nächster Trainingstag: ${fmtDateDE(next.date)}`:"Trainingsplan abgeschlossen.";
  }

  const pushPct = Math.min(100, Math.round(t.pushups/356*100));
  const plankPct = Math.min(100, Math.round(t.plank/240*100));
  const displayPushups=open?open.progressPush:state.todayPushups;
  const displayPlank=open?open.progressPlank:state.todayPlank;
  const todayPushPct = Math.min(100, Math.round(displayPushups/t.pushups*100));
  const todayPlankPct = Math.min(100, Math.round(displayPlank/t.plank*100));

  document.querySelector("#targetPushups").textContent = t.pushups;
  document.querySelector("#targetPlank").textContent = fmtTime(t.plank);
  document.querySelector("#goalPushPercent").textContent = pushPct+"%";
  document.querySelector("#goalPlankPercent").textContent = plankPct+"%";
  document.querySelector("#goalPushProgress").value = t.pushups;
  document.querySelector("#goalPlankProgress").value = t.plank;

  document.querySelector("#todayPushups").textContent = displayPushups;
  document.querySelector("#todayPushTarget").textContent = t.pushups;
  document.querySelector("#todayPushPercent").textContent = todayPushPct+"%";
  document.querySelector("#pushBatteryFill").style.height = todayPushPct+"%";

  document.querySelector("#todayPlank").textContent = fmtTime(displayPlank);
  document.querySelector("#todayPlankTarget").textContent = fmtTime(t.plank);
  document.querySelector("#todayPlankPercent").textContent = todayPlankPct+"%";
  document.querySelector("#plankBatteryFill").style.height = todayPlankPct+"%";

  const x = totals();
  document.querySelector("#totalPushups").textContent = x.pushups;
  document.querySelector("#totalPlankSeconds").textContent = x.plank;
  document.querySelector("#bestPushups").textContent = x.bestPush;
  document.querySelector("#bestPlank").textContent = fmtTime(x.bestPlank);
  document.querySelector("#totalPlankTime").textContent = fmtLong(x.plank);

  document.querySelector("#checkpoints").innerHTML =
    checkpoints.map(c=>`<div class="checkpoint"><span class="date">${c[0]}</span><span>${c[1]}</span></div>`).join("");

  const hist=historyDaySummaries();
  document.querySelector("#history").innerHTML = hist.length
    ? hist.map(day=>{
        const hasKnee=day.kneeTotalSets>0 || day.kneeRecords.length>0;
        const kneeValue=hasKnee?`${day.kneeCompletedSets}/${day.kneeTotalSets}`:"–";
        const kneeLabel=hasKnee?(day.kneeDone?"Stabilität ✓":"Stabilität offen"):"keine Stabilität";
        return `<div class="history-row history-row-day">
          <div class="history-main">
            <div class="history-date">${fmtDateDE(day.date)}</div>
            <div class="history-subtitle">Trainingstag</div>
          </div>
          <div class="history-metrics">
            <span><strong>${day.pushups}</strong><small>LS</small></span>
            <span><strong>${fmtTime(day.plank)}</strong><small>Plank gesamt</small></span>
            <span><strong>${day.bestSinglePlank?fmtTime(day.bestSinglePlank):"–"}</strong><small>am Stück</small></span>
            <span><strong>${kneeValue}</strong><small>${kneeLabel}</small></span>
          </div>
          <button class="history-edit-btn" type="button" data-edit-date="${day.date}" aria-label="Trainingstag vom ${day.date} bearbeiten">Bearbeiten</button>
        </div>`;
      }).join("")
    : `<div class="empty">Noch keine abgeschlossenen Trainingstage.</div>`;

  renderWeeklyChart();
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

document.querySelector("#addPlankBtn").addEventListener("click", ()=>{
  const minInput = document.querySelector("#plankMinutesInput");
  const secInput = document.querySelector("#plankSecondsInput");
  const minutes = Math.max(0, Number(minInput.value) || 0);
  const seconds = Math.max(0, Math.min(59, Number(secInput.value) || 0));
  const total = Math.floor(minutes * 60 + seconds);

  if(total > 0){
    state.todayPlank += total;
    state.todayBestSinglePlank=Math.max(state.todayBestSinglePlank||0,total);
    minInput.value = "";
    secInput.value = "";
    save(); render();
  }
});

document.querySelector("#finishWorkout").addEventListener("click", ()=>{
  const open=openWorkout();
  const kneeStatus=activeKneeWorkoutStatus();
  if(state.todayPushups===0 && state.todayPlank===0 && !open && (!kneeStatus.date || kneeStatus.done)) return;

  if(kneeStatus.date && kneeStatus.plan && !kneeStatus.done){
    // "Trainingseintrag speichern" schließt auch das aktuell offene Stabilitätstraining ab.
    kneeStatus.plan.exercises.forEach(ex=>{
      for(let s=1;s<=ex.sets;s++){
        setKneeSetDone(kneeStatus.date,ex.id,s,true);
      }
    });
    state.kneeDone=state.kneeDone||{};
    state.kneeDone[kneeStatus.date]=true;
    syncKneeHistoryForDate(kneeStatus.date,kneeStatus.plan,true,state.todayDate);
  }

  if(state.todayPushups>0 || state.todayPlank>0 || open){
    state.records.push({
      id: createRecordId(),
      date: state.todayDate,
      targetDate: open ? open.date : state.todayDate,
      pushups: state.todayPushups,
      plank: state.todayPlank,
      bestSinglePlank: state.todayBestSinglePlank || 0,
      completedWorkout: true
    });
  }

  state.todayPushups = 0;
  state.todayPlank = 0;
  state.todayBestSinglePlank = 0;
  save();
  render();
  renderKnee();
});

document.querySelector("#resetToday").addEventListener("click", ()=>{
  if(confirm("Heutige Eingaben wirklich löschen?")){
    state.todayPushups = 0;
    state.todayPlank = 0;
    state.todayBestSinglePlank = 0;
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
    state.todayBestSinglePlank=Math.max(state.todayBestSinglePlank||0,timerElapsed);
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





const editDialog = document.querySelector("#editRecordDialog");
const editForm = document.querySelector("#editRecordForm");
const editDate = document.querySelector("#editRecordDate");
const editPushups = document.querySelector("#editRecordPushups");
const editPlankMin = document.querySelector("#editRecordPlankMin");
const editPlankSec = document.querySelector("#editRecordPlankSec");
const editBestPlankMin = document.querySelector("#editRecordBestPlankMin");
const editBestPlankSec = document.querySelector("#editRecordBestPlankSec");
const editRecordId = document.querySelector("#editRecordId");
const editRecordType = document.querySelector("#editRecordType");
const editWorkoutFields = document.querySelector("#editWorkoutFields");
const editKneeFields = document.querySelector("#editKneeFields");
const editKneeFieldsList = document.querySelector("#editKneeFieldsList");

function openDailyEditor(date){
  const day=historyDaySummaries().find(d=>d.date===date);
  if(!day) return;

  editRecordId.value=date; // Originaldatum des zusammengefassten Tages
  editRecordType.value="day";
  editDate.value=date;
  editDate.max=todayKey();

  editWorkoutFields.hidden=false;
  editKneeFields.hidden=false;
  editPushups.value=day.pushups || 0;
  editPlankMin.value=Math.floor((day.plank || 0)/60);
  editPlankSec.value=(day.plank || 0)%60;
  editBestPlankMin.value=Math.floor((day.bestSinglePlank || 0)/60);
  editBestPlankSec.value=(day.bestSinglePlank || 0)%60;

  renderKneeEditorForDate(date,day.kneeExercises);
  editDialog.showModal();
}

document.querySelector("#history").addEventListener("click", event=>{
  const btn=event.target.closest("[data-edit-date]");
  if(btn) openDailyEditor(btn.dataset.editDate);
});

editDate.addEventListener("change",()=>{
  if(!editDialog.open) return;
  const currentPlanDate=editKneeFieldsList.dataset.kneePlanDate || null;
  const current=[...editKneeFieldsList.querySelectorAll("[data-knee-edit-id]")].map(input=>({
    id:input.dataset.kneeEditId,
    name:input.dataset.kneeName || input.dataset.kneeEditId,
    sets:Number(input.dataset.kneeSets)||Number(input.max)||0,
    doneSets:Math.max(0,Number(input.value)||0),
    prescription:input.dataset.kneePrescription || ""
  }));
  renderKneeEditorForDate(editDate.value,current,currentPlanDate);
});

document.querySelector("#closeEditRecord").addEventListener("click", ()=>editDialog.close());

editDialog.addEventListener("click", event=>{
  if(event.target===editDialog) editDialog.close();
});

editForm.addEventListener("submit", event=>{
  event.preventDefault();

  const originalDate=editRecordId.value;
  const date=editDate.value;
  if(!originalDate) return editDialog.close();
  if(!date || date>todayKey()){
    alert("Bitte ein gültiges Datum bis einschließlich heute wählen.");
    return;
  }

  const pushups=Math.max(0,Math.floor(Number(editPushups.value)||0));
  const minutes=Math.max(0,Math.floor(Number(editPlankMin.value)||0));
  const seconds=Math.max(0,Math.min(59,Math.floor(Number(editPlankSec.value)||0)));
  const plank=minutes*60+seconds;
  const bestMinutes=Math.max(0,Math.floor(Number(editBestPlankMin.value)||0));
  const bestSeconds=Math.max(0,Math.min(59,Math.floor(Number(editBestPlankSec.value)||0)));
  const bestSinglePlank=Math.min(plank,bestMinutes*60+bestSeconds);

  const previousWorkout=workoutRecordsForDate(originalDate);
  const previousWorkoutMeta=previousWorkout[0] || null;
  const previousKneeRecords=kneeRecordsForDate(originalDate);
  const hadWorkout=previousWorkout.length>0;
  const hadKnee=previousKneeRecords.length>0;

  if(date!==originalDate && state.records.some(r=>r.date===date)){
    alert("Für das gewählte Datum existiert bereits ein Trainingstag. Bitte diesen Tag direkt in der Historie bearbeiten.");
    return;
  }

  // Bestehende Einträge des dargestellten Kalendertags entfernen; sie werden
  // anschließend als ein gemeinsamer Trainingstag neu gespeichert.
  state.records=state.records.filter(r=>r.date!==originalDate);

  if(hadWorkout || pushups>0 || plank>0 || bestSinglePlank>0){
    state.records.push({
      id:previousWorkoutMeta?.id || createRecordId(),
      date,
      targetDate:previousWorkoutMeta?.targetDate || date,
      pushups,
      plank,
      bestSinglePlank,
      completedWorkout:previousWorkoutMeta?.completedWorkout ?? true
    });
  }

  ensureKneeState();
  const kneeInputs=[...editKneeFieldsList.querySelectorAll("[data-knee-edit-id]")];
  const hasEnteredKnee=kneeInputs.some(input=>(Number(input.value)||0)>0);
  const kneePlanDate=editKneeFieldsList.dataset.kneePlanDate || date;
  const plan=kneePlanFor(kneePlanDate);

  // Falls das Programm nachgeholt wurde, liegt der technische Fortschritt weiter
  // auf dem ursprünglichen Fälligkeitsdatum; in der Historie wird es dagegen dem
  // tatsächlichen Durchführungstag zugeordnet.
  if(plan.exercises.length){
    state.kneeSets[kneePlanDate]={};
    plan.exercises.forEach(ex=>{
      const input=kneeInputs.find(i=>i.dataset.kneeEditId===ex.id);
      const doneSets=Math.max(0,Math.min(ex.sets,Math.floor(Number(input?.value)||0)));
      for(let s=1;s<=doneSets;s++) setKneeSetDone(kneePlanDate,ex.id,s,true);
    });
    state.kneeDone[kneePlanDate]=allRequiredKneeSetsDone(kneePlanDate,plan);

    // Pro fälliger Stabilitätseinheit nur einen Historieneintrag behalten.
    state.records=state.records.filter(r=>!(r.type==="knee" && (r.kneeDate||r.date)===kneePlanDate));

    if(hasEnteredKnee || hadKnee || completedKneeSetCount(kneePlanDate,plan)>0){
      syncKneeHistoryForDate(kneePlanDate,plan,true,date);
    }
  }else if(kneeInputs.length && hasEnteredKnee){
    // Historische/frei erfasste Stabilitätsdaten ohne aktuellen Plan erhalten.
    const exercises=kneeInputs.map(input=>({
      id:input.dataset.kneeEditId,
      name:input.dataset.kneeName || input.dataset.kneeEditId,
      sets:Math.max(0,Number(input.dataset.kneeSets)||Number(input.max)||0),
      doneSets:Math.max(0,Math.min(Number(input.dataset.kneeSets)||Number(input.max)||0,Math.floor(Number(input.value)||0))),
      prescription:input.dataset.kneePrescription || ""
    }));
    const total=exercises.reduce((sum,ex)=>sum+ex.sets,0);
    const completed=exercises.reduce((sum,ex)=>sum+ex.doneSets,0);
    state.records.push({
      id:createRecordId(),
      type:"knee",
      date,
      performedDate:date,
      kneeDate:kneePlanDate,
      kneeLabel:"Stabilitätsübungen Beine",
      kneeExercises:exercises,
      kneeCompletedSets:completed,
      kneeTotalSets:total,
      kneeDone:total>0 && completed===total
    });
  }

  save();
  editRecordId.value=date;
  editDialog.close();
  render();
  renderKnee();
});

document.querySelector("#deleteRecordBtn").addEventListener("click", ()=>{
  const date=editRecordId.value;
  if(!date) return editDialog.close();
  if(!confirm(`Gesamten Trainingstag vom ${fmtDateDE(date)} wirklich löschen?`)) return;

  const kneePlanDates=state.records
    .filter(r=>r.date===date && r.type==="knee")
    .map(r=>r.kneeDate || r.date);

  state.records=state.records.filter(r=>r.date!==date);
  kneePlanDates.forEach(k=>{
    if(state.kneeSets) delete state.kneeSets[k];
    if(state.kneeDone) delete state.kneeDone[k];
  });
  if(state.kneeSets) delete state.kneeSets[date];
  if(state.kneeDone) delete state.kneeDone[date];

  save();
  editDialog.close();
  render();
  renderKnee();
});

// ---------- 3-Seiten-Navigation ----------
function setActivePage(page, {scroll=true}={}){
  const valid=["training","history","settings"];
  const next=valid.includes(page)?page:"training";
  document.querySelectorAll(".page-view").forEach(view=>{
    view.hidden=view.dataset.page!==next;
  });
  document.querySelectorAll(".bottom-nav-btn").forEach(btn=>{
    const active=btn.dataset.pageTarget===next;
    btn.classList.toggle("active",active);
    btn.setAttribute("aria-selected",active?"true":"false");
  });
  localStorage.setItem("356Coach.activePage",next);
  if(next==="history") renderWeeklyChart();
  if(scroll) window.scrollTo({top:0,behavior:"auto"});
}

document.querySelectorAll(".bottom-nav-btn").forEach(btn=>{
  btn.addEventListener("click",()=>setActivePage(btn.dataset.pageTarget));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js?v=31", { updateViaCache: "none" });
      await registration.update();

      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            worker.postMessage({ type: "SKIP_WAITING" });
          }
        });
      });

      let reloading = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloading) return;
        reloading = true;
        window.location.reload();
      });
    } catch (err) {
      console.warn("Service Worker Update fehlgeschlagen:", err);
    }
  });
}

load();
render();
setActivePage(localStorage.getItem("356Coach.activePage") || "training", {scroll:false});

document.querySelector("#addPushAlways").addEventListener("click",()=>{const i=document.querySelector("#pushInputAlways"),n=Number(i.value);if(n>0){state.todayPushups+=n;i.value="";save();render();}});
document.querySelector("#addPlankAlways").addEventListener("click",()=>{const mi=document.querySelector("#plankMinAlways"),si=document.querySelector("#plankSecAlways");const n=Math.floor((Math.max(0,Number(mi.value)||0)*60)+Math.max(0,Math.min(59,Number(si.value)||0)));if(n>0){state.todayPlank+=n;state.todayBestSinglePlank=Math.max(state.todayBestSinglePlank||0,n);mi.value="";si.value="";save();render();}});


// ---------- Backup / Restore ----------
function makeBackupPayload(){
  return {
    app: "356 Coach",
    version: 30,
    exportedAt: new Date().toISOString(),
    storageKey: "pushupPlankCoach.v2",
    data: state
  };
}

function setBackupStatus(message, isError=false){
  const el=document.querySelector("#backupStatus");
  if(!el) return;
  el.textContent=message;
  el.classList.toggle("error", !!isError);
}

document.querySelector("#exportBackupBtn")?.addEventListener("click", ()=>{
  try{
    save();
    const payload=makeBackupPayload();
    const blob=new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    const d=new Date();
    const stamp=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    a.href=url;
    a.download=`356-Coach-Backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setBackupStatus("Backup wurde erstellt. Speichere die Datei z. B. in iCloud Drive.");
  }catch(err){
    setBackupStatus("Backup konnte nicht erstellt werden.", true);
  }
});

document.querySelector("#importBackupBtn")?.addEventListener("click", ()=>{
  document.querySelector("#importBackupFile")?.click();
});

document.querySelector("#importBackupFile")?.addEventListener("change", async (event)=>{
  const file=event.target.files?.[0];
  if(!file) return;
  try{
    const parsed=JSON.parse(await file.text());
    if(parsed?.app!=="356 Coach" || !parsed?.data || typeof parsed.data!=="object"){
      throw new Error("Ungültiges Backup");
    }
    const ok=confirm("Backup wiederherstellen? Die aktuell lokal gespeicherten 356-Coach-Daten werden durch das Backup ersetzt.");
    if(!ok){ event.target.value=""; return; }

    state=parsed.data;
    localStorage.setItem("pushupPlankCoach.v2", JSON.stringify(state));
    setBackupStatus("Backup erfolgreich wiederhergestellt.");
    event.target.value="";
    render();
    renderKnee();
  }catch(err){
    setBackupStatus("Diese Datei ist kein gültiges 356-Coach-Backup.", true);
    event.target.value="";
  }
});


// ---- Knee / stability plan ----
const KNEE_START="2026-09-14";
const KNEE_END="2026-12-31";

function kneePhase(k){
  if(k<"2026-09-14") return 0;
  if(k<"2026-10-12") return 1;
  if(k<"2026-11-09") return 2;
  if(k<"2026-12-07") return 3;
  return 4;
}

function kneeDay(k){
  const d=new Date(k+"T12:00:00").getDay();
  return d===1?"A":d===3?"M":d===5?"B":null;
}

function dateKeyFromDate(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function latestKneeDateOnOrBefore(k){
  if(k<KNEE_START) return null;
  let d=new Date(k+"T12:00:00");
  const start=new Date(KNEE_START+"T12:00:00");
  for(let i=0;i<450 && d>=start;i++){
    const key=dateKeyFromDate(d);
    if(key<=KNEE_END && kneeDay(key)) return key;
    d.setDate(d.getDate()-1);
  }
  return null;
}

function nextKneeDateAfter(k){
  let d=new Date(k+"T12:00:00");
  const end=new Date(KNEE_END+"T12:00:00");
  d.setDate(d.getDate()+1);
  for(let i=0;i<450 && d<=end;i++){
    const key=dateKeyFromDate(d);
    if(key>=KNEE_START && kneeDay(key)) return key;
    d.setDate(d.getDate()+1);
  }
  return null;
}

function kneePlanFor(k){
  const day=kneeDay(k), ph=kneePhase(k);
  if(!day || !ph) return {day:null, exercises:[], notes:[]};

  let exercises=[];
  const notes=[];

  if(day==="A"){
    exercises=[
      {id:"split-squat", name:"Split Squats", sets:3, prescription:"8–12 je Bein", description:"Mache einen Ausfallschritt nach hinten oder in geteilter Standposition. Senke das hintere Knie kontrolliert Richtung Boden und drücke dich wieder hoch. Oberkörper aufrecht, Knie sauber über dem Fuß führen."},
      {id:"step-down", name:"Step-downs", sets:3, prescription:"8–12 je Bein", description:"Stelle dich auf eine Stufe oder stabile Erhöhung. Senke die freie Ferse langsam Richtung Boden ab und drücke dich kontrolliert wieder hoch. Becken gerade halten, Knie stabil führen."},
      {id:"calf-single", name:"Einbeiniges Wadenheben", sets:3, prescription:"12–20 je Bein", description:"Stelle dich auf ein Bein. Drücke dich über den Fußballen langsam nach oben auf die Zehenspitze und senke die Ferse kontrolliert wieder ab. Halte das Gleichgewicht ruhig."},
      {id:"balance-mat", name:"Einbeinstand auf Balancematte", sets:2, prescription:"30–45 Sekunden je Bein", description:"Stelle dich auf ein Bein auf eine weiche Unterlage oder Balancematte. Halte Hüfte und Oberkörper stabil und versuche, ohne Absetzen ruhig zu stehen."}
    ];
  }

  if(day==="M"){
    exercises=[
      {id:"rdl-single-light", name:"Einbeiniger Romanian Deadlift", sets:2, prescription:"8–10 je Bein", description:"Stehe auf einem Bein und neige den Oberkörper mit geradem Rücken nach vorn. Das freie Bein geht nach hinten. Dann kontrolliert wieder aufrichten. Bewegung aus der Hüfte, nicht aus dem Rücken."},
      {id:"star-reach", name:ph>=2?"Star Reach auf Balancematte":"Star Reach", sets:2, prescription:"4–5 Runden je Bein", description:"Stehe auf einem Bein und tippe mit dem anderen Fuß kontrolliert in mehrere Richtungen wie bei einem Stern nach vorn, seitlich und schräg. Das Standbein bleibt stabil."},
      {id:"balance-board", name:"Balanceboard", sets:2, prescription:(ph>=2?"30–45":"20–45")+" Sekunden je Bein", description:"Stelle dich mit einem Bein auf das Balanceboard und halte die Position möglichst ruhig. Kleine Ausgleichsbewegungen sind normal. Nicht springen, nur kontrolliert stabilisieren."},
      {id:"calf-slow", name:"Langsames Wadenheben", sets:2, prescription:"15", optional:true, description:"Hebe beide oder einbeinig die Fersen langsam an, halte kurz oben und senke sie bewusst langsam wieder ab. Fokus auf Kontrolle und saubere Bewegung."}
    ];
  }

  if(day==="B"){
    exercises=[
      {id:"split-squat", name:"Split Squats", sets:3, prescription:"8–12 je Bein", description:"Mache einen Ausfallschritt nach hinten oder in geteilter Standposition. Senke das hintere Knie kontrolliert Richtung Boden und drücke dich wieder hoch. Oberkörper aufrecht, Knie sauber über dem Fuß führen."},
      {id:"rdl-single", name:"Einbeiniger Romanian Deadlift", sets:3, prescription:"8–12 je Bein", description:"Stehe auf einem Bein und neige den Oberkörper mit geradem Rücken nach vorn. Das freie Bein streckt nach hinten. Danach kontrolliert wieder aufrichten und die Hüfte stabil halten."},
      {id:"step-down", name:"Step-downs", sets:3, prescription:"8–12 je Bein", optionalSets:[3], description:"Stelle dich auf eine Stufe oder stabile Erhöhung. Senke die freie Ferse langsam Richtung Boden ab und drücke dich kontrolliert wieder hoch. Das Knie bleibt ruhig und stabil ausgerichtet."},
      {id:"calf-single", name:"Einbeiniges Wadenheben", sets:3, prescription:"12–20 je Bein", description:"Stelle dich auf ein Bein. Drücke dich über den Fußballen langsam nach oben auf die Zehenspitze und senke die Ferse kontrolliert wieder ab. Halte das Gleichgewicht ruhig."}
    ];
  }

  if(ph>=2 && (day==="A" || day==="B")){
    notes.push("Bei sauberer Ausführung und problemlos geschafften Wiederholungen: Zusatzgewicht bei Split Squats/RDL, ggf. Wadenheben.");
  }

  if(ph===3 && day==="B"){
    exercises.push(
      {id:"jump-double", name:"Kleine beidbeinige Sprünge", sets:2, prescription:"15–20", description:"Führe kleine, lockere Sprünge mit beiden Beinen aus. Lande leise und kontrolliert auf dem Vorfuß-Mittelfuß und halte Knie und Hüfte stabil."},
      {id:"step-stick", name:"Seitliches Step & Stick", sets:2, prescription:"5–6 je Seite · 2 Sekunden stabil landen", description:"Mache einen kleinen seitlichen Sprung oder Schritt und lande auf einem Bein. Halte die Landung etwa 2 Sekunden stabil, bevor du zur nächsten Wiederholung übergehst."}
    );
  }

  if(ph>=4 && day==="B"){
    exercises.push(
      {id:"jump-single-place", name:"Einbeinige kleine Sprünge auf der Stelle", sets:2, prescription:"10–15 je Bein", description:"Springe mit einem Bein klein und kontrolliert auf der Stelle. Lande weich und stabil, halte Knie und Fußachse ruhig."},
      {id:"jump-single-side", name:"Seitliche einbeinige Sprünge", sets:2, prescription:"6–8 je Seite", description:"Springe mit einem Bein kontrolliert seitlich und lande stabil. Achte auf eine saubere, leise Landung und gute Kniekontrolle."}
    );
    notes.push("Balanceboard nur für Balanceübungen verwenden – nicht darauf springen.");
  }

  return {day, exercises, notes};
}

function ensureKneeState(){
  state.kneeSets=state.kneeSets||{};
  state.kneeDone=state.kneeDone||{};
}

function kneeDateState(k){
  ensureKneeState();
  state.kneeSets[k]=state.kneeSets[k]||{};
  return state.kneeSets[k];
}

function kneeSetDone(k, exerciseId, setNo){
  return !!(state.kneeSets?.[k]?.[exerciseId]?.[String(setNo)]);
}

function setKneeSetDone(k, exerciseId, setNo, value){
  const dayState=kneeDateState(k);
  dayState[exerciseId]=dayState[exerciseId]||{};
  dayState[exerciseId][String(setNo)]=!!value;
}

function isOptionalKneeSet(exercise, setNo){
  return !!exercise.optional || !!exercise.optionalSets?.includes(setNo);
}


function kneeTitleForPlan(plan){
  if(!plan?.day) return "Stabilitätsübungen Beine";
  if(plan.day==="A") return "Stabilitätsübungen Beine – Kraft & Kniekontrolle A";
  if(plan.day==="M") return "Stabilitätsübungen Beine – leichte Stabilität / Balance";
  return "Stabilitätsübungen Beine – Kraft & Stabilität B";
}

function totalKneeSetCount(plan){
  return plan.exercises.reduce((sum,ex)=>sum+ex.sets,0);
}

function completedKneeSetCount(k, plan){
  return plan.exercises.reduce((sum,ex)=>{
    for(let s=1;s<=ex.sets;s++){
      if(kneeSetDone(k,ex.id,s)) sum++;
    }
    return sum;
  },0);
}

function findKneeRecordByDate(k){
  return state.records.find(r=>r.type==="knee" && (r.kneeDate || r.date)===k) || null;
}

function syncKneeHistoryForDate(k, plan, force=false, performedDate=null){
  ensureKneeState();
  const total=totalKneeSetCount(plan);
  const completed=completedKneeSetCount(k,plan);
  const existing=findKneeRecordByDate(k);

  if(completed===0 && !force){
    if(existing){
      state.records=state.records.filter(r=>r.id!==existing.id);
    }
    return;
  }

  const exercises=plan.exercises.map(ex=>({
    id:ex.id,
    name:ex.name,
    sets:ex.sets,
    doneSets:exerciseCompletionCount(k,ex),
    prescription:ex.prescription
  }));

  // Ein nachgeholtes Stabilitätstraining wird im Verlauf am tatsächlichen
  // Durchführungstag geführt. Ohne explizites Datum bleibt eine bereits gesetzte
  // Zuordnung bestehen.
  const historyDate=performedDate || existing?.performedDate || existing?.date || k;
  const payload={
    id: existing?.id || createRecordId(),
    type:"knee",
    date:historyDate,
    performedDate:historyDate,
    kneeDate:k,
    kneeLabel:kneeTitleForPlan(plan),
    kneeExercises:exercises,
    kneeCompletedSets:completed,
    kneeTotalSets:total,
    kneeDone: completed===total
  };

  if(existing){
    Object.assign(existing,payload);
  }else{
    state.records.push(payload);
  }
}

function applyKneeRecordToState(record, previousDate=null){
  ensureKneeState();
  const oldKey=previousDate || record.kneeDate || record.date;
  const newKey=record.date;
  if(oldKey && oldKey!==newKey){
    delete state.kneeSets[oldKey];
    delete state.kneeDone[oldKey];
    state.records=state.records.filter(r=>!(r.type==="knee" && r.id!==record.id && (r.kneeDate||r.date)===newKey));
  }

  const plan=kneePlanFor(newKey);
  state.kneeSets[newKey]={};
  const inputExercises=record.kneeExercises || [];

  plan.exercises.forEach(ex=>{
    const match=inputExercises.find(item=>item.id===ex.id);
    const doneSets=Math.max(0, Math.min(ex.sets, Number(match?.doneSets || 0)));
    for(let s=1;s<=doneSets;s++){
      setKneeSetDone(newKey,ex.id,s,true);
    }
  });

  const total=totalKneeSetCount(plan);
  const completed=completedKneeSetCount(newKey,plan);
  state.kneeDone[newKey]=total>0 && completed===total;

  record.type="knee";
  record.date=newKey;
  record.kneeDate=newKey;
  record.kneeLabel=kneeTitleForPlan(plan);
  record.kneeExercises=plan.exercises.map(ex=>({
    id:ex.id,
    name:ex.name,
    sets:ex.sets,
    doneSets:exerciseCompletionCount(newKey,ex),
    prescription:ex.prescription
  }));
  record.kneeCompletedSets=completed;
  record.kneeTotalSets=total;
  record.kneeDone=state.kneeDone[newKey];
}

function requiredKneeSetCount(plan){
  return totalKneeSetCount(plan);
}

function completedRequiredKneeSetCount(k, plan){
  return completedKneeSetCount(k,plan);
}

function allRequiredKneeSetsDone(k, plan){
  const required=requiredKneeSetCount(plan);
  return required>0 && completedRequiredKneeSetCount(k,plan)===required;
}

function migrateLegacyKneeDone(k, plan){
  ensureKneeState();
  const hasNewData=state.kneeSets[k] && Object.keys(state.kneeSets[k]).length>0;
  if(state.kneeDone[k] && !hasNewData){
    plan.exercises.forEach(ex=>{
      for(let s=1;s<=ex.sets;s++){
        setKneeSetDone(k,ex.id,s,true);
      }
    });
    save();
  }
}


function activeKneeWorkoutStatus(){
  ensureKneeState();
  const today=todayKey();
  const start=new Date(KNEE_START+"T12:00:00");
  const end=new Date(today+"T12:00:00");
  let latestDue=null;
  let latestPlan=null;

  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
    const k=dateKeyFromDate(d);
    if(k>KNEE_END) break;
    if(!kneeDay(k)) continue;

    const plan=kneePlanFor(k);
    latestDue=k;
    latestPlan=plan;
    migrateLegacyKneeDone(k,plan);
    const done=allRequiredKneeSetsDone(k,plan);
    state.kneeDone[k]=done;
    if(done) syncKneeHistoryForDate(k,plan);

    if(!done){
      return {date:k,plan,done:false,overdue:k<today};
    }
  }

  if(latestDue && latestPlan){
    return {date:latestDue,plan:latestPlan,done:true,overdue:false};
  }
  return {date:null,plan:null,done:true,overdue:false};
}

function exerciseCompletionCount(k, exercise){
  let done=0;
  for(let s=1;s<=exercise.sets;s++){
    if(kneeSetDone(k, exercise.id, s)) done++;
  }
  return done;
}

function nextIncompleteSet(k, exercise){
  for(let s=1;s<=exercise.sets;s++){
    if(!kneeSetDone(k, exercise.id, s)) return s;
  }
  return null;
}

function renderKneeBatteries(k, plan){
  const box=document.querySelector("#kneeBatteries");
  if(!box) return;
  if(!plan.exercises.length){
    box.innerHTML="";
    return;
  }

  const batteries = plan.exercises.map((ex, idx)=>{
    const done=exerciseCompletionCount(k, ex);
    const pct=Math.max(0, Math.min(100, Math.round(done/ex.sets*100)));
    const complete=done>=ex.sets;
    const remaining=Math.max(0, ex.sets-done);
    return `
      <div class="exercise-battery-card ${complete?"complete":""}">
        <div class="exercise-battery-header">
          <div class="exercise-battery-title">Übung ${idx+1}: ${ex.name}</div>
          <div class="exercise-battery-meta">${done}/${ex.sets} Sätze${ex.optional ? ' · optional' : ''}</div>
        </div>
        <div class="battery-shell horizontal">
          <div class="battery-level" style="width:${pct}%"></div>
          <div class="battery-cap horizontal"></div>
          <div class="battery-label">${pct}%</div>
        </div>
        <div class="exercise-battery-sub">${ex.prescription}</div>
        <details class="exercise-info"><summary>Kurze Erklärung</summary><div class="exercise-battery-desc">${ex.description||""}</div></details>
        <div class="exercise-battery-actions">
          <button
            type="button"
            class="battery-set-btn"
            data-exercise-id="${ex.id}"
            ${complete?"disabled":""}
          >${complete?"Komplett":"Satz bestätigen"}</button>
          <div class="exercise-battery-hint">${complete?"Alle Sätze dieser Übung abgeschlossen.":`Noch ${remaining} Satz${remaining===1?'':'e'} offen.`}</div>
        </div>
      </div>`;
  }).join("");
  box.innerHTML=batteries;
}

function renderKnee(){
  const box=document.querySelector(".knee-card");
  const p=document.querySelector("#kneeProgram");
  const e=document.querySelector("#kneeExercises");
  const progress=document.querySelector("#kneeProgress");
  const b=document.querySelector("#toggleKneeDone");
  if(!box || !p || !e || !b) return;

  const today=todayKey();
  const status=activeKneeWorkoutStatus();

  if(!status.date || !status.plan){
    const next=nextKneeDateAfter(today);
    p.innerHTML=`<strong>Noch kein Stabilitätstraining fällig.</strong>${next?`<br><span>Nächste Stabilitätsübungen: ${fmtDateDE(next)}</span>`:""}`;
    e.innerHTML="";
    renderKneeBatteries(today,{exercises:[]});
    if(progress) progress.textContent="";
    b.hidden=true;
    return;
  }

  if(status.done){
    syncKneeHistoryForDate(status.date,status.plan);
    const next=nextKneeDateAfter(today);
    p.innerHTML=`<strong style="color:var(--plank)">Stabilitätsübungen erledigt.</strong><br><span>Regeneration${next?` · nächster Termin: ${fmtDateDE(next)}`:""}</span>`;
    e.innerHTML="";
    renderKneeBatteries(status.date,{exercises:[]});
    if(progress) progress.textContent="";
    b.hidden=true;
    save();
    return;
  }

  const k=status.date;
  const plan=status.plan;
  const title=kneeTitleForPlan(plan);

  p.innerHTML=`<strong>${status.overdue?"Stabilitätstraining noch offen":"Stabilitätstraining heute fällig"}: ${title}</strong>`
    +`${status.overdue?`<br><span>Fällig seit: ${fmtDateDE(k)}</span>`:""}`
    +`<br><span>Die Übungen bleiben sichtbar, bis alle Übungen mit allen Sätzen erledigt sind.</span>`;

  renderKneeBatteries(k,plan);

  if(plan.notes.length){
    e.innerHTML=`<div class="knee-notes">${plan.notes.map(n=>`<div>ℹ︎ ${n}</div>`).join("")}</div>`;
  }else{
    e.innerHTML="";
  }

  const required=requiredKneeSetCount(plan);
  const completed=completedRequiredKneeSetCount(k,plan);
  const done=allRequiredKneeSetsDone(k,plan);
  state.kneeDone[k]=done;
  syncKneeHistoryForDate(k,plan);

  if(progress){
    progress.innerHTML=`<strong>${completed}/${required}</strong> Sätze abgeschlossen${done?" · ✓ komplett":""}`;
  }

  b.hidden=false;
  b.textContent=done
    ?"✓ Alle Sätze erledigt – zurücksetzen"
    :"Alle Sätze markieren / zurücksetzen";
  b.classList.toggle("done",done);

  save();
}

document.querySelector("#kneeBatteries")?.addEventListener("click",(event)=>{
  const btn=event.target.closest(".battery-set-btn");
  if(!btn || btn.disabled) return;

  const status=activeKneeWorkoutStatus();
  if(!status.date || !status.plan || status.done) return;

  const exercise=status.plan.exercises.find(ex=>ex.id===btn.dataset.exerciseId);
  if(!exercise) return;

  const nextSet=nextIncompleteSet(status.date,exercise);
  if(nextSet==null) return;

  setKneeSetDone(status.date,exercise.id,nextSet,true);
  syncKneeHistoryForDate(status.date,status.plan);
  save();
  render();
  renderKnee();
});

document.querySelector("#toggleKneeDone")?.addEventListener("click",()=>{
  const status=activeKneeWorkoutStatus();
  if(!status.date || !status.plan) return;

  const k=status.date;
  const plan=status.plan;
  const markDone=!allRequiredKneeSetsDone(k,plan);

  plan.exercises.forEach(ex=>{
    for(let s=1;s<=ex.sets;s++){
      setKneeSetDone(k,ex.id,s,markDone);
    }
  });

  state.kneeDone=state.kneeDone||{};
  state.kneeDone[k]=markDone;
  syncKneeHistoryForDate(k,plan);
  save();
  render();
  renderKnee();
});

window.addEventListener("load",renderKnee);


// ---------- Web Push reminders via OneSignal ----------
let oneSignalReady=false;
let oneSignalInstance=null;

const REMINDER_PREFS_KEY="356Coach.reminderPrefs.v1";
const DEFAULT_REMINDER_PREFS={
  reminder1Enabled:true,
  reminder1Time:"18:00",
  reminder2Enabled:true,
  reminder2Time:"18:55"
};

function validReminderTime(value){
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value||"");
}

function loadReminderPrefs(){
  try{
    const raw=localStorage.getItem(REMINDER_PREFS_KEY);
    const parsed=raw?JSON.parse(raw):{};
    return {
      reminder1Enabled:parsed.reminder1Enabled!==false,
      reminder1Time:validReminderTime(parsed.reminder1Time)?parsed.reminder1Time:DEFAULT_REMINDER_PREFS.reminder1Time,
      reminder2Enabled:parsed.reminder2Enabled!==false,
      reminder2Time:validReminderTime(parsed.reminder2Time)?parsed.reminder2Time:DEFAULT_REMINDER_PREFS.reminder2Time
    };
  }catch(err){
    return {...DEFAULT_REMINDER_PREFS};
  }
}

function saveReminderPrefsLocal(prefs){
  localStorage.setItem(REMINDER_PREFS_KEY,JSON.stringify(prefs));
}

function readReminderForm(){
  return {
    reminder1Enabled:!!document.querySelector("#reminder1Enabled")?.checked,
    reminder1Time:document.querySelector("#reminder1Time")?.value || "18:00",
    reminder2Enabled:!!document.querySelector("#reminder2Enabled")?.checked,
    reminder2Time:document.querySelector("#reminder2Time")?.value || "18:55"
  };
}

function renderReminderPrefs(prefs){
  const e1=document.querySelector("#reminder1Enabled");
  const t1=document.querySelector("#reminder1Time");
  const e2=document.querySelector("#reminder2Enabled");
  const t2=document.querySelector("#reminder2Time");
  if(e1)e1.checked=!!prefs.reminder1Enabled;
  if(t1)t1.value=prefs.reminder1Time;
  if(e2)e2.checked=!!prefs.reminder2Enabled;
  if(t2)t2.value=prefs.reminder2Time;
  updateReminderSummary(prefs);
}

function updateReminderSummary(prefs=readReminderForm()){
  const el=document.querySelector("#reminderSavedSummary");
  if(!el)return;
  const active=[];
  if(prefs.reminder1Enabled)active.push(prefs.reminder1Time);
  if(prefs.reminder2Enabled)active.push(prefs.reminder2Time);
  el.textContent=active.length?`Aktiv: ${active.join(" & ")} Uhr`:"Alle Trainingserinnerungen ausgeschaltet";
}

async function syncReminderPrefsToOneSignal(OneSignal,prefs){
  if(!OneSignal)return false;
  try{
    OneSignal.User.addTags({
      coach_reminder_1_time:prefs.reminder1Time,
      coach_reminder_1_enabled:prefs.reminder1Enabled?"1":"0",
      coach_reminder_2_time:prefs.reminder2Time,
      coach_reminder_2_enabled:prefs.reminder2Enabled?"1":"0"
    });
    return true;
  }catch(err){
    console.warn("Reminder tags konnten nicht synchronisiert werden:",err);
    return false;
  }
}

async function loadRemoteReminderPrefs(OneSignal){
  try{
    const tags=OneSignal.User.getTags?.() || {};
    const prefs=loadReminderPrefs();
    if(validReminderTime(tags.coach_reminder_1_time))prefs.reminder1Time=tags.coach_reminder_1_time;
    if(tags.coach_reminder_1_enabled==="0" || tags.coach_reminder_1_enabled==="1")prefs.reminder1Enabled=tags.coach_reminder_1_enabled==="1";
    if(validReminderTime(tags.coach_reminder_2_time))prefs.reminder2Time=tags.coach_reminder_2_time;
    if(tags.coach_reminder_2_enabled==="0" || tags.coach_reminder_2_enabled==="1")prefs.reminder2Enabled=tags.coach_reminder_2_enabled==="1";
    saveReminderPrefsLocal(prefs);
    renderReminderPrefs(prefs);
  }catch(err){
    console.warn("Reminder tags konnten nicht gelesen werden:",err);
  }
}

function setPushStatus(message,isError=false){
  const el=document.querySelector("#pushStatus");
  if(!el)return;
  el.textContent=message;
  el.classList.toggle("error",!!isError);
}

function pushConfigured(){
  return !!(window.PUSH_CONFIG && window.PUSH_CONFIG.oneSignalAppId && !window.PUSH_CONFIG.oneSignalAppId.includes("YOUR_"));
}

function isStandaloneWebApp(){
  return window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone===true;
}

function showSubscriptionId(id){
  const panel=document.querySelector("#pushDevicePanel");
  const code=document.querySelector("#pushSubscriptionId");
  if(!panel||!code)return;
  if(id){code.textContent=id;panel.hidden=false;}
  else{code.textContent="–";panel.hidden=true;}
}

async function refreshPushUi(OneSignal){
  const subscribed=!!OneSignal.User.PushSubscription.optedIn;
  const id=OneSignal.User.PushSubscription.id||null;
  document.querySelector("#enablePushBtn").hidden=subscribed;
  document.querySelector("#disablePushBtn").hidden=!subscribed;
  showSubscriptionId(id);
  if(subscribed){
    setPushStatus(id?"Push ist aktiv. Erinnerungszeiten kannst du oben jederzeit ändern.":"Push ist aktiv. Die persönliche Push-ID wird noch erstellt …");
  }else if(Notification.permission==="denied"){
    setPushStatus("Mitteilungen sind für diese Web-App blockiert.",true);
  }else if(!isStandaloneWebApp()){
    setPushStatus("Auf dem iPhone: zuerst zum Home-Bildschirm hinzufügen und von dort öffnen.");
  }else{
    setPushStatus("Bereit. Tippe auf „Erinnerungen aktivieren“.");
  }
}

async function waitForSubscriptionId(OneSignal,maxMs=20000){
  const started=Date.now();
  while(Date.now()-started<maxMs){
    const id=OneSignal.User.PushSubscription.id||null;
    if(id)return id;
    await new Promise(resolve=>setTimeout(resolve,750));
  }
  return null;
}

async function initTrainingPush(){
  renderReminderPrefs(loadReminderPrefs());
  if(!pushConfigured()){
    setPushStatus("Push ist vorbereitet, aber OneSignal ist noch nicht verbunden.");
    return;
  }

  window.OneSignalDeferred=window.OneSignalDeferred||[];
  window.OneSignalDeferred.push(async function(OneSignal){
    try{
      const appBasePath=new URL("./",window.location.href).pathname;
      const normalizedBase=appBasePath.endsWith("/")?appBasePath:appBasePath+"/";
      const workerPath=(normalizedBase+"OneSignalSDKWorker.js").replace(/^\/+/ ,"");
      const workerScope=normalizedBase+"onesignal-push-scope/";

      await OneSignal.init({
        appId:window.PUSH_CONFIG.oneSignalAppId,
        serviceWorkerPath:workerPath,
        serviceWorkerParam:{scope:workerScope},
        autoResubscribe:true,
        notifyButton:{enable:false}
      });

      oneSignalReady=true;
      oneSignalInstance=OneSignal;

      OneSignal.User.PushSubscription.addEventListener("change",event=>{
        const id=event?.current?.id||OneSignal.User.PushSubscription.id||null;
        if(id)showSubscriptionId(id);
        refreshPushUi(OneSignal);
      });

      await loadRemoteReminderPrefs(OneSignal);
      await refreshPushUi(OneSignal);

      if(OneSignal.User.PushSubscription.optedIn){
        await syncReminderPrefsToOneSignal(OneSignal,loadReminderPrefs());
      }

      if(OneSignal.User.PushSubscription.optedIn && !OneSignal.User.PushSubscription.id){
        setPushStatus("Push ist aktiv. Persönliche Push-ID wird noch erstellt …");
        const id=await waitForSubscriptionId(OneSignal);
        if(id){showSubscriptionId(id);setPushStatus("Push ist aktiv. Erinnerungszeiten kannst du oben jederzeit ändern.");}
      }
    }catch(err){
      setPushStatus("Push konnte nicht initialisiert werden. Prüfe den OneSignal-Service-Worker.",true);
      console.warn("OneSignal init:",err);
    }
  });
}

document.querySelector("#saveReminderTimesBtn")?.addEventListener("click",async()=>{
  const prefs=readReminderForm();
  if(!validReminderTime(prefs.reminder1Time)||!validReminderTime(prefs.reminder2Time)){
    setPushStatus("Bitte gültige Erinnerungszeiten auswählen.",true);
    return;
  }
  saveReminderPrefsLocal(prefs);
  updateReminderSummary(prefs);
  if(oneSignalInstance){
    const ok=await syncReminderPrefsToOneSignal(oneSignalInstance,prefs);
    setPushStatus(ok?"Erinnerungszeiten gespeichert und mit OneSignal synchronisiert.":"Zeiten lokal gespeichert; OneSignal-Synchronisierung ist fehlgeschlagen.",!ok);
  }else{
    setPushStatus("Erinnerungszeiten lokal gespeichert. Nach Push-Aktivierung werden sie mit OneSignal synchronisiert.");
  }
});

["#reminder1Enabled","#reminder2Enabled","#reminder1Time","#reminder2Time"].forEach(sel=>{
  document.querySelector(sel)?.addEventListener("change",()=>updateReminderSummary());
});

document.querySelector("#enablePushBtn")?.addEventListener("click",()=>{
  if(!pushConfigured()){setPushStatus("OneSignal muss zuerst mit der App verbunden werden.",true);return;}
  if(!isStandaloneWebApp()){setPushStatus("Bitte 356 Coach zuerst als Web-App zum iPhone-Home-Bildschirm hinzufügen.",true);return;}

  window.OneSignalDeferred=window.OneSignalDeferred||[];
  window.OneSignalDeferred.push(async function(OneSignal){
    try{
      await OneSignal.Notifications.requestPermission();
      if(Notification.permission!=="granted"){setPushStatus("Mitteilungen wurden nicht erlaubt.",true);return;}
      await OneSignal.User.PushSubscription.optIn();
      const prefs=loadReminderPrefs();
      await syncReminderPrefsToOneSignal(OneSignal,prefs);
      await refreshPushUi(OneSignal);
      const id=await waitForSubscriptionId(OneSignal);
      if(id){showSubscriptionId(id);setPushStatus("Push ist aktiv und die Erinnerungszeiten sind synchronisiert.");}
      else{setPushStatus("Mitteilungen sind erlaubt, aber OneSignal hat noch keine Push-ID geliefert. Bitte App einmal schließen und neu öffnen.",true);}
    }catch(err){
      setPushStatus("Aktivierung der Erinnerungen fehlgeschlagen.",true);
      console.warn("Push opt-in:",err);
    }
  });
});

document.querySelector("#disablePushBtn")?.addEventListener("click",()=>{
  window.OneSignalDeferred=window.OneSignalDeferred||[];
  window.OneSignalDeferred.push(async function(OneSignal){
    try{
      await OneSignal.User.PushSubscription.optOut();
      await refreshPushUi(OneSignal);
      setPushStatus("Trainingserinnerungen sind auf diesem Gerät deaktiviert.");
    }catch(err){setPushStatus("Deaktivierung fehlgeschlagen.",true);}
  });
});

document.querySelector("#copySubscriptionId")?.addEventListener("click",async()=>{
  const value=document.querySelector("#pushSubscriptionId")?.textContent?.trim();
  if(!value||value==="–")return;
  try{await navigator.clipboard.writeText(value);setPushStatus("Persönliche Push-ID kopiert.");}
  catch(err){setPushStatus("Kopieren nicht möglich. Halte die ID gedrückt und kopiere sie manuell.",true);}
});

window.addEventListener("load",initTrainingPush);
