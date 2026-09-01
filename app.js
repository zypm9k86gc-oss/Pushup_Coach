
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

const EXACT_PLAN=[{"date":"2026-08-24","pushups":80,"plank":70,"sets":"10×8","checkpoint":false},{"date":"2026-08-26","pushups":89,"plank":77,"sets":"5×8 + 7×7","checkpoint":false},{"date":"2026-08-28","pushups":98,"plank":85,"sets":"10×9 + 1×8","checkpoint":false},{"date":"2026-08-31","pushups":107,"plank":92,"sets":"11×9 + 1×8","checkpoint":false},{"date":"2026-09-02","pushups":116,"plank":100,"sets":"12×9 + 1×8","checkpoint":false},{"date":"2026-09-04","pushups":125,"plank":107,"sets":"8×10 + 5×9","checkpoint":true},{"date":"2026-09-07","pushups":134,"plank":114,"sets":"8×10 + 6×9","checkpoint":false},{"date":"2026-09-09","pushups":143,"plank":122,"sets":"8×10 + 7×9","checkpoint":false},{"date":"2026-09-11","pushups":152,"plank":129,"sets":"12×11 + 2×10","checkpoint":false},{"date":"2026-09-14","pushups":161,"plank":137,"sets":"11×11 + 4×10","checkpoint":false},{"date":"2026-09-16","pushups":170,"plank":144,"sets":"10×11 + 6×10","checkpoint":false},{"date":"2026-09-18","pushups":179,"plank":152,"sets":"14×12 + 1×11","checkpoint":true},{"date":"2026-09-21","pushups":188,"plank":159,"sets":"12×12 + 4×11","checkpoint":false},{"date":"2026-09-23","pushups":197,"plank":166,"sets":"10×12 + 7×11","checkpoint":false},{"date":"2026-09-25","pushups":206,"plank":174,"sets":"14×13 + 2×12","checkpoint":false},{"date":"2026-09-28","pushups":214,"plank":181,"sets":"10×13 + 7×12","checkpoint":false},{"date":"2026-09-30","pushups":223,"plank":189,"sets":"15×14 + 1×13","checkpoint":false},{"date":"2026-10-02","pushups":232,"plank":196,"sets":"11×14 + 6×13","checkpoint":true},{"date":"2026-10-05","pushups":241,"plank":203,"sets":"7×14 + 11×13","checkpoint":false},{"date":"2026-10-07","pushups":250,"plank":211,"sets":"12×15 + 5×14","checkpoint":false},{"date":"2026-10-09","pushups":259,"plank":218,"sets":"7×15 + 11×14","checkpoint":false},{"date":"2026-10-12","pushups":268,"plank":226,"sets":"16×15 + 2×14","checkpoint":false},{"date":"2026-10-14","pushups":277,"plank":233,"sets":"7×16 + 11×15","checkpoint":false},{"date":"2026-10-16","pushups":286,"plank":241,"sets":"16×16 + 2×15","checkpoint":true},{"date":"2026-10-19","pushups":295,"plank":248,"sets":"10×16 + 9×15","checkpoint":false},{"date":"2026-10-21","pushups":304,"plank":255,"sets":"16×17 + 2×16","checkpoint":false},{"date":"2026-10-23","pushups":313,"plank":263,"sets":"9×17 + 10×16","checkpoint":false},{"date":"2026-10-26","pushups":322,"plank":270,"sets":"18×17 + 1×16","checkpoint":false},{"date":"2026-10-28","pushups":331,"plank":278,"sets":"8×18 + 11×17","checkpoint":false},{"date":"2026-10-30","pushups":340,"plank":285,"sets":"17×18 + 2×17","checkpoint":true},{"date":"2026-10-31","pushups":356,"plank":300,"sets":"14×20 + 4×19","checkpoint":true}];
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
  return {push,plank,done:push>=item.pushups && plank>=item.plank};
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
  const plankPct = Math.min(100, Math.round(t.plank/300*100));
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

  const hist = [...state.records].sort((a,b)=>b.date.localeCompare(a.date));
  document.querySelector("#history").innerHTML = hist.length
    ? hist.map(r=>`<div class="history-row">
        <div class="history-date">${fmtDateDE(r.date)}</div>
        <strong>${r.pushups || 0} LS</strong>
        <strong>${fmtTime(r.plank || 0)}</strong>
        <button class="history-edit-btn" type="button" data-edit-record="${r.id}" aria-label="Training vom ${r.date} bearbeiten">Bearbeiten</button>
      </div>`).join("")
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

document.querySelector("#addPlankBtn").addEventListener("click", ()=>{
  const minInput = document.querySelector("#plankMinutesInput");
  const secInput = document.querySelector("#plankSecondsInput");
  const minutes = Math.max(0, Number(minInput.value) || 0);
  const seconds = Math.max(0, Math.min(59, Number(secInput.value) || 0));
  const total = Math.floor(minutes * 60 + seconds);

  if(total > 0){
    state.todayPlank += total;
    minInput.value = "";
    secInput.value = "";
    save(); render();
  }
});

document.querySelector("#finishWorkout").addEventListener("click", ()=>{
  if(state.todayPushups===0 && state.todayPlank===0) return;
  state.records.push({
    id: createRecordId(),
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





const editDialog = document.querySelector("#editRecordDialog");
const editForm = document.querySelector("#editRecordForm");
const editDate = document.querySelector("#editRecordDate");
const editPushups = document.querySelector("#editRecordPushups");
const editPlankMin = document.querySelector("#editRecordPlankMin");
const editPlankSec = document.querySelector("#editRecordPlankSec");
const editRecordId = document.querySelector("#editRecordId");

function openRecordEditor(id){
  const record=findRecordById(id);
  if(!record) return;
  editRecordId.value=record.id;
  editDate.value=record.date;
  editDate.max=todayKey();
  editPushups.value=record.pushups || 0;
  editPlankMin.value=Math.floor((record.plank || 0)/60);
  editPlankSec.value=(record.plank || 0)%60;
  editDialog.showModal();
}

document.querySelector("#history").addEventListener("click", event=>{
  const btn=event.target.closest("[data-edit-record]");
  if(btn) openRecordEditor(btn.dataset.editRecord);
});

document.querySelector("#closeEditRecord").addEventListener("click", ()=>editDialog.close());

editDialog.addEventListener("click", event=>{
  if(event.target===editDialog) editDialog.close();
});

editForm.addEventListener("submit", event=>{
  event.preventDefault();
  const record=findRecordById(editRecordId.value);
  if(!record) return editDialog.close();

  const date=editDate.value;
  const pushups=Math.max(0, Math.floor(Number(editPushups.value) || 0));
  const minutes=Math.max(0, Math.floor(Number(editPlankMin.value) || 0));
  const seconds=Math.max(0, Math.min(59, Math.floor(Number(editPlankSec.value) || 0)));

  if(!date || date>todayKey()){
    alert("Bitte ein gültiges Datum bis einschließlich heute wählen.");
    return;
  }

  record.date=date;
  record.pushups=pushups;
  record.plank=minutes*60+seconds;
  save();
  editDialog.close();
  render();
});

document.querySelector("#deleteRecordBtn").addEventListener("click", ()=>{
  const record=findRecordById(editRecordId.value);
  if(!record) return editDialog.close();
  if(!confirm(`Training vom ${fmtDateDE(record.date)} wirklich löschen?`)) return;
  state.records=state.records.filter(r=>r.id!==record.id);
  save();
  editDialog.close();
  render();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js?v=10", { updateViaCache: "none" });
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

document.querySelector("#addPushAlways").addEventListener("click",()=>{const i=document.querySelector("#pushInputAlways"),n=Number(i.value);if(n>0){state.todayPushups+=n;i.value="";save();render();}});
document.querySelector("#addPlankAlways").addEventListener("click",()=>{const mi=document.querySelector("#plankMinAlways"),si=document.querySelector("#plankSecAlways");const n=(Math.max(0,Number(mi.value)||0)*60)+Math.max(0,Math.min(59,Number(si.value)||0));if(n>0){state.todayPlank+=Math.floor(n);mi.value="";si.value="";save();render();}});


// ---------- Backup / Restore ----------
function makeBackupPayload(){
  return {
    app: "356 Coach",
    version: 10,
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
  }catch(err){
    setBackupStatus("Diese Datei ist kein gültiges 356-Coach-Backup.", true);
    event.target.value="";
  }
});
