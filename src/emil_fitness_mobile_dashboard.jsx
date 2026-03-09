import React, { useEffect, useMemo, useState } from "react";

export default function EmilFitnessMobileDashboard() {

const START_WEIGHT = 119;
const GOAL_WEIGHT = 90;
const STEP_GOAL = 4000;
const storageKey = "emilFitnessPH";

const [weight,setWeight]=useState(START_WEIGHT);
const [steps,setSteps]=useState("");
const [todaySteps,setTodaySteps]=useState(0);
const [stepHistory,setStepHistory]=useState([]);
const [history,setHistory]=useState([]);

// calorie tracker
const [foodInput,setFoodInput]=useState("");
const [calorieInput,setCalorieInput]=useState("");
const [foodLog,setFoodLog]=useState([]);

useEffect(()=>{
const saved=localStorage.getItem(storageKey);
if(saved){
const d=JSON.parse(saved);
setWeight(d.weight||START_WEIGHT);
setTodaySteps(d.todaySteps||0);
setStepHistory(d.stepHistory||[]);
setHistory(d.history||[]);
setFoodLog(d.foodLog||[]);
}
},[]);

useEffect(()=>{
localStorage.setItem(storageKey,JSON.stringify({weight,todaySteps,stepHistory,history,foodLog}));
},[weight,todaySteps,stepHistory,history,foodLog]);

const addWeighIn=()=>{
const today=new Date().toLocaleDateString();
setHistory([{date:today,weight},...history]);
};

const saveSteps=()=>{
const today=new Date().toLocaleDateString();
setTodaySteps(Number(steps));
setStepHistory([{date:today,steps:Number(steps)},...stepHistory]);
setSteps("");
};

const stepProgress=Math.min(100,(todaySteps/STEP_GOAL)*100);

const progress=Math.max(0,Math.min(100,((START_WEIGHT-weight)/(START_WEIGHT-GOAL_WEIGHT))*100));

// calorie logging
const addFood=()=>{
if(!foodInput||!calorieInput)return;
const today=new Date().toLocaleDateString();
setFoodLog([{food:foodInput,calories:Number(calorieInput),date:today},...foodLog]);
setFoodInput("");
setCalorieInput("");
};

const todayCalories=foodLog
.filter(f=>f.date===new Date().toLocaleDateString())
.reduce((sum,f)=>sum+f.calories,0);

const card={background:"#171717",padding:"16px",borderRadius:"14px",marginBottom:"18px",border:"1px solid #262626"};

return(
<div style={{fontFamily:"system-ui",maxWidth:"460px",margin:"auto",padding:"20px",background:"#0a0a0a",minHeight:"100vh",color:"white"}}>

<h1 style={{textAlign:"center"}}>Emil Fitness App</h1>
<p style={{textAlign:"center",color:"#aaa"}}>Fitness + Filipino Meal Tracker</p>

<div style={card}>
<h2>Weight</h2>
<input type="number" value={weight} onChange={e=>setWeight(Number(e.target.value))} style={{width:"100%",padding:"10px"}} />
<div style={{background:"#333",height:"10px",marginTop:"10px"}}>
<div style={{background:"#22c55e",height:"10px",width:`${progress}%`}}></div>
</div>
<button onClick={addWeighIn} style={{marginTop:"10px",width:"100%",padding:"10px",background:"#22c55e",border:"none",color:"white"}}>Save Weigh-in</button>
</div>

<div style={card}>
<h2>Steps</h2>
<input type="number" value={steps} onChange={e=>setSteps(e.target.value)} placeholder="Enter steps" style={{width:"100%",padding:"10px"}} />
<button onClick={saveSteps} style={{marginTop:"10px",width:"100%",padding:"10px",background:"#22c55e",border:"none",color:"white"}}>Save Steps</button>
<p style={{fontSize:"12px",color:"#aaa"}}>Today: {todaySteps} / {STEP_GOAL}</p>
<div style={{background:"#333",height:"10px",marginTop:"6px"}}>
<div style={{background:"#22c55e",height:"10px",width:`${stepProgress}%`}}></div>
</div>

{stepHistory.slice(0,5).map((s,i)=>(
<div key={i} style={{fontSize:"12px"}}>{s.date} - {s.steps} steps</div>
))}
</div>

<div style={card}>
<h2>Calorie Intake</h2>
<input
placeholder="Food (ex: Chicken Adobo)"
value={foodInput}
onChange={e=>setFoodInput(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"6px"}}
/>
<input
placeholder="Calories"
type="number"
value={calorieInput}
onChange={e=>setCalorieInput(e.target.value)}
style={{width:"100%",padding:"10px"}}
/>

<button
onClick={addFood}
style={{marginTop:"10px",width:"100%",padding:"10px",background:"#22c55e",border:"none",color:"white"}}
>
Add Food
</button>

<p style={{marginTop:"10px",fontSize:"13px",color:"#aaa"}}>
Today's calories: {todayCalories}
</p>

{foodLog.slice(0,8).map((f,i)=>(
<div key={i} style={{fontSize:"12px"}}>
{f.date} - {f.food} ({f.calories} kcal)
</div>
))}
</div>

<div style={card}>
<h2>Tirzepatide</h2>
<p>Injection Day: <b>Saturday</b></p>
</div>

<div style={card}>
<h2>Weight History</h2>
{history.map((h,i)=>(<div key={i}>{h.date} - {h.weight} kg</div>))}
</div>

</div>
);
}
