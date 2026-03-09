import React, { useEffect, useState } from "react";

export default function EmilFitnessMobileDashboard() {

  const milestones = [119,110,105,99,95,90,85];

  const [weight,setWeight] = useState(119);
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

  const [injectionDay] = useState("Sunday");

  useEffect(()=>{
    const saved = localStorage.getItem("emilFitnessApp");

    if(saved){
      const data = JSON.parse(saved);

      setWeight(data.weight || 119);
      setSteps(data.steps || "");
      setHabits(data.habits || habits);
      setHistory(data.history || []);
    }

  },[]);

  useEffect(()=>{

    localStorage.setItem("emilFitnessApp",JSON.stringify({
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

  const progressPercent = Math.max(0, Math.min(100, ((119-weight)/(119-85))*100 ));

  return (

<div style={{

  fontFamily:"Arial, sans-serif",
  maxWidth:"420px",
  margin:"auto",
  padding:"20px",
  lineHeight:1.5

}}>

<h1 style={{textAlign:"center"}}>Emil Fitness App</h1>

<p style={{textAlign:"center",color:"gray"}}>Healthy fat loss with tirzepatide</p>


{/* Progress */}

<div style={{

background:"#f2f2f2",

padding:"15px",

borderRadius:"12px",

marginBottom:"20px"

}}>

<h2>Weight Progress</h2>

<input

 type="number"

 value={weight}

 onChange={(e)=>setWeight(Number(e.target.value))}

 style={{width:"100%",padding:"8px"}}

/>


<div style={{

background:"#ddd",

height:"10px",

borderRadius:"6px",

marginTop:"10px"

}}>

<div style={{

background:"#4CAF50",

width:`${progressPercent}%`,

height:"10px",

borderRadius:"6px"

}}></div>

</div>


<p style={{marginTop:"10px"}}>Next milestone: {nextMilestone} kg</p>

<button

onClick={addWeighIn}

style={{

marginTop:"10px",

padding:"8px",

width:"100%",

border:"none",

background:"#4CAF50",

color:"white",

borderRadius:"8px"

}}

>

Save Weekly Weigh‑In

</button>


</div>


{/* Habits */}

<div style={{

background:"#f2f2f2",

padding:"15px",

borderRadius:"12px",

marginBottom:"20px"

}}>

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


{/* Steps */}

<div style={{

background:"#f2f2f2",

padding:"15px",

borderRadius:"12px",

marginBottom:"20px"

}}>

<h2>Steps</h2>

<input

 type="number"

 value={steps}

 placeholder="Enter steps"

 onChange={(e)=>setSteps(e.target.value)}

 style={{width:"100%",padding:"8px"}}

/>


<p style={{fontSize:"14px",color:"gray"}}>Target: 4k → 6k → 8k steps</p>

</div>


{/* Workout Plan */}

<div style={{

background:"#f2f2f2",

padding:"15px",

borderRadius:"12px",

marginBottom:"20px"

}}>

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

<li>Dead Bug Core</li>

</ul>


<p style={{fontSize:"14px",color:"gray"}}>Mon A • Wed B • Fri A</p>


</div>


{/* Tirzepatide */}

<div style={{

background:"#f2f2f2",

padding:"15px",

borderRadius:"12px",

marginBottom:"20px"

}}>

<h2>Tirzepatide Tracker</h2>


<p>Injection Day: <b>{injectionDay}</b></p>

<p style={{fontSize:"14px",color:"gray"}}>Remember weekly dose</p>


</div>


{/* History */}

<div style={{

background:"#f2f2f2",

padding:"15px",

borderRadius:"12px"

}}>

<h2>Weight History</h2>


{history.length===0 && <p>No weigh‑ins yet</p>}


{history.map((h,i)=> (

<div key={i} style={{fontSize:"14px"}}>

{h.date} — {h.weight} kg

</div>

))}


</div>


<p style={{marginTop:"25px",textAlign:"center",fontSize:"13px",color:"gray"}}>

Goal: 119 → 105 → 99 → 90 kg

</p>


</div>

);

}
