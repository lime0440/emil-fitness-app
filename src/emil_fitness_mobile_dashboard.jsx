import React, { useEffect, useMemo, useState } from "react";

export default function EmilFitnessMobileDashboard() {
  const START_WEIGHT = 119;
  const GOAL_WEIGHT = 90;
  const STEP_GOAL = 4000;
  const milestones = [119, 110, 105, 99, 95, 90];
  const storageKey = "emilFitnessMVP_v2";

  const weeklyMeals = {
    Monday: {
      breakfast: [
        { name: "Egg & Avocado Toast", calories: 420, protein: 24, recipe: "Scramble 3 eggs, toast 1 slice whole grain bread, top with 1/2 avocado and a pinch of salt." },
        { name: "Greek Yogurt Berry Bowl", calories: 330, protein: 28, recipe: "Mix 200g Greek yogurt with berries and 1 tbsp chia seeds." }
      ],
      snack: [
        { name: "Apple + Peanut Butter", calories: 210, protein: 5, recipe: "Slice 1 apple and serve with 1 tbsp peanut butter." },
        { name: "Protein Shake", calories: 160, protein: 24, recipe: "Blend 1 scoop whey with cold water or almond milk." }
      ],
      lunch: [
        { name: "Chicken Quinoa Bowl", calories: 520, protein: 44, recipe: "Serve 150g grilled chicken over 1/2 cup quinoa with broccoli and olive oil." },
        { name: "Tuna Salad Bowl", calories: 430, protein: 36, recipe: "Mix tuna, lettuce, cucumber, tomatoes and a light olive oil dressing." }
      ],
      dinner: [
        { name: "Salmon & Sweet Potato", calories: 560, protein: 38, recipe: "Bake 150g salmon, roast sweet potato, serve with spinach salad." },
        { name: "Chicken Veggie Stir Fry", calories: 500, protein: 40, recipe: "Cook chicken breast with mixed vegetables, garlic and a light soy sauce." }
      ]
    },
    Tuesday: {
      breakfast: [
        { name: "Protein Oatmeal", calories: 390, protein: 29, recipe: "Cook oats and stir in protein powder or Greek yogurt, then top with banana." },
        { name: "Egg Breakfast Burrito", calories: 430, protein: 27, recipe: "Fill a tortilla with scrambled eggs, spinach and a little cheese." }
      ],
      snack: [
        { name: "Greek Yogurt + Almonds", calories: 220, protein: 20, recipe: "Serve Greek yogurt with a small handful of almonds." },
        { name: "Boiled Eggs", calories: 140, protein: 12, recipe: "Boil 2 eggs and season lightly." }
      ],
      lunch: [
        { name: "Turkey Wrap", calories: 470, protein: 35, recipe: "Fill a whole wheat wrap with turkey, lettuce, tomato and mustard." },
        { name: "Chicken Caesar Salad", calories: 480, protein: 38, recipe: "Top lettuce with grilled chicken and a light Caesar dressing." }
      ],
      dinner: [
        { name: "Lean Beef Stir Fry", calories: 560, protein: 37, recipe: "Stir fry lean beef with vegetables and serve with a small rice portion." },
        { name: "Grilled Fish + Vegetables", calories: 490, protein: 36, recipe: "Grill white fish and serve with asparagus and roasted potatoes." }
      ]
    },
    Wednesday: {
      breakfast: [
        { name: "Greek Yogurt Parfait", calories: 340, protein: 24, recipe: "Layer Greek yogurt, berries and a small amount of granola." },
        { name: "Protein Smoothie", calories: 360, protein: 30, recipe: "Blend protein powder, banana, almond milk and 1 tbsp peanut butter." }
      ],
      snack: [
        { name: "Cottage Cheese Bowl", calories: 220, protein: 22, recipe: "Serve cottage cheese with pineapple chunks." },
        { name: "Protein Bar", calories: 200, protein: 18, recipe: "Choose a bar with lower sugar and at least 15g protein." }
      ],
      lunch: [
        { name: "Chicken Rice Bowl", calories: 530, protein: 42, recipe: "Combine grilled chicken, rice, cucumber and steamed greens." },
        { name: "Salmon Salad Bowl", calories: 510, protein: 35, recipe: "Serve baked salmon over greens with quinoa and lemon dressing." }
      ],
      dinner: [
        { name: "Turkey Chili", calories: 540, protein: 39, recipe: "Cook ground turkey with beans, tomato sauce and chili spices." },
        { name: "Shrimp Rice Bowl", calories: 500, protein: 34, recipe: "Serve shrimp with rice, avocado and cucumber." }
      ]
    },
    Thursday: {
      breakfast: [
        { name: "Egg & Spinach Scramble", calories: 350, protein: 25, recipe: "Scramble 3 eggs with spinach and serve with toast." },
        { name: "Overnight Oats", calories: 380, protein: 24, recipe: "Mix oats, Greek yogurt, milk and chia seeds, chill overnight." }
      ],
      snack: [
        { name: "Banana + Peanut Butter", calories: 210, protein: 5, recipe: "Slice a banana and add 1 tbsp peanut butter." },
        { name: "Greek Yogurt Cup", calories: 150, protein: 15, recipe: "Enjoy one plain Greek yogurt cup." }
      ],
      lunch: [
        { name: "Chicken Burrito Bowl", calories: 550, protein: 41, recipe: "Layer chicken, rice, beans and salsa in a bowl." },
        { name: "Turkey & Veggie Rice Bowl", calories: 510, protein: 36, recipe: "Cook turkey mince with mixed vegetables and serve over rice." }
      ],
      dinner: [
        { name: "Baked Salmon Plate", calories: 550, protein: 38, recipe: "Bake salmon and serve with sweet potato and greens." },
        { name: "Lentil Vegetable Soup", calories: 430, protein: 20, recipe: "Simmer lentils with carrots, celery, onion and stock." }
      ]
    },
    Friday: {
      breakfast: [
        { name: "Protein Pancakes", calories: 400, protein: 26, recipe: "Blend oats, eggs and banana, then cook as pancakes." },
        { name: "Avocado Egg Bowl", calories: 360, protein: 20, recipe: "Serve 2 eggs with avocado and chopped tomatoes." }
      ],
      snack: [
        { name: "Boiled Eggs + Fruit", calories: 180, protein: 12, recipe: "Have 2 boiled eggs with 1 piece of fruit." },
        { name: "Protein Shake", calories: 160, protein: 24, recipe: "Blend 1 scoop whey with water or almond milk." }
      ],
      lunch: [
        { name: "Chicken Pasta Salad", calories: 520, protein: 37, recipe: "Mix grilled chicken with cooked pasta, greens and light dressing." },
        { name: "Tuna Rice Bowl", calories: 490, protein: 34, recipe: "Serve tuna, rice, cucumber and corn with light seasoning." }
      ],
      dinner: [
        { name: "Lean Beef Bowl", calories: 560, protein: 37, recipe: "Cook lean beef strips with peppers and serve with rice." },
        { name: "Chicken Stir Fry", calories: 500, protein: 40, recipe: "Cook chicken with mixed vegetables and garlic." }
      ]
    },
    Saturday: {
      breakfast: [
        { name: "Light Protein Smoothie", calories: 300, protein: 28, recipe: "Blend protein powder, banana and almond milk for a lighter tirzepatide day breakfast." },
        { name: "Greek Yogurt Bowl", calories: 320, protein: 25, recipe: "Greek yogurt with berries and chia seeds." }
      ],
      snack: [
        { name: "Crackers + Cottage Cheese", calories: 180, protein: 14, recipe: "Top a few crackers with cottage cheese." },
        { name: "Apple Slices", calories: 95, protein: 0, recipe: "Keep it light if appetite is low after injection." }
      ],
      lunch: [
        { name: "Simple Chicken Bowl", calories: 450, protein: 38, recipe: "Chicken, rice and steamed vegetables with minimal oil." },
        { name: "Turkey Wrap", calories: 470, protein: 35, recipe: "Whole wheat wrap with turkey and salad." }
      ],
      dinner: [
        { name: "Grilled Fish Plate", calories: 470, protein: 36, recipe: "White fish with vegetables and potatoes." },
        { name: "Chicken Soup", calories: 390, protein: 30, recipe: "Chicken breast, vegetables and stock simmered into a light soup." }
      ]
    },
    Sunday: {
      breakfast: [
        { name: "Egg & Toast Plate", calories: 360, protein: 22, recipe: "2 eggs, toast and tomato slices." },
        { name: "Protein Oats", calories: 390, protein: 29, recipe: "Oats with protein powder and banana." }
      ],
      snack: [
        { name: "Greek Yogurt", calories: 150, protein: 15, recipe: "Plain Greek yogurt cup." },
        { name: "Protein Bar", calories: 200, protein: 18, recipe: "Choose one with moderate sugar." }
      ],
      lunch: [
        { name: "Chicken Quinoa Bowl", calories: 520, protein: 44, recipe: "Grilled chicken, quinoa and greens." },
        { name: "Salmon Salad", calories: 510, protein: 35, recipe: "Salmon with mixed greens and lemon dressing." }
      ],
      dinner: [
        { name: "Turkey Chili", calories: 540, protein: 39, recipe: "Ground turkey, beans and tomato sauce." },
        { name: "Lentil Soup + Eggs", calories: 470, protein: 26, recipe: "Lentil soup with 2 boiled eggs on the side." }
      ]
    }
  };

  const defaultSelections = Object.fromEntries(
    Object.entries(weeklyMeals).map(([day, sections]) => [
      day,
      {
        breakfast: sections.breakfast[0].name,
        snack: sections.snack[0].name,
        lunch: sections.lunch[0].name,
        dinner: sections.dinner[0].name
      }
    ])
  );

  const [weight, setWeight] = useState(START_WEIGHT);
  const [steps, setSteps] = useState("");
  const [history, setHistory] = useState([]);
  const [habits, setHabits] = useState({
    water: false,
    protein: false,
    walk: false,
    workout: false,
    stretch: false,
    sleep: false
  });
  const [reminders, setReminders] = useState([
    { label: "Morning check-in", time: "08:00" },
    { label: "Walk / gym", time: "18:00" },
    { label: "Night review", time: "21:00" }
  ]);
  const [mealSelections, setMealSelections] = useState(defaultSelections);
  const injectionDay = "Saturday";

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      setWeight(data.weight || START_WEIGHT);
      setSteps(data.steps || "");
      setHabits(data.habits || {
        water: false,
        protein: false,
        walk: false,
        workout: false,
        stretch: false,
        sleep: false
      });
      setHistory(data.history || []);
      setReminders(data.reminders || reminders);
      setMealSelections(data.mealSelections || defaultSelections);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ weight, steps, habits, history, reminders, mealSelections })
    );
  }, [weight, steps, habits, history, reminders, mealSelections]);

  const toggleHabit = (habit) => {
    setHabits({ ...habits, [habit]: !habits[habit] });
  };

  const addWeighIn = () => {
    const today = new Date().toLocaleDateString();
    setHistory([{ date: today, weight }, ...history]);
  };

  const completed = Object.values(habits).filter(Boolean).length;
  const nextMilestone = milestones.find((m) => m < weight) || GOAL_WEIGHT;
  const progressPercent = Math.max(
    0,
    Math.min(100, ((START_WEIGHT - weight) / (START_WEIGHT - GOAL_WEIGHT)) * 100)
  );

  const dailyNutrition = useMemo(() => {
    const totals = { calories: 0, protein: 0 };
    const dayTotals = {};

    Object.keys(mealSelections).forEach((day) => {
      const sections = mealSelections[day];
      let cals = 0;
      let protein = 0;
      Object.keys(sections).forEach((section) => {
        const selected = weeklyMeals[day][section].find((meal) => meal.name === sections[section]);
        if (selected) {
          cals += selected.calories;
          protein += selected.protein;
        }
      });
      dayTotals[day] = { calories: cals, protein };
      totals.calories += cals;
      totals.protein += protein;
    });

    return { totals, dayTotals };
  }, [mealSelections]);

  const shoppingList = useMemo(() => {
    const map = {};
    const keywords = [
      "eggs", "egg", "avocado", "bread", "whole grain bread", "greek yogurt", "berries", "chia seeds", "apple", "peanut butter", "whey", "protein powder", "chicken", "quinoa", "broccoli", "olive oil", "tuna", "lettuce", "cucumber", "tomatoes", "salmon", "sweet potato", "spinach", "vegetables", "garlic", "oats", "banana", "tortilla", "cheese", "almonds", "turkey", "beef", "rice", "asparagus", "potatoes", "cottage cheese", "pineapple", "pasta", "corn", "beans", "lentils", "carrots", "celery", "onion", "stock", "fish", "crackers"
    ];

    Object.keys(mealSelections).forEach((day) => {
      Object.keys(mealSelections[day]).forEach((section) => {
        const meal = weeklyMeals[day][section].find((m) => m.name === mealSelections[day][section]);
        if (meal) {
          const recipe = meal.recipe.toLowerCase();
          keywords.forEach((key) => {
            if (recipe.includes(key)) map[key] = true;
          });
        }
      });
    });

    return Object.keys(map)
      .sort()
      .map((item) => item.replace(/\b\w/g, (c) => c.toUpperCase()));
  }, [mealSelections]);

  const updateMealSelection = (day, section, value) => {
    setMealSelections({
      ...mealSelections,
      [day]: {
        ...mealSelections[day],
        [section]: value
      }
    });
  };

  const requestNotificationPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      await Notification.requestPermission();
    }
  };

  const card = {
    background: "#171717",
    padding: "16px",
    borderRadius: "16px",
    marginBottom: "18px",
    color: "#f5f5f5",
    border: "1px solid #262626",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
  };

  const input = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#0f0f0f",
    color: "#fff",
    fontSize: "15px",
    boxSizing: "border-box"
  };

  const button = {
    marginTop: "10px",
    padding: "10px 12px",
    width: "100%",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 600
  };

  const days = Object.keys(weeklyMeals);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "460px",
        margin: "auto",
        padding: "20px",
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "white",
        lineHeight: 1.45
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 6 }}>Emil Fitness App</h1>
      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 0 }}>
        Dark MVP • steady fat loss with tirzepatide
      </p>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Weight Progress</h2>
        <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} style={input} />
        <div style={{ background: "#262626", height: 12, borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
          <div style={{ background: "#22c55e", width: `${progressPercent}%`, height: 12 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13, color: "#a3a3a3" }}>
          <span>Start {START_WEIGHT}kg</span>
          <span>Next milestone: {nextMilestone}kg</span>
        </div>
        <button onClick={addWeighIn} style={button}>Save Weekly Weigh-In</button>
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Today</h2>
        <p style={{ marginTop: 0, color: "#a3a3a3" }}>Daily score: {completed}/6</p>
        {Object.keys(habits).map((h) => (
          <label key={h} style={{ display: "block", marginBottom: 8, textTransform: "capitalize" }}>
            <input type="checkbox" checked={habits[h]} onChange={() => toggleHabit(h)} style={{ marginRight: 8 }} />
            {h}
          </label>
        ))}
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Steps</h2>
        <input type="number" value={steps} placeholder="Enter steps" onChange={(e) => setSteps(e.target.value)} style={input} />
        <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 0 }}>Goal progression: {STEP_GOAL.toLocaleString()} → 6,000 → 8,000</p>
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Workout Plan</h2>
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
        <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 0 }}>Mon A • Wed B • Fri A</p>
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Reminder Hub</h2>
        <button onClick={requestNotificationPermission} style={button}>Enable Browser Notifications</button>
        <div style={{ marginTop: 12 }}>
          {reminders.map((reminder, i) => (
            <div key={`${reminder.label}-${i}`} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i === reminders.length - 1 ? "none" : "1px solid #262626" }}>
              <span>{reminder.label}</span>
              <span style={{ color: "#a3a3a3" }}>{reminder.time}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#a3a3a3", fontSize: 12, marginBottom: 0 }}>Tip: add matching phone alarms for reliable daily reminders.</p>
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Weekly Meal Planner</h2>
        <p style={{ color: "#a3a3a3", fontSize: 13 }}>Choose 1 option each for breakfast, snack, lunch and dinner.</p>
        {days.map((day) => (
          <div key={day} style={{ marginBottom: 18, paddingBottom: 14, borderBottom: day === days[days.length - 1] ? "none" : "1px solid #262626" }}>
            <h3 style={{ marginBottom: 10 }}>{day}</h3>
            {Object.keys(weeklyMeals[day]).map((section) => {
              const selectedMeal = weeklyMeals[day][section].find((m) => m.name === mealSelections[day][section]);
              return (
                <div key={`${day}-${section}`} style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", marginBottom: 6, textTransform: "capitalize", color: "#d4d4d4" }}>{section}</label>
                  <select value={mealSelections[day][section]} onChange={(e) => updateMealSelection(day, section, e.target.value)} style={input}>
                    {weeklyMeals[day][section].map((meal) => (
                      <option key={meal.name} value={meal.name}>{meal.name}</option>
                    ))}
                  </select>
                  {selectedMeal ? (
                    <div style={{ background: "#101010", border: "1px solid #262626", borderRadius: 10, padding: 10, marginTop: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 13, color: "#a3a3a3" }}>
                        <span>{selectedMeal.calories} kcal</span>
                        <span>{selectedMeal.protein}g protein</span>
                      </div>
                      <p style={{ marginBottom: 0, marginTop: 8, fontSize: 14 }}>{selectedMeal.recipe}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
            <p style={{ color: "#a3a3a3", fontSize: 12, marginBottom: 0 }}>
              Daily total: {dailyNutrition.dayTotals[day]?.calories || 0} kcal • {dailyNutrition.dayTotals[day]?.protein || 0}g protein
            </p>
          </div>
        ))}
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Nutrition Summary</h2>
        <p>This week: <b>{dailyNutrition.totals.calories}</b> kcal total • <b>{dailyNutrition.totals.protein}</b>g protein total</p>
        <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 0 }}>
          Average per day: {Math.round(dailyNutrition.totals.calories / 7)} kcal • {Math.round(dailyNutrition.totals.protein / 7)}g protein
        </p>
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Shopping List</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {shoppingList.map((item) => (
            <span key={item} style={{ background: "#262626", padding: "6px 10px", borderRadius: 999, fontSize: 13 }}>{item}</span>
          ))}
        </div>
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Tirzepatide</h2>
        <p>Injection day: <b>{injectionDay}</b></p>
        <p style={{ color: "#a3a3a3", fontSize: 13, marginBottom: 0 }}>Keep meals lighter if appetite is lower after your dose.</p>
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Weight History</h2>
        {history.length === 0 ? <p>No weigh-ins yet</p> : history.map((h, i) => <div key={`${h.date}-${i}`} style={{ fontSize: 14, padding: "6px 0" }}>{h.date} — {h.weight} kg</div>)}
      </div>

      <p style={{ marginTop: 24, textAlign: "center", fontSize: 12, color: "#737373" }}>
        Goal path: 119 → 110 → 105 → 99 → 90 kg
      </p>
    </div>
  );
}
