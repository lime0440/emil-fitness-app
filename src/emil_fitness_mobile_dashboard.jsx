import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Droplets, Dumbbell, Footprints, Scale, Moon, Pill, Bell, Plus, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'emil-fitness-dashboard-v1';

const todayKey = () => new Date().toISOString().slice(0, 10);

const defaultHabits = [
  { id: 'water', label: 'Drink 2.5–3L water', icon: 'water' },
  { id: 'protein', label: 'Eat 110g+ protein', icon: 'protein' },
  { id: 'steps', label: 'Hit today’s step goal', icon: 'steps' },
  { id: 'workout', label: 'Workout / walk session', icon: 'workout' },
  { id: 'stretch', label: 'Stretch 5 minutes', icon: 'stretch' },
  { id: 'sleep', label: 'Sleep 7+ hours', icon: 'sleep' },
];

const initialData = {
  startWeight: 119,
  currentWeight: 119,
  goalWeight: 85,
  daily: {},
  weighIns: [
    { date: todayKey(), weight: 119, note: 'Starting point' },
  ],
  reminders: [
    { id: 'r1', title: 'Morning check-in', time: '08:00' },
    { id: 'r2', title: 'Walk / gym', time: '18:00' },
    { id: 'r3', title: 'Night review', time: '21:00' },
  ],
  injectionDay: 'Sunday',
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialData;
    return { ...initialData, ...JSON.parse(raw) };
  } catch {
    return initialData;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getStepGoal() {
  return 4000;
}

function habitIcon(id) {
  switch (id) {
    case 'water': return <Droplets className="h-4 w-4" />;
    case 'protein': return <Pill className="h-4 w-4" />;
    case 'steps': return <Footprints className="h-4 w-4" />;
    case 'workout': return <Dumbbell className="h-4 w-4" />;
    case 'sleep': return <Moon className="h-4 w-4" />;
    default: return <Calendar className="h-4 w-4" />;
  }
}

export default function EmilFitnessMobileDashboard() {
  const [data, setData] = useState(initialData);
  const [weightInput, setWeightInput] = useState('');
  const [stepCount, setStepCount] = useState('');
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('08:00');
  const [notificationsSupported, setNotificationsSupported] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');

  const date = todayKey();

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
    setNotificationsSupported(typeof window !== 'undefined' && 'Notification' in window);
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const todayState = data.daily[date] || {
    habits: Object.fromEntries(defaultHabits.map((h) => [h.id, false])),
    steps: '',
    notes: '',
  };

  const completedCount = Object.values(todayState.habits || {}).filter(Boolean).length;
  const progress = Math.round((completedCount / defaultHabits.length) * 100);
  const lostKg = Math.max(0, (data.startWeight || 0) - (data.currentWeight || 0));
  const remainingKg = Math.max(0, (data.currentWeight || 0) - (data.goalWeight || 0));

  const nextMilestone = useMemo(() => {
    if (data.currentWeight > 110) return 110;
    if (data.currentWeight > 105) return 105;
    if (data.currentWeight > 99) return 99;
    if (data.currentWeight > 95) return 95;
    return data.goalWeight;
  }, [data.currentWeight, data.goalWeight]);

  const weeklyLossTarget = '0.5–1.0 kg/week';

  const updateToday = (patch) => {
    setData((prev) => ({
      ...prev,
      daily: {
        ...prev.daily,
        [date]: {
          ...todayState,
          ...patch,
        },
      },
    }));
  };

  const toggleHabit = (habitId) => {
    updateToday({
      habits: {
        ...todayState.habits,
        [habitId]: !todayState.habits?.[habitId],
      },
    });
  };

  const addWeighIn = () => {
    const weight = parseFloat(weightInput);
    if (!weight || weight < 40 || weight > 300) return;
    setData((prev) => ({
      ...prev,
      currentWeight: weight,
      weighIns: [
        { date, weight, note: 'Weekly check-in' },
        ...prev.weighIns.filter((w) => w.date !== date),
      ].sort((a, b) => (a.date < b.date ? 1 : -1)),
    }));
    setWeightInput('');
  };

  const addReminder = () => {
    if (!newReminderTitle.trim()) return;
    setData((prev) => ({
      ...prev,
      reminders: [
        ...prev.reminders,
        { id: `${Date.now()}`, title: newReminderTitle.trim(), time: newReminderTime },
      ],
    }));
    setNewReminderTitle('');
    setNewReminderTime('08:00');
  };

  const deleteReminder = (id) => {
    setData((prev) => ({
      ...prev,
      reminders: prev.reminders.filter((r) => r.id !== id),
    }));
  };

  const requestNotifications = async () => {
    if (!notificationsSupported) return;
    const result = await Notification.requestPermission();
    setNotificationPermission(result);
    if (result === 'granted') {
      new Notification('Fitness dashboard ready', {
        body: 'Open this dashboard daily to track your habits and weight.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-6">
      <div className="mx-auto max-w-md space-y-4">
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Emil Fitness Dashboard</p>
              <h1 className="text-2xl font-semibold tracking-tight">Healthy fat loss, steady pace</h1>
              <p className="mt-1 text-sm text-slate-600">Goal: lose weight safely while on tirzepatide</p>
            </div>
            <Badge className="rounded-full">Day plan</Badge>
          </div>
        </div>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>{completedCount} / {defaultHabits.length} done</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="space-y-3">
              {defaultHabits.map((habit) => (
                <label key={habit.id} className="flex items-center gap-3 rounded-2xl border bg-white p-3">
                  <Checkbox checked={!!todayState.habits?.[habit.id]} onCheckedChange={() => toggleHabit(habit.id)} />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                    {habitIcon(habit.id)}
                  </div>
                  <span className="text-sm font-medium leading-snug">{habit.label}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Step goal</p>
                <p className="mt-1 text-xl font-semibold">{getStepGoal().toLocaleString()}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Weekly target</p>
                <p className="mt-1 text-xl font-semibold">{weeklyLossTarget}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Log steps for today</p>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="e.g. 4200"
                  value={stepCount}
                  onChange={(e) => setStepCount(e.target.value)}
                />
                <Button
                  className="rounded-2xl"
                  onClick={() => {
                    updateToday({ steps: stepCount });
                    setStepCount('');
                  }}
                >
                  Save
                </Button>
              </div>
              {todayState.steps ? <p className="text-xs text-slate-500">Saved today: {todayState.steps} steps</p> : null}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="progress" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="workout">Workout</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4">
            <Card className="rounded-3xl shadow-sm">
              <CardContent className="space-y-4 p-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Current</p>
                    <p className="text-xl font-semibold">{data.currentWeight}kg</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Lost</p>
                    <p className="text-xl font-semibold">{lostKg}kg</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">To goal</p>
                    <p className="text-xl font-semibold">{remainingKg}kg</p>
                  </div>
                </div>

                <div className="rounded-2xl border p-3">
                  <p className="text-sm text-slate-500">Next milestone</p>
                  <p className="text-2xl font-semibold">{nextMilestone} kg</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Weekly weigh-in</p>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter weight"
                      value={weightInput}
                      onChange={(e) => setWeightInput(e.target.value)}
                    />
                    <Button className="rounded-2xl" onClick={addWeighIn}>
                      <Scale className="mr-2 h-4 w-4" /> Save
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Recent weigh-ins</p>
                  <div className="space-y-2">
                    {data.weighIns.slice(0, 6).map((entry) => (
                      <div key={`${entry.date}-${entry.weight}`} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm">
                        <div>
                          <p className="font-medium">{entry.weight} kg</p>
                          <p className="text-slate-500">{entry.date}</p>
                        </div>
                        <p className="text-slate-500">{entry.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workout" className="space-y-4">
            <Card className="rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Simple 3-day gym plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="rounded-2xl border p-3">
                  <p className="font-semibold">Workout A</p>
                  <p className="mt-2">Leg Press — 3×10</p>
                  <p>Chest Press — 3×10</p>
                  <p>Seated Row — 3×10</p>
                  <p>Plank — 3 sets</p>
                </div>
                <div className="rounded-2xl border p-3">
                  <p className="font-semibold">Workout B</p>
                  <p className="mt-2">Lat Pulldown — 3×10</p>
                  <p>Dumbbell Shoulder Press — 3×10</p>
                  <p>Goblet Squat — 3×10</p>
                  <p>Dead Bug Core — 3 sets</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-semibold">Suggested week</p>
                  <p className="mt-2">Mon — Workout A</p>
                  <p>Wed — Workout B</p>
                  <p>Fri — Workout A</p>
                  <p className="mt-2 text-slate-500">On non-gym days: walk and stretch.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            <Card className="rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Reminder hub</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                  This dashboard can help you organize reminders. For true daily push reminders on your phone, save this to your home screen and also set matching phone alarms or calendar reminders.
                </div>

                <div className="flex items-center justify-between rounded-2xl border p-3">
                  <div>
                    <p className="font-medium">Browser notifications</p>
                    <p className="text-sm text-slate-500">Status: {notificationsSupported ? notificationPermission : 'not supported'}</p>
                  </div>
                  <Button className="rounded-2xl" onClick={requestNotifications}>
                    <Bell className="mr-2 h-4 w-4" /> Enable
                  </Button>
                </div>

                <div className="space-y-2">
                  {data.reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm">
                      <div>
                        <p className="font-medium">{reminder.title}</p>
                        <p className="text-slate-500">{reminder.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteReminder(reminder.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 rounded-2xl border p-3">
                  <p className="text-sm font-medium">Add reminder</p>
                  <Input placeholder="Reminder title" value={newReminderTitle} onChange={(e) => setNewReminderTitle(e.target.value)} />
                  <Input type="time" value={newReminderTime} onChange={(e) => setNewReminderTime(e.target.value)} />
                  <Button className="w-full rounded-2xl" onClick={addReminder}>
                    <Plus className="mr-2 h-4 w-4" /> Add reminder
                  </Button>
                </div>

                <div className="rounded-2xl border p-3 text-sm">
                  <p className="font-medium">Weekly tirzepatide check</p>
                  <p className="mt-1 text-slate-500">Injection day: {data.injectionDay}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
