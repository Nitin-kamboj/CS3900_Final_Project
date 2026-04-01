import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

export function Plans() {
  // const stripe = loadStripe(
  //   "pk_test_51T6ZcUR0TqN6HqHTZheHFh79KPx9vTQTssohTmI8LMeaAKXvZo4rNWzAOO0KMaGXiqHP6fhzulqbawknhQBEGspx00mRRNRqCP",
  // );
  console.log("jvhbkjml123");
  async function checkoutPage(plan_name, price) {
    console.log(price, plan_name);

    try {
      const res = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: plan_name, price }),
      });

      if (res.ok) {
        const data = await res.json();

        // REDIRECT MANUALLY
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error("No URL found in response");
        }
      } else {
        console.error("Backend failed to create session");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  // plans must have [name, duration, price, description steps[]}
  const [plans, setPlans] = useState([]);
  async function fetchData() {
    console.log("svdhf");
    try {
      const response = await fetch("http://localhost:3000/api/plans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      console.log("jvhbkjml");
      console.log(data);
      setPlans(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="bg-black py-24 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white uppercase">
            WAYS TO{" "}
            <span className="text-green-300 underline decoration-8 underline-offset-[12px]">
              JOIN US
            </span>
          </h2>
          <p className="text-zinc-500 mt-8 font-black tracking-[0.2em] uppercase text-sm">
            Choose your level of commitment
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {plans.map((plan) => {
            return (
              <div
                key={plan.plan_id || plan.id}
                className="group p-8 bg-zinc-900/50 border border-zinc-800 hover:border-green-300 transition-all duration-500 rounded-sm md:skew-x-[-3deg]"
              >
                <div className="md:skew-x-[3deg]">
                  <h2 className="text-2xl font-black text-white italic uppercase">
                    {/* Monthly */}
                    {plan.plan_name}
                  </h2>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-6xl font-black text-green-300">
                      ${plan.price}
                      {/* $49 */}
                    </span>
                    <span className="text-zinc-500 ml-2 font-bold uppercase text-xs">
                      {/* / Month */}
                      {plan.duration === 30
                        ? "/ Month"
                        : `/ ${Math.floor(plan.duration / 30)} Months`}
                    </span>
                  </div>
                  <ul className="mt-10 space-y-5 text-zinc-400 font-bold uppercase text-sm">
                    {/* Check if description is a string and split it, or if it's already an array */}
                    {(plan.description.split(",") || []).map((step, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="text-green-300 text-xl">✔</span>
                        {step.trim()}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => checkoutPage(plan.plan_name, plan.price)}
                    className="w-full mt-12 py-4 bg-zinc-800 text-white font-black uppercase tracking-widest hover:bg-green-300 hover:text-black transition-all"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
