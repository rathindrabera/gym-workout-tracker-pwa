// ==========================================
// IRONFORGE - DOUBLE MUSCLE WORKOUT TRACKER
// ==========================================

// --- 1. DEFAULT ROUTINE CONFIGURATION ---
const DEFAULT_ROUTINES = [
  {
    id: "sun",
    day: "Sunday",
    dayIndex: 0,
    isRest: true,
    title: "Rest & Recovery",
    description: "Full rest and muscle recovery.",
    treadmill: { title: "Rest", speed: "-", incline: "-", duration: "0 min", desc: "No cardio scheduled." },
    exercises: []
  },
  {
    id: "mon",
    day: "Monday",
    dayIndex: 1,
    isRest: false,
    title: "Upper Body (Chest & Back)",
    description: "Horizontal pressing and vertical pulling.",
    treadmill: { title: "Incline Walk", speed: "5.0 km/h", incline: "8%", duration: "15 min", desc: "Steady-state fat burn." },
    exercises: [
      { name: "Bench Press", sets: [{ r: 10, w: "20kg" }, { r: 8, w: "25kg" }, { r: 6, w: "30kg" }] },
      { name: "Lat Pulldown / Pull-ups", sets: [{ r: 10, w: "35kg" }, { r: 8, w: "40kg" }, { r: 8, w: "45kg" }] }
    ]
  },
  {
    id: "tue",
    day: "Tuesday",
    dayIndex: 2,
    isRest: false,
    title: "Lower Body (Quads & Calves)",
    description: "Squat progression and calf hypertrophy.",
    treadmill: { title: "HIIT Sprints", speed: "10.0 km/h", incline: "0%", duration: "12 min", desc: "30s sprint / 30s rest intervals." },
    exercises: [
      { name: "Barbell Squats", sets: [{ r: 10, w: "40kg" }, { r: 8, w: "50kg" }, { r: 6, w: "60kg" }] },
      { name: "Calf Raises", sets: [{ r: 15, w: "30kg" }, { r: 12, w: "40kg" }, { r: 10, w: "45kg" }] }
    ]
  },
  {
    id: "wed",
    day: "Wednesday",
    dayIndex: 3,
    isRest: true,
    title: "Active Recovery",
    description: "Mobility, core, and light stretching.",
    treadmill: { title: "Recovery Walk", speed: "4.5 km/h", incline: "3%", duration: "15 min", desc: "Low-intensity flush." },
    exercises: []
  },
  {
    id: "thu",
    day: "Thursday",
    dayIndex: 4,
    isRest: false,
    title: "Push / Shoulders & Arms",
    description: "Overhead power and direct arm work.",
    treadmill: { title: "Incline Walk", speed: "5.0 km/h", incline: "10%", duration: "15 min", desc: "Steady fat burn." },
    exercises: [
      { name: "Overhead Shoulder Press", sets: [{ r: 10, w: "12kg" }, { r: 8, w: "14kg" }, { r: 8, w: "16kg" }] },
      { name: "Dumbbell Bicep Curls", sets: [{ r: 12, w: "10kg" }, { r: 10, w: "12kg" }, { r: 8, w: "14kg" }] }
    ]
  },
  {
    id: "fri",
    day: "Friday",
    dayIndex: 5,
    isRest: false,
    title: "Posterior Chain (Hams & Back)",
    description: "Hip hinge mechanics and row volume.",
    treadmill: { title: "HIIT Conditioning", speed: "9.0 km/h", incline: "4%", duration: "15 min", desc: "Short interval bursts." },
    exercises: [
      { name: "Romanian Deadlifts (RDL)", sets: [{ r: 10, w: "40kg" }, { r: 8, w: "50kg" }, { r: 6, w: "60kg" }] },
      { name: "Seated Cable Rows", sets: [{ r: 12, w: "30kg" }, { r: 10, w: "35kg" }, { r: 8, w: "40kg" }] }
    ]
  },
  {
    id: "sat",
    day: "Saturday",
    dayIndex: 6,
    isRest: true,
    title: "Weekend Rest",
    description: "Rest, hydrate, and prepare for next cycle.",
    treadmill: { title: "Rest", speed: "-", incline: "-", duration: "0 min", desc: "No cardio scheduled." },
    exercises: []
  }
];
 

// --- 2. STATE & DATE HELPERS ---
let routines = JSON.parse(localStorage.getItem('ironforge_routines')) || DEFAULT_ROUTINES;
let completedLog = JSON.parse(localStorage.getItem('ironforge_completed')) || {};

function getTodayDateString(offsetDays = 0) {
  const d = new Date();
  if (offsetDays !== 0) d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDateKey(key, dateStr = getTodayDateString()) {
  return `${dateStr}:${key}`;
}

const todayIndex = new Date().getDay();
const todayRoutine = routines.find(r => r.dayIndex === todayIndex) || routines[1];
let selectedDay = todayRoutine.id;

let editingExerciseIndex = null;
let modalIsRest = false;
let activeAnalyticsFilter = 7;

const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
document.getElementById('currentDateDisplay').textContent = new Date().toLocaleDateString(undefined, dateOptions);

function saveRoutines() {
  localStorage.setItem('ironforge_routines', JSON.stringify(routines));
}

function saveCompleted() {
  localStorage.setItem('ironforge_completed', JSON.stringify(completedLog));
  updateProgress();
  renderAnalytics();
}

// --- 3. NAVIGATION & TABS ---
function switchTab(tab) {
  if (tab === 'tracker') {
    document.getElementById('trackerTab').classList.remove('hidden');
    document.getElementById('analyticsTab').classList.add('hidden');
    document.getElementById('nav-tracker').className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2";
    document.getElementById('nav-analytics').className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 flex items-center justify-center gap-2";
  } else {
    document.getElementById('trackerTab').classList.add('hidden');
    document.getElementById('analyticsTab').classList.remove('hidden');
    document.getElementById('nav-analytics').className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2";
    document.getElementById('nav-tracker').className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 flex items-center justify-center gap-2";
    renderAnalytics();
  }
}

function renderDayTabs() {
  const container = document.getElementById('dayTabs');
  const ordered = [...routines.slice(1), routines[0]];
  container.innerHTML = ordered.map(r => {
    const isToday = r.dayIndex === todayIndex;
    const isSelected = selectedDay === r.id;
    return `
      <button onclick="setDay('${r.id}')" class="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
        isSelected 
          ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' 
          : 'bg-slate-800/90 text-slate-400 hover:bg-slate-700'
      }">
        <span>${r.day.slice(0, 3)}</span>
        ${r.isRest ? '<i class="fi fi-sr-bed text-[10px] opacity-70"></i>' : ''}
        ${isToday ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>' : ''}
      </button>
    `;
  }).join('');
}

function setDay(id) {
  selectedDay = id;
  renderDayTabs();
  renderRoutine();
  updateProgress();
}

// --- 4. RENDER ROUTINE & TREADMILL ---
function renderRoutine() {
  const r = routines.find(x => x.id === selectedDay);
  const container = document.getElementById('routineCard');
  const tmContainer = document.getElementById('treadmillCard');

  if (r.isRest) {
    container.innerHTML = `
      <div class="text-center py-6 text-slate-400 space-y-2">
        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
          <span class="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
            <i class="fi fi-sr-bed text-xs"></i> Rest Day
          </span>
          <button onclick="openDayConfigModal()" class="text-xs bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 font-semibold flex items-center gap-1.5">
            <i class="fi fi-sr-settings text-xs"></i> Customize Day
          </button>
        </div>
        <p class="text-base font-bold text-slate-200 mt-2">${r.title}</p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">${r.description || 'No resistance workouts scheduled.'}</p>
        <div class="pt-3">
          <button onclick="openModalForNew()" class="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-sky-500/20 flex items-center gap-1.5 mx-auto">
            <i class="fi fi-sr-plus text-xs"></i> Add Workout To This Day
          </button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="flex justify-between items-start border-b border-slate-800 pb-3">
        <div>
          <h2 class="text-base font-bold text-white">${r.title}</h2>
          <p class="text-[11px] text-slate-400 mt-0.5">${r.description || `${r.day} • Ascending Weight Targets`}</p>
        </div>
        <div class="flex items-center gap-1.5">
          <button onclick="openDayConfigModal()" class="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1">
            <i class="fi fi-sr-settings text-[10px]"></i> Config
          </button>
          <button onclick="openModalForNew()" class="text-[11px] bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1">
            <i class="fi fi-sr-plus text-[10px]"></i> Add Lift
          </button>
        </div>
      </div>

      <div class="space-y-3 pt-1">
        ${r.exercises.length === 0 ? `
          <p class="text-xs text-slate-500 text-center py-4">No exercises added yet. Tap "+ Add Lift" above.</p>
        ` : r.exercises.map((ex, exIdx) => {
          const key = getDateKey(`${r.id}_ex_${exIdx}`);
          const isDone = !!completedLog[key];
          return `
            <div class="p-3.5 rounded-xl border transition-all ${
              isDone 
                ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80' 
                : 'bg-slate-800/40 border-slate-700/50'
            }">
              <div class="flex justify-between items-center mb-2.5">
                <div class="flex items-center gap-2.5">
                  <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleDone('${r.id}_ex_${exIdx}')" 
                         class="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-0 cursor-pointer" />
                  <span class="font-bold text-sm ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}">${ex.name}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="openModalForEdit(${exIdx})" class="text-[11px] text-sky-400 hover:underline">Edit</button>
                  <button onclick="deleteExercise(${exIdx})" class="text-[11px] text-rose-400 hover:underline">Delete</button>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-1.5 text-center text-xs">
                ${ex.sets.map((s, sIdx) => `
                  <div class="bg-slate-900/90 p-1.5 rounded-lg border border-slate-800">
                    <span class="text-[9px] text-slate-500 block uppercase font-bold">Set ${sIdx + 1}</span>
                    <span class="text-sky-400 font-extrabold text-xs block">${s.w}</span>
                    <span class="text-[10px] text-slate-400">${s.r} reps</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  const tmKey = getDateKey(`${r.id}_treadmill`);
  const isTmDone = !!completedLog[tmKey];
  const hasCardio = r.treadmill.duration && r.treadmill.duration !== "0 min" && r.treadmill.duration !== "0";

  tmContainer.innerHTML = `
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2.5">
        ${hasCardio ? `
          <input type="checkbox" ${isTmDone ? 'checked' : ''} onchange="toggleDone('${r.id}_treadmill')" 
                 class="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-0 cursor-pointer" />
        ` : ''}
        <h3 class="font-bold text-sky-400 text-sm flex items-center gap-1.5">
          <i class="fi fi-sr-running text-sm"></i> Treadmill Target
        </h3>
      </div>
      <span class="text-[11px] text-slate-300 font-medium bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
        ${hasCardio ? `${r.treadmill.incline} Incline • ${r.treadmill.speed} • ${r.treadmill.duration}` : 'Rest'}
      </span>
    </div>
    <p class="text-xs text-slate-400">${r.treadmill.title || 'Cardio'} — ${r.treadmill.desc || 'None scheduled'}</p>
  `;
}

// --- 5. DAY CONFIGURATION MODAL ---
function openDayConfigModal() {
  const r = routines.find(x => x.id === selectedDay);
  document.getElementById('dayConfigTitle').innerHTML = `<i class="fi fi-sr-settings text-sky-400 text-xs"></i> <span>Customize ${r.day}</span>`;
  document.getElementById('cfgTitle').value = r.title;
  document.getElementById('cfgDesc').value = r.description || "";
  document.getElementById('cfgTmTitle').value = r.treadmill.title || "";
  document.getElementById('cfgTmSpeed').value = r.treadmill.speed || "";
  document.getElementById('cfgTmIncline').value = r.treadmill.incline || "";
  document.getElementById('cfgTmDuration').value = r.treadmill.duration || "";
  document.getElementById('cfgTmDesc').value = r.treadmill.desc || "";

  setModalDayType(r.isRest);
  document.getElementById('dayConfigModal').classList.remove('hidden');
}

function closeDayConfigModal() {
  document.getElementById('dayConfigModal').classList.add('hidden');
}

function setModalDayType(isRest) {
  modalIsRest = isRest;
  const btnWorkout = document.getElementById('btnStatusWorkout');
  const btnRest = document.getElementById('btnStatusRest');

  if (isRest) {
    btnRest.className = "flex-1 py-2 rounded-lg font-bold border border-amber-500/50 bg-amber-500/20 text-amber-300 flex items-center justify-center gap-1.5";
    btnWorkout.className = "flex-1 py-2 rounded-lg font-bold border border-slate-800 bg-slate-850 text-slate-500 flex items-center justify-center gap-1.5";
  } else {
    btnWorkout.className = "flex-1 py-2 rounded-lg font-bold border border-emerald-500/50 bg-emerald-500/20 text-emerald-300 flex items-center justify-center gap-1.5";
    btnRest.className = "flex-1 py-2 rounded-lg font-bold border border-slate-800 bg-slate-850 text-slate-500 flex items-center justify-center gap-1.5";
  }
}

function saveDayConfigChanges() {
  const r = routines.find(x => x.id === selectedDay);
  r.isRest = modalIsRest;
  r.title = document.getElementById('cfgTitle').value.trim() || (r.isRest ? "Rest Day" : "Custom Workout");
  r.description = document.getElementById('cfgDesc').value.trim();

  r.treadmill = {
    title: document.getElementById('cfgTmTitle').value.trim() || "Cardio Session",
    speed: document.getElementById('cfgTmSpeed').value.trim() || "-",
    incline: document.getElementById('cfgTmIncline').value.trim() || "-",
    duration: document.getElementById('cfgTmDuration').value.trim() || (r.isRest ? "0 min" : "20 min"),
    desc: document.getElementById('cfgTmDesc').value.trim() || "Custom cardio routine"
  };

  saveRoutines();
  closeDayConfigModal();
  renderDayTabs();
  renderRoutine();
  updateProgress();
}

// --- 6. EXERCISE MODAL ---
function openModalForNew() {
  editingExerciseIndex = null;
  document.getElementById('modalTitle').innerHTML = `<i class="fi fi-sr-plus text-sky-400 text-xs"></i> <span>Add New Exercise</span>`;
  document.getElementById('modalExName').value = "";
  renderModalSets([{ r: 12, w: "20kg" }, { r: 10, w: "22.5kg" }, { r: 8, w: "25kg" }]);
  document.getElementById('editModal').classList.remove('hidden');
}

function openModalForEdit(idx) {
  editingExerciseIndex = idx;
  const r = routines.find(x => x.id === selectedDay);
  const ex = r.exercises[idx];
  document.getElementById('modalTitle').innerHTML = `<i class="fi fi-sr-pencil text-sky-400 text-xs"></i> <span>Edit Exercise</span>`;
  document.getElementById('modalExName').value = ex.name;
  renderModalSets(ex.sets);
  document.getElementById('editModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('editModal').classList.add('hidden');
}

function renderModalSets(sets) {
  const container = document.getElementById('modalSetsContainer');
  container.innerHTML = sets.map((s, i) => `
    <div class="flex items-center gap-2 set-row">
      <span class="text-[10px] text-slate-500 font-bold w-10">Set ${i + 1}</span>
      <input type="text" class="set-weight flex-1 rounded p-1.5 text-xs text-center" value="${s.w}" placeholder="Weight" />
      <input type="number" class="set-reps w-20 rounded p-1.5 text-xs text-center" value="${s.r}" placeholder="Reps" />
      <button onclick="this.parentElement.remove()" class="text-rose-400 text-xs px-1">&times;</button>
    </div>
  `).join('');
}

function addSetField() {
  const container = document.getElementById('modalSetsContainer');
  const count = container.querySelectorAll('.set-row').length + 1;
  const div = document.createElement('div');
  div.className = "flex items-center gap-2 set-row";
  div.innerHTML = `
    <span class="text-[10px] text-slate-500 font-bold w-10">Set ${count}</span>
    <input type="text" class="set-weight flex-1 rounded p-1.5 text-xs text-center" value="20kg" placeholder="Weight" />
    <input type="number" class="set-reps w-20 rounded p-1.5 text-xs text-center" value="10" placeholder="Reps" />
    <button onclick="this.parentElement.remove()" class="text-rose-400 text-xs px-1">&times;</button>
  `;
  container.appendChild(div);
}

function saveModalChanges() {
  const name = document.getElementById('modalExName').value.trim();
  if (!name) return alert('Please enter an exercise name.');

  const setRows = document.querySelectorAll('.set-row');
  const sets = Array.from(setRows).map(row => ({
    w: row.querySelector('.set-weight').value || '0kg',
    r: parseInt(row.querySelector('.set-reps').value) || 10
  }));

  const r = routines.find(x => x.id === selectedDay);
  if (r.isRest) r.isRest = false;

  if (editingExerciseIndex !== null) {
    r.exercises[editingExerciseIndex] = { name, sets };
  } else {
    r.exercises.push({ name, sets });
  }

  saveRoutines();
  closeModal();
  renderDayTabs();
  renderRoutine();
  updateProgress();
}

function deleteExercise(idx) {
  if (!confirm("Delete this exercise?")) return;
  const r = routines.find(x => x.id === selectedDay);
  r.exercises.splice(idx, 1);
  saveRoutines();
  renderRoutine();
  updateProgress();
}

// --- 7. PROGRESS & ACTIVE LOGIC ---
function toggleDone(rawKey) {
  const key = getDateKey(rawKey);
  completedLog[key] = !completedLog[key];
  saveCompleted();
  renderRoutine();
}

function updateProgress() {
  const r = routines.find(x => x.id === selectedDay);
  if (r.isRest) {
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('progressText').textContent = 'Rest Day Active';
    return;
  }

  const hasCardio = r.treadmill.duration && r.treadmill.duration !== "0 min" && r.treadmill.duration !== "0";
  let total = r.exercises.length + (hasCardio ? 1 : 0);
  
  if (total === 0) {
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressText').textContent = '0% (No Lifts)';
    return;
  }

  let done = 0;
  r.exercises.forEach((_, idx) => {
    if (completedLog[getDateKey(`${r.id}_ex_${idx}`)]) done++;
  });
  if (hasCardio && completedLog[getDateKey(`${r.id}_treadmill`)]) done++;

  const pct = Math.round((done / total) * 100);
  document.getElementById('progressBar').style.width = `${pct}%`;
  document.getElementById('progressText').textContent = `${pct}% Complete (${done}/${total})`;
}

// --- 8. TIME-SERIES ANALYTICS ENGINE & GRAPH ---
function getHistoricalStats(daysRange = 7) {
  let liftCount = 0;
  let cardioCount = 0;
  const activeDates = new Set();
  const dailyPoints = [];

  for (let i = daysRange - 1; i >= 0; i--) {
    const dStr = getTodayDateString(-i);
    let dayLifts = 0;
    let dayCardio = 0;

    Object.keys(completedLog).forEach(key => {
      if (key.startsWith(dStr) && completedLog[key]) {
        if (key.includes('_ex_')) dayLifts++;
        if (key.includes('_treadmill')) dayCardio++;
      }
    });

    if (dayLifts > 0 || dayCardio > 0) activeDates.add(dStr);
    liftCount += dayLifts;
    cardioCount += dayCardio;
    dailyPoints.push({ date: dStr, lifts: dayLifts, cardio: dayCardio });
  }

  const calorieBurn = (liftCount * 45) + (cardioCount * 180);
  return { liftCount, cardioCount, activeDays: activeDates.size, calorieBurn, dailyPoints };
}

function setAnalyticsTimeframe(days) {
  activeAnalyticsFilter = days;
  document.querySelectorAll('.timeframe-btn').forEach(b => {
    b.className = "timeframe-btn flex-1 py-1.5 rounded-lg text-xs font-bold transition-all bg-slate-800 text-slate-400";
  });
  document.getElementById(`btn-timeframe-${days}`).className = "timeframe-btn flex-1 py-1.5 rounded-lg text-xs font-bold transition-all bg-sky-500 text-slate-950 shadow";
  renderAnalytics();
}

function renderAnalytics() {
  const stats = getHistoricalStats(activeAnalyticsFilter);

  if (document.getElementById('statCompletedEx')) {
    document.getElementById('statCompletedEx').textContent = stats.liftCount;
    document.getElementById('statCompletedCardio').textContent = stats.cardioCount;
    document.getElementById('statCalorieBurn').textContent = `~${stats.calorieBurn} kcal`;
    document.getElementById('statActiveDays').textContent = `${stats.activeDays} Days Active`;
  }

  const weekContainer = document.getElementById('weekCheckmarks');
  if (weekContainer) {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) last7Days.push(getTodayDateString(-i));

    weekContainer.innerHTML = last7Days.map(dStr => {
      const dObj = new Date(dStr);
      const dayLetter = ['S','M','T','W','T','F','S'][dObj.getDay()];
      let hasDone = false;
      Object.keys(completedLog).forEach(k => {
        if (k.startsWith(dStr) && completedLog[k]) hasDone = true;
      });

      return `
        <div class="p-2 rounded-lg border ${hasDone ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-500'}">
          <span class="block font-bold text-[10px]">${dayLetter}</span>
          <span class="text-xs">${hasDone ? '✓' : '•'}</span>
        </div>
      `;
    }).join('');
  }

  const badgeEx = document.getElementById('badgeExDone');
  const badgeCardio = document.getElementById('badgeCardioDone');
  if (badgeEx && badgeCardio) {
    const weeklyStats = getHistoricalStats(7);
    badgeEx.textContent = weeklyStats.liftCount;
    badgeCardio.textContent = weeklyStats.cardioCount;
  }

  renderActivityChart(stats.dailyPoints);
}

function renderActivityChart(points) {
  const canvas = document.getElementById('analyticsChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);

  if (!points || points.length === 0) return;

  const maxVal = Math.max(...points.map(p => p.lifts + p.cardio), 5);
  const stepX = (w - 40) / (points.length - 1 || 1);

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 3; i++) {
    const y = (h - 30) * (i / 3);
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();
  }

  const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
  fillGrad.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
  fillGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

  ctx.beginPath();
  points.forEach((p, i) => {
    const total = p.lifts + p.cardio;
    const x = 20 + i * stepX;
    const y = (h - 30) - (total / maxVal) * (h - 50);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(20 + (points.length - 1) * stepX, h - 20);
  ctx.lineTo(20, h - 20);
  ctx.fillStyle = fillGrad;
  ctx.fill();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  points.forEach((p, i) => {
    const total = p.lifts + p.cardio;
    const x = 20 + i * stepX;
    const y = (h - 30) - (total / maxVal) * (h - 50);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  points.forEach((p, i) => {
    const total = p.lifts + p.cardio;
    const x = 20 + i * stepX;
    const y = (h - 30) - (total / maxVal) * (h - 50);

    ctx.fillStyle = total > 0 ? '#10b981' : '#334155';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function calcMacros() {
  const currentW = parseFloat(document.getElementById('userWeight').value) || 0;
  const targetW = parseFloat(document.getElementById('targetWeight').value) || 0;
  const deficit = parseFloat(document.getElementById('userDeficit').value) || 450;

  if (currentW <= 0) return;

  // Persist values
  localStorage.setItem('ironforge_weight', currentW);
  if (targetW > 0) localStorage.setItem('ironforge_target_weight', targetW);
  localStorage.setItem('ironforge_deficit', deficit);

  // 1. Daily Nutrition Targets
  const maintenance = Math.round(currentW * 33);
  const targetCalories = Math.max(1200, maintenance - deficit);
  const protein = Math.round(currentW * 2.0); // 2.0g per kg to preserve lean tissue

  document.getElementById('calVal').textContent = `${targetCalories} kcal`;
  document.getElementById('protVal').textContent = `${protein}g`;

  // 2. Weekly Loss Velocity
  // 1 kg body fat ≈ 7,700 kcal
  const weeklyDeficit = deficit * 7;
  const weeklyLossKg = (weeklyDeficit / 7700).toFixed(2);
  document.getElementById('lossRateVal').textContent = `-${weeklyLossKg} kg/wk`;

  // 3. Goal Projection Calculation
  const badge = document.getElementById('goalTimelineBadge');
  const projectionEl = document.getElementById('goalProjectionText');

  if (targetW > 0 && targetW < currentW) {
    const totalToLose = currentW - targetW;
    const totalDaysNeeded = Math.round((totalToLose * 7700) / deficit);
    const weeksNeeded = (totalDaysNeeded / 7).toFixed(1);

    // Target arrival date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + totalDaysNeeded);
    const dateFormatted = targetDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });

    badge.textContent = `~${weeksNeeded} Weeks`;
    projectionEl.innerHTML = `To drop <span class="text-emerald-400 font-bold">${totalToLose.toFixed(1)} kg</span> at <span class="text-amber-400 font-bold">${deficit} kcal/day</span> deficit, target goal arrival is <span class="text-sky-400 font-bold">${dateFormatted}</span> (~${weeksNeeded} weeks).`;
  } else if (targetW >= currentW) {
    badge.textContent = "Maintain / Bulk";
    projectionEl.innerHTML = `Target weight is equal to or above current weight. Adjust deficit to zero or surplus for lean mass acquisition.`;
  } else {
    badge.textContent = "-- Weeks";
    projectionEl.textContent = "Enter your target weight to see the projected duration.";
  }
}

function openScienceModal() {
  document.getElementById('scienceModal').classList.remove('hidden');
}

function closeScienceModal() {
  document.getElementById('scienceModal').classList.add('hidden');
}


function resetToDefaults() {
  if (!confirm("Reset all routines, custom groups, and treadmill targets to default split?")) return;
  routines = JSON.parse(JSON.stringify(DEFAULT_ROUTINES));
  completedLog = {};
  saveRoutines();
  saveCompleted();
  renderDayTabs();
  renderRoutine();
  updateProgress();
  renderAnalytics();
}

// --- 9. INTERACTIVE DEMO TOUR ---
let currentTourStep = 0;
const tourSteps = [
  {
    targetId: 'tour-step-1',
    title: 'Auto-Detected Split',
    text: 'IronForge automatically opens today\'s split. Tap any weekday button to inspect workouts or customize rest schedules.'
  },
  {
    targetId: 'tour-step-2',
    title: 'Double-Muscle Pyramids',
    text: 'Each exercise lists ascending weight targets. Tap the checkbox to mark completed sets and trigger real-time progress calculations.'
  },
  {
    targetId: 'tour-step-3',
    title: 'Treadmill & Cardio Targets',
    text: 'Incline LISS and HIIT protocols are programmed post-lift to burn calories without sacrificing muscle mass.'
  },
  {
    targetId: 'tour-step-4',
    title: 'Analytics & Macro Engine',
    text: 'Switch tabs anytime to view your rolling time-series graph, active calorie burn, and adjust your personalized daily deficit.'
  }
];

function startDemoTour(force = false) {
  if (!force && localStorage.getItem('ironforge_tour_completed')) return;
  currentTourStep = 0;
  switchTab('tracker');
  document.getElementById('tourModal').classList.remove('hidden');
  renderTourStep();
}

function renderTourStep() {
  document.querySelectorAll('.tour-focus').forEach(el => el.classList.remove('tour-focus'));

  const step = tourSteps[currentTourStep];
  const target = document.getElementById(step.targetId);
  const card = document.getElementById('tourCard');

  if (target) {
    target.classList.add('tour-focus');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top > viewportHeight / 2) {
        card.classList.remove('tour-card-bottom');
        card.classList.add('tour-card-top');
      } else {
        card.classList.remove('tour-card-top');
        card.classList.add('tour-card-bottom');
      }
    }, 150);
  }

  document.getElementById('tourStepBadge').textContent = `Step ${currentTourStep + 1} of ${tourSteps.length}`;
  document.getElementById('tourHeading').textContent = step.title;
  document.getElementById('tourText').textContent = step.text;

  const dotsContainer = document.getElementById('tourDots');
  dotsContainer.innerHTML = tourSteps.map((_, i) => `
    <span class="w-2.5 h-2.5 rounded-full ${i === currentTourStep ? 'bg-sky-400' : 'bg-slate-600'}"></span>
  `).join('');

  document.getElementById('tourPrevBtn').classList.toggle('hidden', currentTourStep === 0);
  document.getElementById('tourNextBtn').innerHTML = currentTourStep === tourSteps.length - 1 
    ? `<span>Let's Lift!</span> <i class="fi fi-sr-rocket text-[10px]"></i>` 
    : `<span>Next</span> <i class="fi fi-sr-arrow-right text-[10px]"></i>`;
}

function nextTourStep() {
  if (currentTourStep < tourSteps.length - 1) {
    currentTourStep++;
    renderTourStep();
  } else {
    endTour();
  }
}

function prevTourStep() {
  if (currentTourStep > 0) {
    currentTourStep--;
    renderTourStep();
  }
}

function endTour() {
  document.querySelectorAll('.tour-focus').forEach(el => el.classList.remove('tour-focus'));
  document.getElementById('tourModal').classList.add('hidden');
  localStorage.setItem('ironforge_tour_completed', 'true');
}

// --- 10. SOCIAL MEDIA SHARING & STORY GENERATOR ---
async function shareTodayProgress() {
  const r = routines.find(x => x.id === selectedDay);
  const total = r.exercises.length;
  let done = 0;
  r.exercises.forEach((_, idx) => {
    if (completedLog[getDateKey(`${r.id}_ex_${idx}`)]) done++;
  });

  const message = `⚡ Crushed today's ${r.title} session on IronForge! Completed ${done}/${total} lifts with ascending pyramids. #IronForge #GymGains`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'IronForge Workout Progress',
        text: message,
        url: window.location.href
      });
    } catch (err) {
      console.log('Share dismissed');
    }
  } else {
    navigator.clipboard.writeText(`${message}\n\n${window.location.href}`);
    alert('📋 Workout summary copied to clipboard!');
  }
}

async function shareTextStatus() {
  const weeklyStats = getHistoricalStats(7);
  const messageBody = 
`⚡ Most people wait for motivation. Discipline gets the reps done.

My Weekly Vitals via IronForge:
🏋️ ${weeklyStats.liftCount} progressive pyramid sets logged
🏃 ${weeklyStats.cardioCount} cardiovascular fat-burn sessions
🔥 ~${weeklyStats.calorieBurn} kcal active expenditure

What did your workout consistency look like this week? Prioritize your health.`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Weekly Discipline & Workout Report',
        text: messageBody,
        url: window.location.href
      });
    } catch (err) {
      console.log('Share dismissed');
    }
  } else {
    navigator.clipboard.writeText(`${messageBody}\n\nTrack your split privately:\n${window.location.href}`);
    alert('📋 Health report copied to clipboard!');
  }
}

async function generateAndShareBadge() {
  const stats = getHistoricalStats(7);
  let totalPlannedEx = 0;
  routines.forEach(r => { totalPlannedEx += r.exercises.length; });

  const completionRate = totalPlannedEx > 0 ? Math.round((stats.liftCount / totalPlannedEx) * 100) : 0;
  const rankTier = completionRate >= 80 ? "TITAN TIER 🔥" : completionRate >= 50 ? "WARRIOR TIER ⚡" : "REBUILDING TIER 🛡️";

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#050811');
  bgGrad.addColorStop(0.4, '#091322');
  bgGrad.addColorStop(1, '#041d1a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  ctx.save();
  ctx.beginPath();
  ctx.arc(200, 300, 350, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(880, 1400, 400, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 6;
  ctx.strokeRect(50, 50, 980, 1820);

  function drawCorner(x, y, dx, dy) {
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(x, y + dy);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx, y);
    ctx.stroke();
  }
  drawCorner(50, 50, 60, 60);
  drawCorner(1030, 50, -60, 60);
  drawCorner(50, 1870, 60, -60);
  drawCorner(1030, 1870, -60, -60);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#38bdf8';
  ctx.font = '800 52px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('IRONFORGE PROTOCOL', 540, 240);

  ctx.fillStyle = '#64748b';
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('HUMAN PERFORMANCE & BODY COMPOSITION', 540, 290);

  ctx.save();
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(320, 360, 440, 70, 35);
  else ctx.rect(320, 360, 440, 70);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#38bdf8';
  ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(rankTier, 540, 406);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 68px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('DISCIPLINE > MOTIVATION', 540, 550);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Consistency data for the current training cycle:', 540, 610);

  function renderMetricCard(y, label, val, sublabel, accentColor) {
    ctx.save();
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(110, y, 860, 210, 28);
    else ctx.rect(110, y, 860, 210);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.fillRect(110, y + 35, 10, 140);

    ctx.textAlign = 'left';
    ctx.fillStyle = accentColor;
    ctx.font = '800 80px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(val, 160, y + 115);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(label, 160, y + 165);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#64748b';
    ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(sublabel, 930, y + 120);

    ctx.restore();
  }

  renderMetricCard(690, 'Ascending Sets Completed', `${stats.liftCount} Lifts`, `${completionRate}% Weekly Plan`, '#38bdf8');
  renderMetricCard(930, 'Fat Oxidation / Cardio Sessions', `${stats.cardioCount} Days`, 'Zone-2 / HIIT', '#10b981');
  renderMetricCard(1170, 'Estimated Training Output', `~${stats.calorieBurn} kcal`, 'Target Deficit Sync', '#f59e0b');

  ctx.save();
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(110, 1440, 860, 180, 24);
  else ctx.rect(110, 1440, 860, 180);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#34d399';
  ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('⚡ ARE YOU HITTING YOUR TARGET SPLIT?', 540, 1515);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Zero ads • Private • Progressive Overload Engine', 540, 1565);
  ctx.restore();

  ctx.fillStyle = '#475569';
  ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Crafted by Rathindra Bera • ironforge.pwa', 540, 1750);

  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], 'ironforge-health-status.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My Weekly Health & Muscle Report',
          text: `⚡ 7 days of discipline on IronForge. Are you prioritizing your health this week? Check your double-muscle split.`
        });
      } catch (e) {
        console.log('Share dismissed');
      }
    } else {
      const link = document.createElement('a');
      link.download = 'ironforge-health-status.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      alert('🔥 High-res health story downloaded! Post it on Instagram / WhatsApp to challenge your friends.');
    }
  }, 'image/png');
}

// --- 11. PWA INSTALL TRIGGER (ANDROID & IOS) ---
let deferredPrompt = null;
const installBanner = document.getElementById('pwaInstallBanner');
const installBtn = document.getElementById('pwaInstallBtn');
const installText = document.getElementById('pwaInstallText');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBanner.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      installBanner.classList.add('hidden');
    }
    deferredPrompt = null;
  } else {
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIos) {
      alert("To install on iOS: Tap the Safari Share button (⎋) at the bottom, then select 'Add to Home Screen' (+).");
    }
  }
});

const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

if (isIos && !isStandalone) {
  installBanner.classList.remove('hidden');
  installText.textContent = "Tap Share ⎋ then 'Add to Home Screen'";
  installBtn.innerHTML = `<span>Guide</span>`;
}

// --- 12. BOOTSTRAP INITIALIZATION ---
document.getElementById('userWeight').value = localStorage.getItem('ironforge_weight') || 75;
document.getElementById('targetWeight').value = localStorage.getItem('ironforge_target_weight') || 70;
document.getElementById('userDeficit').value = localStorage.getItem('ironforge_deficit') || 450;

renderDayTabs();
renderRoutine();
updateProgress();
calcMacros();

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => startDemoTour(false), 500);
});

window.addEventListener('resize', () => {
  if (!document.getElementById('analyticsTab').classList.contains('hidden')) {
    const stats = getHistoricalStats(activeAnalyticsFilter);
    renderActivityChart(stats.dailyPoints);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.error);
  });
}
