import React, { useEffect, useMemo, useState } from "react";

export default function EmilFitnessMobileDashboard() {

const START_WEIGHT = 119;
const GOAL_WEIGHT = 90;
const STEP_GOAL = 4000;
const storageKey = "emilFitnessPH";

const weeklyMeals = {
Monday:{
breakfast:[
{name:"Tortang Talong + Rice",calories:420,protein:20,recipe:"Grill eggplant, mash with egg and fry. Serve with small rice portion."},
{name:"Pandesal + Eggs",calories:380,protein:18,recipe:"2 pandesal with 2 fried or scrambled eggs."}
],
snack:[
{name:"Banana",calories:120,protein:1,recipe:"1 saba or lakatan banana."},
{name:"Boiled Camote",calories:150,protein:2,recipe:"Boiled sweet potato."}
],
lunch:[
{name:"Chicken Tinola",calories:520,protein:38,recipe:"Chicken soup with ginger, sayote and malunggay."},
{name:"Bangus + Ensaladang Talong",calories:480,protein:35,recipe:"Grilled bangus with eggplant salad."}
],
dinner:[
{name:"Sinigang na Isda",calories:430,protein:32,recipe:"Fish sour soup with kangkong and radish."},
{name:"Ginisang Gulay",calories:350,protein:12,recipe:"Mixed vegetables sauteed with small pork pieces."}
]
},
Tuesday:{
breakfast:[
{name:"Tuna + Rice + Egg",calories:420,protein:28,recipe:"Saute canned tuna with onion. Serve with egg and rice."},
{name:"Oatmeal + Banana",calories:350,protein:14,recipe:"Cook oats with milk and banana."}
],
snack:[
{name:"Boiled Corn",calories:130,protein:4,recipe:"1 boiled corn."},
{name:"Milk",calories:120,protein:8,recipe:"1 glass milk."}
],
lunch:[
{name:"Adobong Manok",calories:540,protein:40,recipe:"Chicken adobo with garlic, soy sauce and vinegar."},
{name:"Ginisang Monggo",calories:480,protein:22,recipe:"Mung bean stew with malunggay."}
],
dinner:[
{name:"Grilled Chicken + Vegetables",calories:450,protein:36,recipe:"Grilled chicken breast with cabbage and carrots."},
{name:"Fish + Rice + Veg",calories:430,protein:32,recipe:"Simple fried fish with vegetables."}
]
},
Wednesday:{
breakfast:[
{name:"Champorado + Milk",calories:420,protein:12,recipe:"Chocolate rice porridge with milk."},
{name:"Egg + Tomato + Rice",calories:350,protein:18,recipe:"2 eggs with tomatoes and rice."}
],
snack:[
{name:"Peanut Butter Sandwich",calories:210,protein:8,recipe:"Bread with peanut butter."},
{name:"Banana",calories:120,protein:1,recipe:"Fresh banana."}
],
lunch:[
{name:"Pancit Bihon",calories:520,protein:20,recipe:"Rice noodles with vegetables and chicken."},
{name:"Chicken Tinola",calories:520,protein:38,recipe:"Chicken soup with vegetables."}
],
dinner:[
{name:"Lentil Soup",calories:400,protein:20,recipe:"Lentils cooked with vegetables."},
{name:"Grilled Fish + Veg",calories:420,protein:34,recipe:"Grilled fish with sautéed vegetables."}
]
},
Thursday:{
breakfast:[
{name:"Pandesal + Tuna",calories:360,protein:22,recipe:"Pandesal filled with tuna."},
{name:"Oatmeal + Peanut Butter",calories:380,protein:16,recipe:"Oats with peanut butter."}
],
snack:[
{name:"Boiled Camote",calories:150,protein:2,recipe:"Boiled sweet potato."},
{name:"Milk",calories:120,protein:8,recipe:"Glass of milk."}
],
lunch:[
{name:"Bangus + Rice",calories:500,protein:36,recipe:"Fried or grilled bangus."},
{name:"Chicken Adobo",calories:540,protein:40,recipe:"Chicken adobo."}
],
dinner:[
{name:"Ginisang Gulay",calories:350,protein:12,recipe:"Mixed vegetable sauté."},
{name:"Fish Soup",calories:400,protein:28,recipe:"Light fish soup."}
]
},
Friday:{
breakfast:[
{name:"Egg + Rice",calories:330,protein:16,recipe:"2 eggs with small rice."},
{name:"Banana Oatmeal",calories:350,protein:14,recipe:"Oats with banana."}
],
snack:[
{name:"Banana",calories:120,protein:1,recipe:"Fresh banana."},
{name:"Boiled Corn",calories:130,protein:4,recipe:"Boiled corn."}
],
lunch:[
{name:"Chicken Tinola",calories:520,protein:38,recipe:"Chicken soup."},
{name:"Ginisang Monggo",calories:480,protein:22,recipe:"Mung bean stew."}
],
dinner:[
{name:"Grilled Fish",calories:420,protein:34,recipe:"Grilled fish."},
{name:"Vegetable Stir Fry",calories:360,protein:12,recipe:"Vegetables sautéed."}
]
},
Saturday:{
breakfast:[
{name:"Light Oatmeal",calories:300,protein:12,recipe:"Light oatmeal breakfast."},
{name:"Banana + Milk",calories:250,protein:10,recipe:"Banana with milk."}
],
snack:[
{name:"Crackers",calories:140,protein:2,recipe:"Plain crackers."},
{name:"Fruit",calories:100,protein:1,recipe:"Seasonal fruit."}
],
lunch:[
{name:"Chicken Soup",calories:420,protein:32,recipe:"Light chicken soup."},
{name:"Fish + Vegetables",calories:420,protein:30,recipe:"Fish with vegetables."}
],
dinner:[
{name:"Vegetable Soup",calories:320,protein:12,recipe:"Light vegetable soup."},
{name:"Grilled Chicken",calories:430,protein:36,recipe:"Grilled chicken."}
]
},
Sunday:{
breakfast:[
{name:"Egg + Pandesal",calories:360,protein:18,recipe:"Egg with pandesal."},
{name:"Oatmeal",calories:320,protein:12,recipe:"Plain oatmeal."}
],
snack:[
{name:"Banana",calories:120,protein:1,recipe:"Fresh banana."},
{name:"Peanut Butter Sandwich",calories:210,protein:8,recipe:"Bread with peanut butter."}
],
lunch:[
{name:"Adobong Manok",calories:540,protein:40,recipe:"Chicken adobo."},
{name:"Bangus + Rice",calories:500,protein:36,recipe:"Bangus with rice."}
],
dinner:[
{name:"Sinigang na Isda",calories:430,protein:32,recipe:"Fish sour soup."},
{name:"Vegetable Stir Fry",calories:360,protein:12,recipe:"Mixed vegetables."}
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
