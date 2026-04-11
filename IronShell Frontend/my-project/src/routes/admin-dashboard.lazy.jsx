import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState} from "react";
import { Pencil, Plus, ShieldCheck, Lock, Trash2 } from "lucide-react"; // Import Trash2 from lucide
import { AddPlan } from "../modals/AddNewPlan";

export const Route = createLazyFileRoute("/admin-dashboard")({
  component: () => {
    const [plans, setPlans] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [addPlan, setAddPlan] = useState(false);
    const [revenue, setRevenue] = useState();

    // get revenue
    useEffect(() => {
      async function getRevenue() {
        try {
          const response = await fetch("http://localhost:3000/api/revenue", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            const totalValue = data.total?.total_revenue || 0;
            setRevenue(totalValue);
          }
        } catch (error) {
          console.error(error);
        }
      }
      getRevenue();
    }, []);

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

    // Delete plan Function
    async function deletePlan(id) {
      // if (!window.confirm("Are you sure you want to delete this plan?")) return;

      try {
        const response = await fetch(
          `http://localhost:3000/api/deletePlan/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.ok) {
          // Remove from local state immediately
          setPlans((prev) => prev.filter((p) => p.plan_id !== id));
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }

    useEffect(() => {
      fetchPlans();
    }, []);

    // 1. Added "ACTIONS" to metadata
    const metaData = [
      "PLAN NAME",
      "PRICE ($)",
      "DURATION",
      "DESCRIPTION",
      "ACTIONS",
    ];

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
        <div className="max-w-6xl mx-auto flex items-center justify-between mb-10 border-b border-green-900/50 pb-6">
          <h2 className="text-2xl font-bold tracking-tighter text-green-400">
            SYSTEM_PLANS
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setDisabled(!disabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded border transition-all ${
                disabled
                  ? "border-zinc-700 text-zinc-400"
                  : "border-green-400 text-green-400 bg-green-400/10"
              }`}
            >
              {disabled ? <Lock size={16} /> : <ShieldCheck size={16} />}
              {disabled ? "ENABLE EDITING" : "EDITING ACTIVE"}
            </button>
            <button
              onClick={() => setAddPlan(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400"
            >
              <Plus size={18} /> NEW PLAN
            </button>
          </div>
        </div>

        {addPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <AddPlan
              onClose={() => setAddPlan(false)}
              onPlanAdded={fetchPlans}
            />
          </div>
        )}

        <div className="max-w-6xl mx-auto overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
          {/* 2. Updated to grid-cols-5 */}
          <div className="grid grid-cols-5 bg-zinc-800/80">
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
              /* 3. Updated to grid-cols-5 */
              <div
                key={plan.plan_id}
                className="grid grid-cols-5 group hover:bg-white/[0.02] transition-colors"
              >
                {[
                  { field: "plan_name", val: plan.plan_name },
                  { field: "price", val: plan.price },
                  { field: "duration", val: plan.duration },
                  { field: "description", val: plan.description },
                ].map((item) => (
                  <div
                    key={item.field}
                    className="p-1 border-r border-zinc-800/50"
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
                          : "text-green-400 focus:bg-green-400/5 rounded"
                      }`}
                    />
                  </div>
                ))}

                <div className="flex items-center justify-center p-2">
                  <button
                    onClick={() => deletePlan(plan.plan_id)}
                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                    title="Delete Plan"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Revenue */}
        <div className="mt-6 max-w-6xl mx-auto flex items-center justify-between mb-10 border-b border-green-900/50 pb-6">
          <h2 className="text-2xl font-bold tracking-tighter text-green-400">
            TOTAL REVENUE
          </h2>
          <div className="">{revenue}</div>
        </div>
      </div>
    );
  },
});
