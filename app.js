// --- 1. DEFAULT DATASET ---
const DEFAULT_ROUTINES = [
  {
    id: "sun",
    day: "Sunday",
    dayIndex: 0,
    isRest: true,
    title: "Full Rest Day",
    description: "Complete physical and central nervous system recovery.",
    treadmill: { title: "Complete Physical Rest", speed: "-", incline: "-", duration: "0 min", desc: "Hydration and recovery." },
    exercises: []
  },
  {
    id: "mon",
    day: "Monday",
    dayIndex: 1,
    isRest: false,
    title: "Upper Body A + Core",
    description: "Chest, Back, Shoulders, Arms, and Direct Core flexions.",
    treadmill: { title: "Incline Fat-Burn (LISS)", speed: "5.0 km/h", incline: "9%", duration: "20 min", desc: "Post-lift steady state zone-2 fat oxidation." },
    exercises: [
      { name: "Incline DB Press", sets: [{ r: 12, w: "20kg" }, { r: 10, w: "22.5kg" }, { r: 8, w: "25kg" }, { r: 6, w: "27.5kg" }] },
      { name: "Barbell Bent Rows", sets: [{ r: 10, w: "40kg" }, { r: 8, w: "45kg" }, { r: 8, w: "50kg" }, { r: 6, w: "55kg" }] },
      { name: "Seated DB Shoulder Press", sets: [{ r: 12, w: "14kg" }, { r: 10, w: "16kg" }, { r: 8, w: "18kg" }] },
      { name: "EZ-Bar Bicep Curls", sets: [{ r: 12, w: "20kg" }, { r: 10, w: "25kg" }, { r: 8, w: "27.5kg" }] },
      { name: "Rope Triceps Pushdowns", sets: [{ r: 15, w: "20kg" }, { r: 12, w: "25kg" }, { r: 10, w: "30kg" }] },
      { name: "Hanging Leg Raises (Core)", sets: [{ r: 15, w: "Body" }, { r: 15, w: "Body" }, { r: 12, w: "Body" }] }
    ]
  },
  {
    id: "tue",
    day: "Tuesday",
    dayIndex: 2,
    isRest: false,
    title: "Lower Body A (Quads/Hams)",
    description: "Squat mechanics, posterior chain hinges, and calves.",
    treadmill: { title: "HIIT Sprints", speed: "11.0 km/h", incline: "0%", duration: "15 min", desc: "30s sprint / 30s walk intervals × 10 rounds." },
    exercises: [
      { name: "Barbell Back Squats", sets: [{ r: 10, w: "60kg" }, { r: 8, w: "70kg" }, { r: 6, w: "80kg" }, { r: 6, w: "90kg" }] },
      { name: "Romanian Deadlifts (RDL)", sets: [{ r: 10, w: "50kg" }, { r: 8, w: "60kg" }, { r: 8, w: "70kg" }] },
      { name: "Bulgarian Split Squats", sets: [{ r: 10, w: "12kg" }, { r: 10, w: "14kg" }, { r: 10, w: "16kg" }] },
      { name: "Calf Raises", sets: [{ r: 15, w: "40kg" }, { r: 15, w: "50kg" }, { r: 15, w: "60kg" }] }
    ]
  },
  {
    id: "wed",
    day: "Wednesday",
    dayIndex: 3,
    isRest: true,
    title: "Active Rest Day",
    description: "Active recovery, gentle mobility, and protein synthesis.",
    treadmill: { title: "Mobility & Stretching", speed: "-", incline: "-", duration: "0 min", desc: "Active recovery and flexibility work." },
    exercises: []
  },
  {
    id: "thu",
    day: "Thursday",
    dayIndex: 4,
    isRest: false,
    title: "Upper Body B + Core",
    description: "Horizontal pressing, cable rows, lateral delts, and ab wheel rollouts.",
    treadmill: { title: "Incline Fat-Burn (LISS)", speed: "5.2 km/h", incline: "10%", duration: "20 min", desc: "Continuous incline fat-burning walk." },
    exercises: [
      { name: "Flat Barbell Bench Press", sets: [{ r: 10, w: "50kg" }, { r: 8, w: "55kg" }, { r: 6, w: "60kg" }, { r: 6, w: "65kg" }] },
      { name: "Seated Cable Rows", sets: [{ r: 12, w: "40kg" }, { r: 10, w: "45kg" }, { r: 8, w: "50kg" }] },
      { name: "DB Lateral Raises", sets: [{ r: 15, w: "7.5kg" }, { r: 12, w: "10kg" }, { r: 10, w: "10kg" }] },
      { name: "Incline DB Hammer Curls", sets: [{ r: 12, w: "12kg" }, { r: 10, w: "14kg" }, { r: 8, w: "16kg" }] },
      { name: "Overhead Tricep Extension", sets: [{ r: 12, w: "18kg" }, { r: 10, w: "22kg" }, { r: 8, w: "24kg" }] },
      { name: "Ab Wheel Rollouts (Core)", sets: [{ r: 12, w: "Body" }, { r: 10, w: "Body" }, { r: 10, w: "Body" }] }
    ]
  },
  {
    id: "fri",
    day: "Friday",
    dayIndex: 5,
    isRest: false,
    title: "Lower Body B (Posterior Focus)",
    description: "Heavy deadlifts, front squats, hamstrings, and isolated quads.",
    treadmill: { title: "Incline Sprints HIIT", speed: "8.5 km/h", incline: "6%", duration: "15 min", desc: "30s run at 6% incline / 45s recovery walk × 8 rounds." },
    exercises: [
      { name: "Deadlifts (Conventional)", sets: [{ r: 8, w: "70kg" }, { r: 6, w: "85kg" }, { r: 5, w: "100kg" }] },
      { name: "Hack Squats / Front Squats", sets: [{ r: 10, w: "40kg" }, { r: 8, w: "50kg" }, { r: 8, w: "60kg" }] },
      { name: "Lying Hamstring Curls", sets: [{ r: 12, w: "30kg" }, { r: 10, w: "35kg" }, { r: 10, w: "40kg" }] },
      { name: "Leg Extensions", sets: [{ r: 15, w: "35kg" }, { r: 12, w: "45kg" }, { r: 10, w: "50kg" }] }
    ]
  },
  {
    id: "sat",
    day: "Saturday",
    dayIndex: 6,
    isRest: false,
    title: "Full Body Hypertrophy + Core",
    description: "Upper/lower high-density hypertrophy + dragon flags.",
    treadmill: { title: "Extended Incline Walk", speed: "5.0 km/h", incline: "11%", duration: "25 min", desc: "Long duration metabolic conditioning." },
    exercises: [
      { name: "DB Flat Press", sets: [{ r: 10, w: "22kg" }, { r: 8, w: "24kg" }, { r: 8, w: "26kg" }] },
      { name: "Chest-Supported DB Rows", sets: [{ r: 10, w: "20kg" }, { r: 10, w: "22kg" }, { r: 8, w: "24kg" }] },
      { name: "Leg Press", sets: [{ r: 12, w: "100kg" }, { r: 10, w: "120kg" }, { r: 8, w: "140kg" }] },
      { name: "Cable Lateral Raises", sets: [{ r: 15, w: "5kg" }, { r: 12, w: "7.5kg" }, { r: 10, w: "7.5kg" }] },
      { name: "Dragon Flags (Core)", sets: [{ r: 10, w: "Body" }, { r: 10, w: "Body" }, { r: 8, w: "Body" }] }
    ]
  }
];

// --- 2. APP STATE ---
let routines = JSON.parse(localStorage.getItem('ironforge_routines')) || DEFAULT_ROUTINES;
let completedLog = JSON.parse(localStorage.getItem('ironforge_completed')) || {};

const todayIndex = new Date().getDay();
const todayRoutine = routines.find(r => r.dayIndex === todayIndex) || routines[1];
let selectedDay = todayRoutine.id;

let editingExerciseIndex = null;
let modalIsRest = false;

// Date Header
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
    document.getElementById('nav-tracker').className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20";
    document.getElementById('nav-analytics').className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-slate-800 text-slate-400 hover:bg-slate-700";
  } else {
    document.getElementById('trackerTab').classList.add('hidden');
    document.getElementById('analyticsTab').classList.remove('hidden');
    document.getElementById('nav-analytics').className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20";
    document.getElementById('nav-tracker').className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-slate-800 text-slate-400 hover:bg-slate-700";
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
        ${r.isRest ? '<span class="text-[9px] opacity-70">🛋️</span>' : ''}
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
          <span class="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full font-bold">Rest Day</span>
          <button onclick="openDayConfigModal()" class="text-xs bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 font-semibold">⚙️ Customize Day</button>
        </div>
        <p class="text-base font-bold text-slate-200 mt-2">${r.title}</p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">${r.description || 'No resistance workouts scheduled.'}</p>
        <div class="pt-3">
          <button onclick="openModalForNew()" class="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-sky-500/20">+ Add Workout To This Day</button>
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
          <button onclick="openDayConfigModal()" class="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg font-semibold">⚙️ Config</button>
          <button onclick="openModalForNew()" class="text-[11px] bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2.5 py-1.5 rounded-lg font-semibold">+ Add Lift</button>
        </div>
      </div>

      <div class="space-y-3 pt-1">
        ${r.exercises.length === 0 ? `
          <p class="text-xs text-slate-500 text-center py-4">No exercises added yet. Tap "+ Add Lift" above.</p>
        ` : r.exercises.map((ex, exIdx) => {
          const key = `${r.id}_ex_${exIdx}`;
          const isDone = !!completedLog[key];
          return `
            <div class="p-3.5 rounded-xl border transition-all ${
              isDone 
                ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80' 
                : 'bg-slate-800/40 border-slate-700/50'
            }">
              <div class="flex justify-between items-center mb-2.5">
                <div class="flex items-center gap-2.5">
                  <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleDone('${key}')" 
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

  const tmKey = `${r.id}_treadmill`;
  const isTmDone = !!completedLog[tmKey];
  const hasCardio = r.treadmill.duration && r.treadmill.duration !== "0 min" && r.treadmill.duration !== "0";

  tmContainer.innerHTML = `
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2.5">
        ${hasCardio ? `
          <input type="checkbox" ${isTmDone ? 'checked' : ''} onchange="toggleDone('${tmKey}')" 
                 class="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-0 cursor-pointer" />
        ` : ''}
        <h3 class="font-bold text-sky-400 text-sm">🏃 Treadmill / Cardio Target</h3>
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
  document.getElementById('dayConfigTitle').textContent = `Customize ${r.day}`;
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
    btnRest.className = "flex-1 py-2 rounded-lg font-bold border border-amber-500/50 bg-amber-500/20 text-amber-300";
    btnWorkout.className = "flex-1 py-2 rounded-lg font-bold border border-slate-800 bg-slate-850 text-slate-500";
  } else {
    btnWorkout.className = "flex-1 py-2 rounded-lg font-bold border border-emerald-500/50 bg-emerald-500/20 text-emerald-300";
    btnRest.className = "flex-1 py-2 rounded-lg font-bold border border-slate-800 bg-slate-850 text-slate-500";
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
  document.getElementById('modalTitle').textContent = "Add New Exercise";
  document.getElementById('modalExName').value = "";
  renderModalSets([{ r: 12, w: "20kg" }, { r: 10, w: "22.5kg" }, { r: 8, w: "25kg" }]);
  document.getElementById('editModal').classList.remove('hidden');
}

function openModalForEdit(idx) {
  editingExerciseIndex = idx;
  const r = routines.find(x => x.id === selectedDay);
  const ex = r.exercises[idx];
  document.getElementById('modalTitle').textContent = "Edit Exercise";
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

// --- 7. CHECK-OFFS & PROGRESS ---
function toggleDone(key) {
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
    if (completedLog[`${r.id}_ex_${idx}`]) done++;
  });
  if (hasCardio && completedLog[`${r.id}_treadmill`]) done++;

  const pct = Math.round((done / total) * 100);
  document.getElementById('progressBar').style.width = `${pct}%`;
  document.getElementById('progressText').textContent = `${pct}% Complete (${done}/${total})`;
}

// --- 8. ANALYTICS ---
function renderAnalytics() {
  let totalExCompleted = 0;
  let totalCardioCompleted = 0;

  routines.forEach(r => {
    r.exercises.forEach((_, idx) => {
      if (completedLog[`${r.id}_ex_${idx}`]) totalExCompleted++;
    });
    if (completedLog[`${r.id}_treadmill`]) totalCardioCompleted++;
  });

  document.getElementById('statCompletedEx').textContent = totalExCompleted;
  document.getElementById('statCompletedCardio').textContent = `${totalCardioCompleted} Days`;

  const weekContainer = document.getElementById('weekCheckmarks');
  const ordered = [...routines.slice(1), routines[0]];
  weekContainer.innerHTML = ordered.map(r => {
    let isDone = false;
    if (r.isRest || r.exercises.length === 0) {
      isDone = true;
    } else {
      isDone = r.exercises.every((_, idx) => completedLog[`${r.id}_ex_${idx}`]);
    }
    return `
      <div class="p-2 rounded-lg border ${isDone ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-500'}">
        <span class="block font-bold">${r.day.slice(0, 1)}</span>
        <span>${r.isRest ? '🛋️' : (isDone ? '✓' : '•')}</span>
      </div>
    `;
  }).join('');
}

function calcMacros() {
  const w = parseFloat(document.getElementById('userWeight').value) || 75;
  const targetW = parseFloat(document.getElementById('targetWeight').value) || 70;
  const deficit = parseFloat(document.getElementById('userDeficit').value) || 450;

  // Persist values in user's isolated local storage
  localStorage.setItem('ironforge_weight', w);
  localStorage.setItem('ironforge_target_weight', targetW);
  localStorage.setItem('ironforge_deficit', deficit);

  // Maintenance baseline ≈ (bodyweight in kg * 33) kcal
  const maintenance = Math.round(w * 33);
  const targetCalories = Math.max(1200, maintenance - deficit);
  const protein = Math.round(w * 2.0); // 2.0g per kg

  document.getElementById('calVal').textContent = `${targetCalories} kcal`;
  document.getElementById('protVal').textContent = `${protein}g`;
  document.getElementById('deficitBadge').textContent = `-${deficit} kcal`;
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

// --- 9. INTERACTIVE DEMO TOUR (FIXED & SCROLL-SAFE) ---
let currentTourStep = 0;
const tourSteps = [
  {
    targetId: 'tour-step-1',
    title: '🗓️ Auto-Detected Today Split',
    text: 'The app automatically selects today\'s routine. You can tap any day to preview workouts or configure custom rest days.'
  },
  {
    targetId: 'tour-step-2',
    title: '🏋️ Double-Muscle Pyramids',
    text: 'Each exercise lists ascending weight targets. Tap the checkbox to check off completed sets with live progress updates.'
  },
  {
    targetId: 'tour-step-3',
    title: '🏃 Treadmill & Fat Loss Targets',
    text: 'Specific incline and HIIT treadmill protocols are scheduled after lifts to accelerate fat loss while preserving muscle.'
  },
  {
    targetId: 'tour-step-4',
    title: '📊 Analytics & Macro Planner',
    text: 'Switch tabs anytime to calculate your target calorie deficit, protein intake, and view your 7-day consistency chart!'
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

    // Dynamic placement: Check if target is in top or bottom half of screen
    setTimeout(() => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If target is in the bottom half, place tour card at top so it doesn't overlap
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
  document.getElementById('tourNextBtn').textContent = currentTourStep === tourSteps.length - 1 ? "Let's Lift! 🚀" : "Next →";
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

// --- 10. PWA INSTALL PROMPT TRIGGER (ANDROID & IOS) ---
let deferredPrompt = null;
const installBanner = document.getElementById('pwaInstallBanner');
const installBtn = document.getElementById('pwaInstallBtn');
const installText = document.getElementById('pwaInstallText');

// Android / Chrome Trigger
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
    // iOS detection
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIos) {
      alert("To install on iOS: Tap the Safari Share button (⎋) at the bottom, then select 'Add to Home Screen' (+).");
    }
  }
});

// Show manual guide on iOS if opened in Safari browser (not standalone mode)
const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

if (isIos && !isStandalone) {
  installBanner.classList.remove('hidden');
  installText.textContent = "Tap Share ⎋ then 'Add to Home Screen'";
  installBtn.textContent = "Guide";
}

// --- 11. BOOTSTRAP ---
// Inside Bootstrap / Initialization section
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.error);
  });
}

// --- 12. SOCIAL MEDIA SHARING & ACHIEVEMENTS ---

// 1. Share Today's Immediate Workout Progress
async function shareTodayProgress() {
  const r = routines.find(x => x.id === selectedDay);
  const total = r.exercises.length;
  let done = 0;
  r.exercises.forEach((_, idx) => {
    if (completedLog[`${r.id}_ex_${idx}`]) done++;
  });

  const shareData = {
    title: 'IronForge Workout Progress',
    text: `⚡ Crushed today's ${r.title} session on IronForge! Completed ${done}/${total} lifts with ascending pyramids. #IronForge #GymGains #DoubleMuscleSplit`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Share dismissed');
    }
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(`${shareData.text} \n${shareData.url}`);
    alert('📋 Workout summary copied to clipboard! Paste it to your social media or chat.');
  }
}

// 2. Share Weekly Achievement as Text Status
async function shareTextStatus() {
  let totalEx = 0;
  let totalCardio = 0;
  routines.forEach(r => {
    r.exercises.forEach((_, idx) => {
      if (completedLog[`${r.id}_ex_${idx}`]) totalEx++;
    });
    if (completedLog[`${r.id}_treadmill`]) totalCardio++;
  });

  const text = `🔥 Weekly Fitness Report on IronForge:\n💪 ${totalEx} Exercises Logged\n🏃 ${totalCardio} Cardio/Treadmill Sessions Finished\nConsistency is key! 🚀 #IronForge #FitnessGoals #WorkoutTracker`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My Weekly IronForge Gains',
        text: text,
        url: window.location.href
      });
    } catch (err) {
      console.log('Share dismissed');
    }
  } else {
    navigator.clipboard.writeText(text);
    alert('📋 Achievement text copied to clipboard!');
  }
}

// 3. Generate a Visual Story/Post Card using Canvas & Share Image
async function generateAndShareBadge() {
  let totalEx = 0;
  let totalCardio = 0;
  routines.forEach(r => {
    r.exercises.forEach((_, idx) => {
      if (completedLog[`${r.id}_ex_${idx}`]) totalEx++;
    });
    if (completedLog[`${r.id}_treadmill`]) totalCardio++;
  });

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920; // 9:16 Story aspect ratio
  const ctx = canvas.getContext('2d');

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
  grad.addColorStop(0, '#070b12');
  grad.addColorStop(0.5, '#0d1527');
  grad.addColorStop(1, '#051b1a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Decorative Border & Glow
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 12;
  ctx.strokeRect(60, 60, 960, 1800);

  // App Title
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IRONFORGE', 540, 300);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '36px sans-serif';
  ctx.fillText('WORKOUT & VITALS TRACKER', 540, 370);

  // Main Achievement Banner
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 76px sans-serif';
  ctx.fillText('WEEKLY GAINS UNLOCKED', 540, 650);

  // Stat Boxes
  ctx.fillStyle = '#161f2e';
  ctx.roundRect(140, 800, 800, 240, 30);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 90px sans-serif';
  ctx.fillText(`${totalEx}`, 540, 920);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '36px sans-serif';
  ctx.fillText('Exercises Completed', 540, 990);

  ctx.fillStyle = '#161f2e';
  ctx.roundRect(140, 1100, 800, 240, 30);
  ctx.fill();
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 90px sans-serif';
  ctx.fillText(`${totalCardio} Days`, 540, 1220);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '36px sans-serif';
  ctx.fillText('Cardio & Treadmill Sessions', 540, 1290);

  // Footer Branding
  ctx.fillStyle = '#64748b';
  ctx.font = '34px sans-serif';
  ctx.fillText('Forged for gains by Rathindra Bera', 540, 1650);

  // Convert to Blob and trigger Native Share
  canvas.toBlob(async (blob) => {
    const file = new File([blob], 'ironforge-achievement.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My IronForge Achievement',
          text: 'Crushing goals with IronForge! 💪'
        });
      } catch (err) {
        console.log('Image share cancelled');
      }
    } else {
      // Direct download fallback
      const link = document.createElement('a');
      link.download = 'ironforge-achievement.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      alert('🖼️ Achievement image downloaded! You can now post it to your Instagram / WhatsApp Story.');
    }
  }, 'image/png');
}

// Update the live badges whenever analytics render
const originalRenderAnalytics = renderAnalytics;
renderAnalytics = function() {
  originalRenderAnalytics();
  let totalEx = 0;
  let totalCardio = 0;
  routines.forEach(r => {
    r.exercises.forEach((_, idx) => {
      if (completedLog[`${r.id}_ex_${idx}`]) totalEx++;
    });
    if (completedLog[`${r.id}_treadmill`]) totalCardio++;
  });
  if (document.getElementById('badgeExDone')) {
    document.getElementById('badgeExDone').textContent = totalEx;
    document.getElementById('badgeCardioDone').textContent = totalCardio;
  }
};
  
