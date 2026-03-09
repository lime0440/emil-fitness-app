import React, { useEffect, useState, useMemo } from "react";

export default function EmilFitnessMobileDashboard(){

const START_WEIGHT = 119;
const GOAL_WEIGHT = 90;
const STEP_GOAL = 4000;
const KCAL_GOAL = 1800;
const SLEEP_GOAL = 7;
const WORKOUT_GOAL = 1;

const storageKey = "emilFitnessPH";

// ---------------- MEAL OPTIONS ----------------

const mealOptions = {
breakfast:[
{name:"2 pandesal + 2 eggs",kcal:380},
{name:"Tortang talong + 1/2 cup rice",kcal:420},
{name:"Oatmeal (40g oats) + 1/2 banana",kcal:300},
{name:"Tuna + rice + egg",kcal:420},
{name:"Banana oatmeal",kcal:320},
{name:"Egg + tomato + rice",kcal:350},
{name:"Champorado + milk",kcal:420},
{name:"Pandesal + tuna",kcal:360},
{name:"Oatmeal + peanut butter",kcal:380},
{name:"Egg sandwich",kcal:330},
{name:"Boiled eggs + pandesal",kcal:340},
{name:"Greek yogurt + banana",kcal:280}
],

snack:[
{name:"1 banana",kcal:120},
{name:"Boiled camote",kcal:150},
{name:"Boiled corn",kcal:130},
{name:"Peanut butter sandwich",kcal:210},
{name:"Milk",kcal:120},
{name:"Greek yogurt",kcal:150},
{name:"Apple",kcal:95},
{name:"Protein shake",kcal:160},
{name:"Crackers",kcal:140},
{name:"Fruit bowl",kcal:120},
{name:"Boiled eggs",kcal:140},
{name:"Cottage cheese",kcal:180}
],

lunch:[
{name:"Chicken tinola + 3/4 cup rice",kcal:520},
{name:"Bangus + ensaladang talong + rice",kcal:480},
{name:"Adobong manok + rice",kcal:540},
{name:"Ginisang monggo + rice",kcal:480},
{name:"Pancit bihon",kcal:520},
{name:"Grilled chicken + vegetables",kcal:450},
{name:"Fish + rice",kcal:430},
{name:"Chicken adobo bowl",kcal:520},
{name:"Vegetable stir fry + fish",kcal:420},
{name:"Chicken soup + rice",kcal:420},
{name:"Bangus + vegetables",kcal:400},
{name:"Chicken + cabbage stir fry",kcal:450}
],

dinner:[
{name:"Sinigang na isda",kcal:430},
{name:"Grilled chicken + vegetables",kcal:420},
{name:"Vegetable stir fry",kcal:360},
{name:"Fish soup",kcal:400},
{name:"Chicken soup",kcal:390},
{name:"Bangus + vegetables",kcal:400},
{name:"Ginisang gulay",kcal:350},
{name:"Grilled fish",kcal:420},
{name:"Chicken breast + vegetables",kcal:420},
{name:"Vegetable soup",kcal:320},
{name:"Lentil soup",kcal:400},
{name:"Fish + cabbage",kcal:410}
]
};

// ---------------- STATE ----------------

const [weight,setWeight] = useState(START_WEIGHT);
const [steps,setSteps] = useState("");
const [todaySteps,setTodaySteps] = useState(0);
const [stepHistory,setStepHistory] = useState([]);
const [history,setHistory] = useState([]);

const [foodInput,setFoodInput] = useState("");
const [calorieInput,setCalorieInput] = useState("");
const [foodLog,setFoodLog] = useState([]);

const [selectedMealType,setSelectedMealType] = useState("breakfast");

const [goalView,setGoalView] = useState("daily");

// optional tracking
const [sleepHours,setSleepHours] = useState("");
const [workoutDone,setWorkoutDone] = useState(false);

// ---------------- STORAGE ----------------

useEffect(()=>{
const saved = localStorage.getItem(storageKey);
if(saved){
const d = JSON.parse(saved);
setWeight(d.weight || START_WEIGHT);
setTodaySteps(d.todaySteps || 0);
setStepHistory(d.stepHistory || []);
setHistory(d.history || []);
setFoodLog(d.foodLog || []);
setSleepHours(d.sleepHours || "");
setWorkoutDone(d.workoutDone || false);
}
},[]);

useEffect(()=>{
localStorage.setItem(storageKey,JSON.stringify({
weight,
todaySteps,
stepHistory,
history,
foodLog,
sleepHours,
workoutDone
}))
},[weight,todaySteps,stepHistory,history,foodLog,sleepHours,workoutDone]);

// ---------------- CALCULATIONS ----------------

const todayCalories = foodLog
.filter(f=>f.date===new Date().toLocaleDateString())
.reduce((sum,f)=>sum+f.calories,0);

const stepProgress = Math.min(100,(todaySteps/STEP_GOAL)*100);

const progress = Math.max(0,Math.min(100,((START_WEIGHT-weight)/(START_WEIGHT-GOAL_WEIGHT))*100));

const dailyGoalsMet = {
steps: todaySteps >= STEP_GOAL,
kcal: todayCalories <= KCAL_GOAL,
sleep: Number(sleepHours) >= SLEEP_GOAL,
workout: workoutDone === true
};

const dailyScore = Object.values(dailyGoalsMet).filter(Boolean).length;

// simple achievement logic

const achievements = {
daily: dailyScore === 4,
weekly: stepHistory.slice(0,7).filter(s=>s.steps>=STEP_GOAL).length >=5,
monthly: history.length >=4,
quarterly: history.length >=12
};

// ---------------- ACTIONS ----------------

const addWeighIn = ()=>{
const today = new Date().toLocaleDateString();
setHistory([{date:today,weight},...history]);
};

const saveSteps = ()=>{
const today = new Date().toLocaleDateString();
setTodaySteps(Number(steps));
setStepHistory([{date:today,steps:Number(steps)},...stepHistory]);
setSteps("");
};

const addFood = ()=>{
if(!foodInput || !calorieInput) return;
const today = new Date().toLocaleDateString();
setFoodLog([{food:foodInput,calories:Number(calorieInput),date:today},...foodLog]);
setFoodInput("");
setCalorieInput("");
};

// ---------------- UI STYLE ----------------

const card={
background:"#171717",
padding:"16px",
borderRadius:"14px",
marginBottom:"18px",
border:"1px solid #262626"
};

// ---------------- UI ----------------

return(
<div style={{fontFamily:"system-ui",maxWidth:"460px",margin:"auto",padding:"20px",background:"#0a0a0a",minHeight:"100vh",color:"white"}}>

<h1 style={{textAlign:"center"}}>Emil Fitness App</h1>
<p style={{textAlign:"center",color:"#aaa"}}>Filipino Fat Loss Tracker</p>

{/* ---------------- GOALS ---------------- */}

<div style={card}>
<h2>Goals</h2>

<select value={goalView} onChange={e=>setGoalView(e.target.value)} style={{width:"100%",padding:"10px",marginBottom:"10px"}}>
<option value="daily">Daily Goal</option>
<option value="weekly">Weekly Goal</option>
<option value="monthly">Monthly Goal</option>
<option value="quarterly">Quarterly Goal</option>
</select>

{goalView === "daily" && (
<div style={{fontSize:"14px"}}>
<div>Steps Required: {STEP_GOAL}</div>
<div>Calories Max: {KCAL_GOAL}</div>
<div>Workout Required: {WORKOUT_GOAL}</div>
<div>Sleep Required: {SLEEP_GOAL} hrs</div>

<hr style={{margin:"10px 0",borderColor:"#333"}}/>

<div>Steps Met: {dailyGoalsMet.steps ? "✅" : "❌"}</div>
<div>Calories Met: {dailyGoalsMet.kcal ? "✅" : "❌"}</div>
<div>Sleep Met: {dailyGoalsMet.sleep ? "✅" : "❌"}</div>
<div>Workout Met: {dailyGoalsMet.workout ? "✅" : "❌"}</div>

<div style={{marginTop:"10px"}}>Daily Score: {dailyScore}/4</div>
</div>
)}

{goalView === "weekly" && (
<div>Goal: Hit step goal at least 5 days this week.</div>
)}

{goalView === "monthly" && (
<div>Goal: Track weight every week.</div>
)}

{goalView === "quarterly" && (
<div>Goal: Maintain progress for 3 months.</div>
)}

</div>

{/* ---------------- ACHIEVEMENTS ---------------- */}

<div style={card}>
<h2>Achievements</h2>

<div>Daily: {achievements.daily ? "🏆 Achieved" : "—"}</div>
<div>Weekly: {achievements.weekly ? "🏆 Achieved" : "—"}</div>
<div>Monthly: {achievements.monthly ? "🏆 Achieved" : "—"}</div>
<div>Quarterly: {achievements.quarterly ? "🏆 Achieved" : "—"}</div>

</div>

{/* ---------------- WEIGHT ---------------- */}

<div style={card}>
<h2>Weight</h2>
<input type="number" value={weight} onChange={e=>setWeight(Number(e.target.value))} style={{width:"100%",padding:"10px"}} />
<div style={{background:"#333",height:"10px",marginTop:"10px"}}>
<div style={{background:"#22c55e",height:"10px",width:`${progress}%`}}></div>
</div>
<button onClick={addWeighIn} style={{marginTop:"10px",width:"100%",padding:"10px",background:"#22c55e",border:"none",color:"white"}}>Save Weigh-in</button>
</div>

{/* ---------------- STEPS ---------------- */}

<div style={card}>
<h2>Steps</h2>
<input type="number" value={steps} onChange={e=>setSteps(e.target.value)} placeholder="Enter steps" style={{width:"100%",padding:"10px"}} />
<button onClick={saveSteps} style={{marginTop:"10px",width:"100%",padding:"10px",background:"#22c55e",border:"none",color:"white"}}>Save Steps</button>
<p style={{fontSize:"12px",color:"#aaa"}}>Today: {todaySteps} / {STEP_GOAL}</p>
<div style={{background:"#333",height:"10px",marginTop:"6px"}}>
<div style={{background:"#22c55e",height:"10px",width:`${stepProgress}%`}}></div>
</div>
</div>

{/* ---------------- SLEEP / WORKOUT ---------------- */}

<div style={card}>
<h2>Sleep</h2>
<input
 type="number"
 placeholder="Sleep hours"
 value={sleepHours}
 onChange={e=>setSleepHours(e.target.value)}
 style={{width:"100%",padding:"10px",marginBottom:"8px"}}
/>
<button
 onClick={()=>alert("Sleep saved for today")}
 style={{width:"100%",padding:"10px",background:"#22c55e",border:"none",color:"white",marginBottom:"10px"}}
>
Submit Sleep
</button>
</div>

<div style={card}>
<h2>Workout Checklist</h2>
<p style={{fontSize:"12px",color:"#aaa"}}>Complete at least 1 workout.</p>

<label style={{display:"block",marginBottom:"6px"}}>
<input type="checkbox" /> Bench Press (3x10)
</label>

<label style={{display:"block",marginBottom:"6px"}}>
<input type="checkbox" /> Leg Press (3x12)
</label>

<label style={{display:"block",marginBottom:"6px"}}>
<input type="checkbox" /> Seated Row (3x10)
</label>

<label style={{display:"block",marginBottom:"6px"}}>
<input type="checkbox" /> Dumbbell Shoulder Press (3x10)
</label>

<label style={{display:"block",marginBottom:"6px"}}>
<input type="checkbox" /> Plank (3 sets)
</label>

<label style={{display:"block",marginBottom:"10px"}}>
<input type="checkbox" /> 20 Minute Walk
</label>

<button
 onClick={()=>setWorkoutDone(true)}
 style={{width:"100%",padding:"10px",background:"#22c55e",border:"none",color:"white"}}
>
Submit Workout
</button>

{workoutDone && (
<p style={{marginTop:"10px",color:"#22c55e"}}>Workout submitted today ✅</p>
)}
</div>

{/* ---------------- CALORIES ---------------- */}

<div style={card}>
<h2>Calorie Intake</h2>
<input placeholder="Food" value={foodInput} onChange={e=>setFoodInput(e.target.value)} style={{width:"100%",padding:"10px",marginBottom:"6px"}} />
<input placeholder="Calories" type="number" value={calorieInput} onChange={e=>setCalorieInput(e.target.value)} style={{width:"100%",padding:"10px"}} />
<button onClick={addFood} style={{marginTop:"10px",width:"100%",padding:"10px",background:"#22c55e",border:"none",color:"white"}}>Add Food</button>
<p style={{marginTop:"10px",fontSize:"13px",color:"#aaa"}}>Today's calories: {todayCalories}</p>
</div>

{/* ---------------- MEAL OPTIONS ---------------- */}

<div style={card}>
<h2>Meal Options</h2>

<select value={selectedMealType} onChange={e=>setSelectedMealType(e.target.value)} style={{width:"100%",padding:"10px",marginBottom:"10px"}}>
<option value="breakfast">Breakfast</option>
<option value="lunch">Lunch</option>
<option value="dinner">Dinner</option>
<option value="snack">Snack</option>
</select>

{mealOptions[selectedMealType].map((meal,i)=>(
<div key={i} style={{padding:"6px 0",fontSize:"14px",borderBottom:"1px solid #333",display:"flex",justifyContent:"space-between"}}>
<span>{meal.name}</span>
<span style={{color:"#aaa"}}>{meal.kcal} kcal</span>
</div>
))}

</div>

<div style={card}>
<h2>Tirzepatide</h2>
<p>Injection Day: <b>Saturday</b></p>
</div>

</div>
);
}
