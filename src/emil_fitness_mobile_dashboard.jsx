import React, { useEffect, useState } from "react";

export default function EmilFitnessMobileDashboard() {
  const [weight, setWeight] = useState(119);
  const [steps, setSteps] = useState("");
  const [habits, setHabits] = useState({
    water: false,
    protein: false,
    workout: false,
    stretch: false,
    sleep: false
  });

  const milestones = [119,110,105,99,90,85];

  useEffect(() => {
    const saved = localStorage.getItem("emilFitnessData");
    if (saved) {
      const data = JSON.parse(saved);
      setWeight(data.weight || 119);
      setSteps(data.steps || "");
      setHabits(data.habits || habits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("emilFitnessData", JSON.stringify({ weight, steps, habits }));
  }, [weight, steps, habits]);

  const toggleHabit = (name) => {
    setHabits({ ...habits, [name]: !habits[name] });
  };

  const completed = Object.values(habits).filter(Boolean).length;

  const nextMilestone = milestones.find(m => m < weight);

  return (
    <div style={{
      fontFamily:"Arial, sans-serif",
      maxWidth:"420px",
      margin:"auto",
      padding:"20px"
    }}>

      <h1 style={{textAlign:"center"}}>Emil Fitness Dashboard</h1>

      <div style={{
        background:"#f2f2f2",
        padding:"15px",
        borderRadius:"12px",
        marginBottom:"20px"
      }}>
        <h2>Current Weight</h2>
        <input
          type="number"
          value={weight}
          onChange={(e)=>setWeight(e.target.value)}
          style={{width:"100%", padding:"8px"}}
        />
        <p>Next milestone: {nextMilestone} kg</p>
      </div>

      <div style={{
        background:"#f2f2f2",
        padding:"15px",
        borderRadius:"12px",
        marginBottom:"20px"
      }}>
        <h2>Today's Habits ({completed}/5)</h2>

        {Object.keys(habits).map(h => (
          <label key={h} style={{display:"block", marginBottom:"6px"}}>
            <input
              type="checkbox"
              checked={habits[h]}
              onChange={()=>toggleHabit(h)}
            /> {h.charAt(0).toUpperCase()+h.slice(1)}
          </label>
        ))}
      </div>

      <div style={{
        background:"#f2f2f2",
        padding:"15px",
        borderRadius:"12px"
      }}>
        <h2>Steps</h2>
        <input
          type="number"
          value={steps}
          placeholder="Enter steps"
          onChange={(e)=>setSteps(e.target.value)}
          style={{width:"100%", padding:"8px"}}
        />
      </div>

      <div style={{marginTop:"20px", fontSize:"14px", textAlign:"center", color:"gray"}}>
        Goal: steady fat loss while using tirzepatide
      </div>

    </div>
  );
}
