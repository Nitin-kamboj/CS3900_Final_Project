import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";

export const Route = createLazyFileRoute("/admin-dashboard")({
  component: () => {
    const [plans, setPlans] = useState([]);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
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
          console.log(error);
        }
      }
      fetchPlans();
    }, []);
    const metaData = ["PLAN NAME", "PRICE", "DURATION", "DESCRIPTION"];

    async function editPlan(id, type, value) {
      try {
        const field = type;
        // alert("in");
        const response = await fetch(`http://localhost:3000/api/plan/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ [field]: value }),
        });
        if (response.ok) {
          console.log("Successfully edited plan");
        }
        console.log("Error while editing the plan");
      } catch (error) {
        console.log(error);
      }
    }

    const handleOnChange = (id, value, field) => {
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          // If this is the plan we are editing, update the specific field
          plan.plan_id === id ? { ...plan, [field]: value } : plan,
        ),
      );
    };
    return (
      <>
        <div className="text-green-400 flex justify-center gap-5">
          <h2>PLANS</h2>
          <span
            title={disabled ? "Enable Editing" : "Lock Editing"}
            className="inline-flex items-center justify-center"
          >
            <Pencil
              className="text-green-400 cursor-pointer hover:text-white transition-colors"
              onClick={() => setDisabled(!disabled)}
            />
          </span>

          <Plus className="text-green-400 cursor-pointer hover:text-white transition-colors" />
        </div>
        <div className="text-green-400 flex justify-center">
          {/*plan_id, plan_name, price, duration, description */}

          <div className="grid grid-cols-4 gap-0.5 w-fit border border-green-400 bg-zinc-900">
            {metaData.map((name) => (
              <div className="border">{name}</div>
            ))}
            {plans.map((plan) => {
              return (
                <>
                  <div className="border ">
                    <input
                      type="text"
                      value={plan.plan_name}
                      disabled={disabled}
                      onChange={(e) =>
                        handleOnChange(
                          plan.plan_id,
                          e.target.value,
                          "plan_name",
                        )
                      }
                      onBlur={(e) =>
                        editPlan(plan.plan_id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="border">
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) =>
                        handleOnChange(plan.plan_id, e.target.value, "price")
                      }
                      onBlur={(e) =>
                        editPlan(plan.plan_id, "price", e.target.value)
                      }
                    />
                  </div>
                  <div className="border">
                    <input
                      type="text"
                      value={plan.duration}
                      onChange={(e) =>
                        handleOnChange(plan.plan_id, e.target.value, "duration")
                      }
                      onBlur={(e) =>
                        editPlan(plan.plan_id, "duration", e.target.value)
                      }
                    />
                  </div>
                  <div className="border">
                    <input
                      type="text"
                      name="description"
                      id=""
                      value={plan.description}
                      onChange={(e) =>
                        handleOnChange(
                          plan.plan_id,
                          e.target.value,
                          "description",
                        )
                      }
                      onBlur={(e) =>
                        editPlan(plan.plan_id, "description", e.target.value)
                      }
                    />
                    {/* <Pencil onClick={() => editPlan(plan.plan_id)} /> */}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  },
});
