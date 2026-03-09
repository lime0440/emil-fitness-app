import React, { useEffect, useState } from "react";

// Emil Fitness App — Dark MVP Version

export default function EmilFitnessMobileDashboard() {

  const START_WEIGHT = 119;
  const GOAL_WEIGHT = 90;

  const milestones = [119,110,105,99,95,90];

  const mealPlans = [
    {
      title: "High Protein Chicken Bowl",
      calories: "~450 kcal",
      recipe: "150g grilled chicken, 1/2 cup rice, steamed broccoli, olive oil drizzle"
    },
    {
      title: "Egg & Avocado Breakfast",
      calories: "~400 kcal",
      recipe: "3 eggs scrambled, 1/2 avocado, whole wheat toast"
    },
    {
      title: "Salmon & Sweet Potato",
      calories: "~500 kcal",
      recipe: "150g baked salmon, roasted sweet potato, spinach salad"
    },
    {
      title: "Greek Yogurt Protein Bowl",
      calories: "~350 kcal",
      recipe: "Greek yogurt, berries, chia seeds, scoop of protein powder"
    },
    {
      title: "Lean Beef Stir Fry",
      calories: "~500 kcal",
      recipe: "150g lean beef, mixed vegetables, soy sauce, small serving rice"
    }
  ];

  const [weight,setWeight] = useState(START_WEIGHT);
  const [steps,setSteps] = useState("");
  const [history,setHistory] = useState([]);

  const [habits,setHabits] = useState({
    water:false,
    protein:false,
    walk:false,
    workout:false,
    stretch:false,
    sleep:false
  });

  const injectionDay = "Saturday";

  useEffect(()=>{

    const saved = localStorage.getItem("emilFitnessMVP");

    if(saved){
      const data = JSON.parse(saved);

      setWeight(data.weight || START_WEIGHT);
      setSteps(data.steps || "");
      setHabits(data.habits || habits);
      setHistory(data.history || []);
    }

  },[]);


  useEffect(()=>{

    localStorage.setItem("emilFitnessMVP",JSON.stringify({
      weight,
      steps,
      habits,
      history
    }))

  },[weight,steps,habits,history]);


  const toggleHabit=(h)=>{
    setHabits({...habits,[h]:!habits[h]});
  }


  const completed = Object.values(habits).filter(Boolean).length;


  const nextMilestone = milestones.find(m=>m < weight);


  const addWeighIn=()=>{

    const today = new Date().toLocaleDateString();

    const newEntry={
      date:today,
      weight
    }

    setHistory([newEntry,...history]);

  }


  const progressPercent = Math.max(0, Math.min(100, ((START_WEIGHT-weight)/(START_WEIGHT-GOAL_WEIGHT))*100 ));


  const card={
    background:"#1e1e1e",
    padding:"16px",
    borderRadius:"12px",
    marginBottom:"18px",
    color:"white"
  };


  return (

<div style={{

  fontFamily:"system-ui, sans-serif",
  maxWidth:"420px",
  margin:"auto",
  padding:"20px",
  background:"#0f0f0f",
  minHeight:"100vh",
  color:"white"

}}>

<h1 style={{textAlign:"center"}}>Emil Fitness App</h1>

<p style={{textAlign:"center",color:"#aaa"}}>Healthy fat loss with tirzepatide</p>


{/* PROGRESS */}

<div style={card}>

<h2>Weight</h2>

<input
 type="number"
 value={weight}
 onChange={(e)=>setWeight(Number(e.target.value))}
 style={{width:"100%",padding:"10px",fontSize:"16px",borderRadius:"8px",border:"none"}}
/>


<div style={{background:"#333",height:"10px",borderRadius:"6px",marginTop:"12px"}}>

<div style={{background:"#22c55e",width:`${progressPercent}%`,height:"10px",borderRadius:"6px"}}></div>

</div>


<p style={{marginTop:"10px",color:"#bbb"}}>Next milestone: {nextMilestone} kg</p>

<button
onClick={addWeighIn}
style={{marginTop:"10px",padding:"10px",width:"100%",border:"none",background:"#22c55e",color:"white",borderRadius:"8px",fontSize:"15px"}}
>
Save Weekly Weigh-In
</button>

</div>


{/* HABITS */}

<div style={card}>

<h2>Daily Habits ({completed}/6)</h2>

{Object.keys(habits).map(h=> (

<label key={h} style={{display:"block",marginBottom:"6px"}}>

<input
 type="checkbox"
 checked={habits[h]}
 onChange={()=>toggleHabit(h)}
/>

{" "}

{h.charAt(0).toUpperCase()+h.slice(1)}

</label>

))}

</div>


{/* STEPS */}

<div style={card}>

<h2>Steps</h2>

<input
 type="number"
 value={steps}
 placeholder="Enter steps"
 onChange={(e)=>setSteps(e.target.value)}
 style={{width:"100%",padding:"10px",borderRadius:"8px",border:"none"}}
/>

<p style={{fontSize:"13px",color:"#aaa"}}>Goal progression: 4k → 6k → 8k</p>

</div>


{/* WORKOUT */}

<div style={card}>

<h2>Workout Plan</h2>

<p><b>Workout A</b></p>
<ul>
<li>Leg Press 3×10</li>
<li>Chest Press 3×10</li>
<li>Seated Row 3×10</li>
<li>Plank</li>
</ul>

<p><b>Workout B</b></p>
<ul>
<li>Lat Pulldown 3×10</li>
<li>Dumbbell Shoulder Press 3×10</li>
<li>Goblet Squat 3×10</li>
<li>Dead Bug</li>
</ul>

<p style={{fontSize:"13px",color:"#aaa"}}>Mon A • Wed B • Fri A</p>

</div>


{/* MEAL PLANS */}

<div style={card}>

<h2>Meal Plans</h2>

{mealPlans.map((meal,i)=> (

<div key={i} style={{marginBottom:"12px"}}>

<b>{meal.title}</b>

<p style={{fontSize:"13px",color:"#bbb"}}>{meal.calories}</p>

<p style={{fontSize:"14px"}}>{meal.recipe}</p>

</div>

))}

</div>


{/* TIRZEPATIDE */}

<div style={card}>

<h2>Tirzepatide</h2>

<p>Injection Day: <b>{injectionDay}</b></p>

<p style={{fontSize:"13px",color:"#aaa"}}>Remember your weekly dose</p>

</div>


{/* HISTORY */}

<div style={card}>

<h2>Weight History</h2>

{history.length===0 && <p>No weigh-ins yet</p>}

{history.map((h,i)=> (
<div key={i} style={{fontSize:"14px"}}>
{h.date} — {h.weight} kg
</div>
))}

</div>


<p style={{marginTop:"24px",textAlign:"center",fontSize:"13px",color:"#777"}}>
Target: 119 → 105 → 99 → 90 kg
</p>

</div>

);

}
