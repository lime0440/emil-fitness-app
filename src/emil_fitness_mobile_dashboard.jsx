import React, { useState } from "react";

export default function EmilFitnessMobileDashboard() {

  const [weight, setWeight] = useState(119);
  const [steps, setSteps] = useState("");
  const [water, setWater] = useState(false);
  const [protein, setProtein] = useState(false);
  const [workout, setWorkout] = useState(false);

  return (
    <div style={{fontFamily:"Arial", padding:"20px"}}>

      <h1>Emil Fitness Dashboard</h1>
      <p>Healthy weight loss plan</p>

      <h2>Today's Habits</h2>

      <label>
        <input type="checkbox" checked={water} onChange={()=>setWater(!water)} />
        Drink 3L Water
      </label>
      <br/>

      <label>
        <input type="checkbox" checked={protein} onChange={()=>setProtein(!protein)} />
        Eat 110g Protein
      </label>
      <br/>

      <label>
        <input type="checkbox" checked={workout} onChange={()=>setWorkout(!workout)} />
        Workout / Walk
      </label>

      <h2 style={{marginTop:"20px"}}>Steps</h2>

      <input
        type="number"
        value={steps}
        onChange={(e)=>setSteps(e.target.value)}
        placeholder="Enter steps"
      />

      <h2 style={{marginTop:"20px"}}>Weight</h2>

      <input
        type="number"
        value={weight}
        onChange={(e)=>setWeight(e.target.value)}
      />

      <p>Current weight: {weight} kg</p>

    </div>
  );
}
