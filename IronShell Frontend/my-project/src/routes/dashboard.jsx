import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AddCaloriesModal } from "../modals/AddCalories";
import { CheckInModal } from "../modals/chcekInModal";
import { TimeLog } from "../modals/TimeLogModal";
export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  // --- 1. STATE ---
  const [calories, setCalories] = useState([]);
  const [mainGoal, setMainGoal] = useState("BE FIT");
  const [schedule, setSchedule] = useState([
    { day: "MON", goal: "CHEST", achievements: "", completed: false },
    { day: "TUE", goal: "SHOULDER", achievements: "", completed: false },
    { day: "WED", goal: "LEGS", achievements: "", completed: false },
    { day: "THU", goal: "BICEPS", achievements: "", completed: false },
    { day: "FRI", goal: "ABS", achievements: "", completed: false },
    { day: "SAT", goal: "BACK", achievements: "", completed: false },
    { day: "SUN", goal: "REST", achievements: "", completed: false },
  ]);
  const [caloriesModal, setCaloriesModal] = useState(false);
  const [showcheckInModal, setCheckInModal] = useState(false);
  const [timeLogHistory, setTimeLogHistory] = useState(null);

  const typeOptions = [
    "REST",
    "CHEST & TRICEPS",
    "BACK & BICEPS",
    "ACTIVE RECOVERY",
    "LEGS & GLUTES",
    "SHOULDERS & CORE",
    "ENDURANCE CARDIO",
    "FULL REST",
  ];

  const API_BASE = "http://localhost:3000/api";

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  // --- 3. SYNC LOGIC ---
  useEffect(() => {
    const syncData = async () => {
      try {
        // Activity Pulse (GET /calories/pulse)
        const calRes = await fetch(`${API_BASE}/calories/pulse`, {
          headers: getHeaders(),
        });
        if (calRes.ok) {
          const data = await calRes.json();
          if (data.pulse)
            setCalories(
              data.pulse.map((p) => {
                return { calories: p.calories, date: p.date };
              }),
            );
        }

        // Global Status (GET /status)
        const statusRes = await fetch(`${API_BASE}/user/goal`, {
          headers: getHeaders(),
        });
        if (statusRes.ok) {
          const data = await statusRes.json();
          if (data.goal) setMainGoal(data.goal);
        }

        // Weekly Schedule (GET /schedule?day=...)
        const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        const scheduleResults = await Promise.all(
          days.map(async (d) => {
            const res = await fetch(`${API_BASE}/schedule?day=${d}`, {
              headers: getHeaders(),
            });
            if (res.ok) {
              const body = await res.json();
              return body.schedule;
            }
            return null;
          }),
        );

        setSchedule((prev) =>
          prev.map((dayObj) => {
            const match = scheduleResults.find(
              (s) => s && s.day === dayObj.day,
            );
            // alert(match.objective);

            if (match) {
              return {
                ...dayObj,
                // Match 'objective' from your controller
                goal: (match.objective || "REST").toUpperCase(),

                // Match 'tasks' from your controller (fallback to schedule_todos just in case)
                achievements: (match.tasks || [])
                  .map((t) => t.task_name)
                  .join("\n"),
              };
            }
            return dayObj;
          }),
        );
      } catch (err) {
        console.error("Dashboard Sync Failed:", err);
      }
    };

    syncData();
  }, []);

  // get image url

  // --- 4. ACTION HANDLERS ---

  // POST /calories
  // const addTodayCalories = async () => {
  //   setCaloriesModal(true);
  //   const amount = prompt("Enter calories burnt today:");
  //   if (amount && !isNaN(amount)) {
  //     const val = parseInt(amount);
  //     try {
  //       const res = await fetch(`${API_BASE}/calories`, {
  //         method: "POST",
  //         headers: getHeaders(),
  //         body: JSON.stringify({ calories: val }),
  //       });
  //       if (res.ok) {
  //         const updated = [...calories];
  //         updated[updated.length - 1] = val;
  //         setCalories(updated);
  //         setCaloriesModal(false);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };'

  const updateCalories = async () => {
    const calRes = await fetch(`${API_BASE}/calories/pulse`, {
      headers: getHeaders(),
    });
    if (calRes.ok) {
      const data = await calRes.json();
      if (data.pulse)
        setCalories(
          data.pulse.map((p) => {
            return { calories: p.calories, date: p.date };
          }),
        );
    }
  };

  // PATCH /user/goal
  const handleGoalUpdate = async (newGoal) => {
    setMainGoal(newGoal);
    try {
      await fetch(`${API_BASE}/user/goal`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ goal: newGoal }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // POST /objective
  const updateDayGoal = async (idx, newGoal) => {
    const updated = [...schedule];
    updated[idx].goal = newGoal;
    setSchedule(updated);
    try {
      await fetch(`${API_BASE}/objective`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ day: updated[idx].day, objective: newGoal }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // State only updates for achievements (Log)
  const updateAchievements = (idx, text) => {
    const updated = [...schedule];
    updated[idx].achievements = text;
    setSchedule(updated);
  };

  // POST /todo
  const saveTodo = async (idx) => {
    const item = schedule[idx];
    try {
      await fetch(`${API_BASE}/todo`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          day: item.day,
          task: item.achievements,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = (idx) => {
    const updated = [...schedule];
    updated[idx].completed = !updated[idx].completed;
    setSchedule(updated);
  };

  const maxCal =
    calories.length > 0
      ? Math.max(...calories.map((c) => c.calories), 100)
      : 100;

  async function checkInHandler() {
    try {
      const response = await fetch(`${API_BASE}/checkin`, {
        method: "POST",
        headers: getHeaders(),
      });
      if (!response.ok) {
        alert("Unable to CheckIn");
      }
      // alert("Thank you for checking In");
      setCheckInModal(true);
      setTimeout(() => {
        setCheckInModal(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  async function getHistoryHandler() {
    try {
      const response = await fetch(`${API_BASE}/history`, {
        method: "GET",
        headers: getHeaders(),
      });
      if (!response.ok) {
        alert("Unable to Find History");
        return;
      }
      const data = await response.json();
      const logString = data.history;
      // .map((entry, index) => {
      //   const date = new Date(entry.check_in_time).toLocaleString();
      //   return `[LOG ${index + 1}]: ${date}`;
      // })
      // .join("\n");
      setTimeLogHistory(logString);
      // alert(`SYSTEM HISTORY FOUND:\n\n${logString[1].check_in_time}`);
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalSubmit = async (val) => {
    try {
      const res = await fetch(`${API_BASE}/calories`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ calories: val }),
      });

      if (res.ok) {
        // const updated = [...calories];
        // updated[updated.length - 1] = val;
        // setCalories(updated);
        updateCalories();
        setCaloriesModal(false);
      }
    } catch (err) {
      console.error("Failed to add calories:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white p-6 md:p-10 flex flex-col gap-10">
      {caloriesModal && (
        <AddCaloriesModal
          onSubmit={handleModalSubmit}
          // onClose={() => setCaloriesModal(false)}
        />
      )}
      {showcheckInModal && <CheckInModal />}
      {timeLogHistory && (
        <TimeLog time={timeLogHistory} state={setTimeLogHistory} />
      )}
      <header className="border-l-4 border-green-300 pl-6 flex justify-between items-center">
        <div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none">
            IRON<span className="text-green-300 italic">DASH</span>
          </h1>
          <div className="text-xs mt-2 font-mono opacity-40 uppercase tracking-widest">
            SYSTEM_STATUS: ACTIVE
          </div>
        </div>

        {/* Button Group */}
        <div className="flex items-center gap-3">
          {/* HISTORY BUTTON */}
          <button
            onClick={getHistoryHandler} // Replace with your history logic
            className="p-2 border border-zinc-800 text-zinc-500 hover:border-green-300 hover:text-green-300 transition-all group"
            title="View History"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>

          {/* CHECK-IN BUTTON */}
          <button
            onClick={checkInHandler}
            className="group relative px-6 py-2 overflow-hidden bg-green-300 transition-all hover:pr-8 active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 bg-black skew-x-[-20deg] translate-x-12 group-hover:translate-x-0 transition-transform duration-300 opacity-10"></div>
            <span className="relative flex items-center gap-2 text-sm font-black italic tracking-tighter text-black uppercase cursor-pointer">
              Check-In
            </span>
          </button>
        </div>
      </header>

      {/* ANALYTICS */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 relative flex items-end h-72 border border-zinc-800 bg-zinc-900/10 gap-1 p-4 rounded-sm">
          <h3 className="absolute top-4 left-4 text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">
            Activity Pulse
          </h3>
          {calories.map((cal, i) => (
            <div
              key={i}
              style={{ height: `${(cal.calories / maxCal) * 100}%` }}
              title={`${cal.calories} kcal Date: ${cal.date}`}
              className="flex-1 bg-green-300/90 border border-black hover:bg-white transition-all duration-500"
            />
          ))}
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setCaloriesModal(true)}
            className="flex flex-col justify-center items-center border border-zinc-800 bg-zinc-900/40 hover:border-green-300 hover:text-green-300 transition-all p-6 rounded-lg group"
          >
            <span className="text-4xl font-light mb-2 opacity-50 group-hover:opacity-100">
              +
            </span>
            <span className="text-sm font-black tracking-widest uppercase">
              Add Daily Burn
            </span>
          </button>

          <div className="bg-zinc-900/20 border border-zinc-800 p-6 rounded-lg">
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Master Directive
            </h3>
            <select
              value={mainGoal}
              onChange={(e) => handleGoalUpdate(e.target.value)}
              className="w-full bg-transparent text-3xl font-black text-white outline-none cursor-pointer hover:text-green-300 italic"
            >
              <option className="bg-zinc-900" value="GAIN WEIGHT">
                GAIN MASS
              </option>
              <option className="bg-zinc-900" value="LOOSE WEIGHT">
                SHRED
              </option>
              <option className="bg-zinc-900" value="BE FIT">
                OPTIMIZE
              </option>
            </select>
            <div>
              <p className="text-zinc-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                neque, quod praesentium, sunt asperiores sit tempora
                reprehenderit dolorum aliquam in aut labore eos quo. Accusamus
                repellat quo non provident dicta?
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* WEEKLY SCHEDULE */}
      <section className="mt-4">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">
            Weekly Persistence Layer
          </h2>
          <div className="h-[1px] flex-1 bg-zinc-900"></div>
        </div>

        <div className="flex overflow-x-auto border border-zinc-800 bg-zinc-900/10 rounded-sm no-scrollbar">
          {schedule.map((item, idx) => (
            <div
              key={item.day}
              className="flex-1 min-w-[240px] border-r border-zinc-800 last:border-r-0 flex flex-col"
            >
              <div
                className={`p-5 border-b border-zinc-800 ${item.completed ? "bg-green-300/5" : ""}`}
              >
                <span className="text-[10px] font-bold text-zinc-600 mb-1 block">
                  0{idx + 1}
                </span>
                <h3
                  className={`text-2xl font-black italic tracking-tighter ${item.completed ? "text-green-300" : "text-zinc-300"}`}
                >
                  {item.day}
                </h3>
              </div>

              <div className="p-5 space-y-5 flex-1">
                <div>
                  <label className="text-[9px] font-black text-zinc-600 uppercase mb-2 block tracking-widest">
                    Objective
                  </label>
                  <select
                    className="w-full bg-black text-zinc-300 text-xs font-bold p-2 border border-zinc-800 focus:border-green-300 outline-none uppercase"
                    value={item.goal}
                    onChange={(e) => updateDayGoal(idx, e.target.value)}
                  >
                    {typeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black text-zinc-600 uppercase mb-2 block tracking-widest">
                    Data Log
                  </label>
                  <textarea
                    className="w-full h-32 bg-transparent text-sm text-zinc-400 placeholder:text-zinc-800 outline-none resize-none font-medium leading-relaxed"
                    placeholder="Log session metrics..."
                    value={item.achievements}
                    onChange={(e) => updateAchievements(idx, e.target.value)}
                    onBlur={() => saveTodo(idx)}
                  />
                </div>
              </div>

              <button
                onClick={() => toggleComplete(idx)}
                className={`w-full p-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-t border-zinc-800 ${
                  item.completed
                    ? "bg-green-300 text-black"
                    : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"
                }`}
              >
                {item.completed ? "✓ EXECUTED" : "COMMIT SESSION"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
