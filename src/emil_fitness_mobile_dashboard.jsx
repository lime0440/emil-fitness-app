import React, { useEffect, useMemo, useState } from "react";

export default function EmilFitnessMobileDashboard() {

const START_WEIGHT = 119;
const GOAL_WEIGHT = 90;
const STEP_GOAL = 4000;
const storageKey = "emilFitnessPH";

const weeklyMeals = {
Monday:{
breakfast:[
{name:"Tortang Talong + Rice",calories:420,protein:20,recipe:"1 large eggplant, 1 egg, 1 tsp oil. Serve with 1/2 cup cooked rice."},
{name:"Pandesal + Eggs",calories:380,protein:18,recipe:"2 medium pandesal (60g total) with 2 eggs cooked with 1 tsp oil."}
],
snack:[
{name:"Banana",calories:120,protein:1,recipe:"1 medium banana (lakatan or saba)."},
{name:"Boiled Camote",calories:150,protein:2,recipe:"1 medium camote about 120g."}
],
lunch:[
{name:"Chicken Tinola",calories:520,protein:38,recipe:"150g chicken thigh with soup vegetables. Serve with 3/4 cup cooked rice."},
{name:"Bangus + Ensaladang Talong",calories:480,protein:35,recipe:"120g grilled bangus, eggplant salad, 1/2 cup cooked rice."}
],
dinner:[
{name:"Sinigang na Isda",calories:430,protein:32,recipe:"150g fish in sinigang broth with vegetables, 1/2 cup rice."},
{name:"Ginisang Gulay",calories:350,protein:12,recipe:"1.5 cups sautéed mixed vegetables with 30g pork bits, 1/2 cup rice."}
]
},
Tuesday:{
breakfast:[
{name:"Tuna + Rice + Egg",calories:420,protein:28,recipe:"1/2 can tuna sautéed with onion, 1 egg, 1/2 cup rice."},
{name:"Oatmeal + Banana",calories:350,protein:14,recipe:"40g oats cooked with milk and 1/2 banana."}
],
snack:[
{name:"Boiled Corn",calories:130,protein:4,recipe:"1 small boiled corn (100g kernels)."},
{name:"Milk",calories:120,protein:8,recipe:"1 glass milk (250ml)."}
],
lunch:[
{name:"Adobong Manok",calories:540,protein:40,recipe:"150g chicken adobo with sauce, 3/4 cup rice."},
{name:"Ginisang Monggo",calories:480,protein:22,recipe:"1.5 cups monggo stew with malunggay and small pork pieces, 1/2 cup rice."}
],
dinner:[
{name:"Grilled Chicken + Vegetables",calories:450,protein:36,recipe:"120g grilled chicken breast with 1 cup sautéed vegetables."},
{name:"Fish + Rice + Veg",calories:430,protein:32,recipe:"120g fried fish, 1 cup vegetables, 1/2 cup rice."}
]
},
Wednesday:{
breakfast:[
{name:"Champorado + Milk",calories:420,protein:12,recipe:"1 bowl champorado (1 cup cooked) with 2 tbsp evaporated milk."},
{name:"Egg + Tomato + Rice",calories:350,protein:18,recipe:"2 eggs sautéed with tomatoes, 1/2 cup rice."}
],
snack:[
{name:"Peanut Butter Sandwich",calories:210,protein:8,recipe:"2 slices bread with 1 tbsp peanut butter."},
{name:"Banana",calories:120,protein:1,recipe:"1 medium banana."}
],
lunch:[
{name:"Pancit Bihon",calories:520,protein:20,recipe:"1 plate pancit bihon about 1.5 cups noodles with vegetables and chicken."},
{name:"Chicken Tinola",calories:520,protein:38,recipe:"150g chicken tinola with vegetables and 1/2 cup rice."}
],
dinner:[
{name:"Lentil Soup",calories:400,protein:20,recipe:"1.5 cups lentil soup with vegetables."},
{name:"Grilled Fish + Veg",calories:420,protein:34,recipe:"120g grilled fish with 1 cup sautéed vegetables."}
]
},
Thursday:{
breakfast:[
{name:"Pandesal + Tuna",calories:360,protein:22,recipe:"2 pandesal stuffed with 60g tuna."},
{name:"Oatmeal + Peanut Butter",calories:380,protein:16,recipe:"40g oats cooked with water and 1 tbsp peanut butter."}
],
snack:[
{name:"Boiled Camote",calories:150,protein:2,recipe:"1 medium camote (120g)."},
{name:"Milk",calories:120,protein:8,recipe:"1 glass milk (250ml)."}
],
lunch:[
{name:"Bangus + Rice",calories:500,protein:36,recipe:"120g bangus with 3/4 cup rice."},
{name:"Chicken Adobo",calories:540,protein:40,recipe:"150g chicken adobo with 3/4 cup rice."}
],
dinner:[
{name:"Ginisang Gulay",calories:350,protein:12,recipe:"1.5 cups vegetable sauté."},
{name:"Fish Soup",calories:400,protein:28,recipe:"150g fish soup with vegetables."}
]
},
Friday:{
breakfast:[
{name:"Egg + Rice",calories:330,protein:16,recipe:"2 eggs cooked with 1/2 cup rice."},
{name:"Banana Oatmeal",calories:350,protein:14,recipe:"40g oats cooked with 1/2 banana."}
],
snack:[
{name:"Banana",calories:120,protein:1,recipe:"1 medium banana."},
{name:"Boiled Corn",calories:130,protein:4,recipe:"1 small boiled corn."}
],
lunch:[
{name:"Chicken Tinola",calories:520,protein:38,recipe:"150g chicken tinola with vegetables and 3/4 cup rice."},
{name:"Ginisang Monggo",calories:480,protein:22,recipe:"1.5 cups monggo stew with 1/2 cup rice."}
],
dinner:[
{name:"Grilled Fish",calories:420,protein:34,recipe:"120g grilled fish with vegetables."},
{name:"Vegetable Stir Fry",calories:360,protein:12,recipe:"1.5 cups vegetable stir fry."}
]
},
Saturday:{
breakfast:[
{name:"Light Oatmeal",calories:300,protein:12,recipe:"30g oats cooked with milk."},
{name:"Banana + Milk",calories:250,protein:10,recipe:"1 banana with 1 glass milk."}
],
snack:[
{name:"Crackers",calories:140,protein:2,recipe:"4 plain crackers."},
{name:"Fruit",calories:100,protein:1,recipe:"1 serving seasonal fruit."}
],
lunch:[
{name:"Chicken Soup",calories:420,protein:32,recipe:"150g chicken soup with vegetables."},
{name:"Fish + Vegetables",calories:420,protein:30,recipe:"120g fish with 1 cup vegetables."}
],
dinner:[
{name:"Vegetable Soup",calories:320,protein:12,recipe:"1.5 cups vegetable soup."},
{name:"Grilled Chicken",calories:430,protein:36,recipe:"120g grilled chicken breast."}
]
},
Sunday:{
breakfast:[
{name:"Egg + Pandesal",calories:360,protein:18,recipe:"2 eggs with 2 pandesal."},
{name:"Oatmeal",calories:320,protein:12,recipe:"40g oats cooked with milk."}
],
snack:[
{name:"Banana",calories:120,protein:1,recipe:"1 banana."},
{name:"Peanut Butter Sandwich",calories:210,protein:8,recipe:"2 slices bread with 1 tbsp peanut butter."}
],
lunch:[
{name:"Adobong Manok",calories:540,protein:40,recipe:"150g chicken adobo with 3/4 cup rice."},
{name:"Bangus + Rice",calories:500,protein:36,recipe:"120g bangus with 3/4 cup rice."}
],
dinner:[
{name:"Sinigang na Isda",calories:430,protein:32,recipe:"150g fish sinigang with vegetables."},
{name:"Vegetable Stir Fry",calories:360,protein:12,recipe:"1.5 cups stir fried vegetables."}
]
}
};

const defaultSelections = Object.fromEntries(Object.entries(weeklyMeals).map(([day,sections])=>[day,{breakfast:sections.breakfast[0].name,snack:sections.snack[0].name,lunch:sections.lunch[0].name,dinner:sections.dinner[0].name}]));

const [weight,setWeight]=useState(START_WEIGHT);
const [steps,setSteps]=useState("");
const [history,setHistory]=useState([]);
const [mealSelections,setMealSelections]=useState(defaultSelections);

useEffect(()=>{
const saved=localStorage.getItem(storageKey);
if(saved){const d=JSON.parse(saved);setWeight(d.weight||START_WEIGHT);setSteps(d.steps||"");setHistory(d.history||[]);setMealSelections(d.mealSelections||defaultSelections);} },[]);

useEffect(()=>{localStorage.setItem(storageKey,JSON.stringify({weight,steps,history,mealSelections}));},[weight,steps,history,mealSelections]);

const addWeighIn=()=>{const today=new Date().toLocaleDateString();setHistory([{date:today,weight},...history]);};

const progress=Math.max(0,Math.min(100,((START_WEIGHT-weight)/(START_WEIGHT-GOAL_WEIGHT))*100));

const updateMeal=(day,section,val)=>{setMealSelections({...mealSelections,[day]:{...mealSelections[day],[section]:val}});};

const dailyNutrition=useMemo(()=>{
let totals={calories:0,protein:0};
let perDay={};
Object.keys(mealSelections).forEach(day=>{
let c=0,p=0;
Object.keys(mealSelections[day]).forEach(section=>{
const meal=weeklyMeals[day][section].find(m=>m.name===mealSelections[day][section]);
if(meal){c+=meal.calories;p+=meal.protein;}
});
perDay[day]={calories:c,protein:p};
totals.calories+=c;totals.protein+=p;
});
return{totals,perDay};
},[mealSelections]);

const card={background:"#171717",padding:"16px",borderRadius:"14px",marginBottom:"18px",border:"1px solid #262626"};

return(
<div style={{fontFamily:"system-ui",maxWidth:"460px",margin:"auto",padding:"20px",background:"#0a0a0a",minHeight:"100vh",color:"white"}}>

<h1 style={{textAlign:"center"}}>Emil Fitness App</h1>
<p style={{textAlign:"center",color:"#aaa"}}>Filipino Province Meal Planner</p>

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
<p style={{fontSize:"12px",color:"#aaa"}}>Goal {STEP_GOAL} → 6000 → 8000</p>
</div>

<div style={card}>
<h2>Weekly Filipino Meal Plan</h2>
{Object.keys(weeklyMeals).map(day=>(
<div key={day} style={{marginBottom:"20px"}}>
<h3>{day}</h3>
{Object.keys(weeklyMeals[day]).map(section=>{
const meal=weeklyMeals[day][section].find(m=>m.name===mealSelections[day][section]);
return(
<div key={section} style={{marginBottom:"10px"}}>
<label>{section}</label>
<select value={mealSelections[day][section]} onChange={e=>updateMeal(day,section,e.target.value)} style={{width:"100%",padding:"8px"}}>
{weeklyMeals[day][section].map(m=>(<option key={m.name}>{m.name}</option>))}
</select>
{meal && (
<div style={{fontSize:"13px",color:"#ccc",marginTop:"4px"}}>
{meal.calories} kcal • {meal.protein}g protein
<p>{meal.recipe}</p>
</div>
)}
</div>
);
})}
<p style={{fontSize:"12px",color:"#aaa"}}>Daily: {dailyNutrition.perDay[day]?.calories||0} kcal • {dailyNutrition.perDay[day]?.protein||0}g protein</p>
</div>
))}
</div>

<div style={card}>
<h2>Nutrition Summary</h2>
<p>Weekly Calories: {dailyNutrition.totals.calories}</p>
<p>Weekly Protein: {dailyNutrition.totals.protein} g</p>
<p>Average Daily Calories: {Math.round(dailyNutrition.totals.calories/7)}</p>
</div>

<div style={card}>
<h2>Weight History</h2>
{history.map((h,i)=>(<div key={i}>{h.date} - {h.weight} kg</div>))}
</div>

<div style={card}>
<h2>Tirzepatide</h2>
<p>Injection Day: <b>Saturday</b></p>
</div>

</div>
);
}
