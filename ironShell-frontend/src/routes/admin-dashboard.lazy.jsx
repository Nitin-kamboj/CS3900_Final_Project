import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState, Fragment } from "react";
import { Pencil, Plus, ShieldCheck, Lock } from "lucide-react";
import { AddPlan } from "../modals/AddNewPlan";

export const Route = createLazyFileRoute("/admin-dashboard")({
  component: () => {
    const [plans, setPlans] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [addPlan, setAddPlan] = useState(false);

    async function fetchPlans() {
      try {
        const response = await fetch("http://localhost:3000/api/plans", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      fetchPlans();
    }, []);

    const metaData = ["PLAN NAME", "PRICE ($)", "DURATION", "DESCRIPTION"];

    async function editPlan(id, type, value) {
      try {
        const response = await fetch(`http://localhost:3000/api/plan/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ [type]: value }),
        });
        if (response.ok) console.log("Changes saved");
      } catch (error) {
        console.error(error);
      }
    }

    const handleOnChange = (id, value, field) => {
      setPlans((prev) =>
        prev.map((p) => (p.plan_id === id ? { ...p, [field]: value } : p)),
      );
    };

    return (
      <div className="min-h-screen bg-black text-zinc-100 p-8 font-mono">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto flex items-center justify-between mb-10 border-b border-green-900/50 pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tighter text-green-400">
              SYSTEM_PLANS
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setDisabled(!disabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded border transition-all ${
                disabled
                  ? "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                  : "border-green-400 text-green-400 bg-green-400/10 shadow-[0_0_15px_rgba(74,222,128,0.2)]"
              }`}
            >
              {disabled ? <Lock size={16} /> : <ShieldCheck size={16} />}
              {disabled ? "ENABLE EDITING" : "EDITING ACTIVE"}
            </button>

            <button
              onClick={() => setAddPlan(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors"
            >
              <Plus size={18} />
              NEW PLAN
            </button>
          </div>
        </div>

        {/* Modal Overlay */}
        {addPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <AddPlan
              onClose={() => setAddPlan(false)}
              onPlanAdded={fetchPlans}
            />
          </div>
        )}

        {/* Table Grid */}
        <div className="max-w-6xl mx-auto overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
          <div className="grid grid-cols-4 bg-zinc-800/80">
            {metaData.map((name) => (
              <div
                key={name}
                className="p-4 text-xs font-black text-zinc-500 tracking-widest border-b border-zinc-700"
              >
                {name}
              </div>
            ))}
          </div>

          <div className="divide-y divide-zinc-800">
            {plans.map((plan) => (
              <div
                key={plan.plan_id}
                className="grid grid-cols-4 group hover:bg-white/[0.02] transition-colors"
              >
                {[
                  { field: "plan_name", val: plan.plan_name },
                  { field: "price", val: plan.price },
                  { field: "duration", val: plan.duration },
                  { field: "description", val: plan.description },
                ].map((item) => (
                  <div
                    key={item.field}
                    className="p-1 border-r border-zinc-800/50 last:border-r-0"
                  >
                    <input
                      type="text"
                      value={item.val}
                      disabled={disabled}
                      onChange={(e) =>
                        handleOnChange(plan.plan_id, e.target.value, item.field)
                      }
                      onBlur={(e) =>
                        editPlan(plan.plan_id, item.field, e.target.value)
                      }
                      className={`w-full bg-transparent p-3 outline-none transition-all ${
                        disabled
                          ? "text-zinc-400 cursor-not-allowed"
                          : "text-green-400 focus:bg-green-400/5 focus:ring-1 focus:ring-green-400/30 rounded"
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
