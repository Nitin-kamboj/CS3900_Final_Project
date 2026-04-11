import { useState } from "react";

export function AddPlan({ onClose, onPlanAdded }) {
  const [formData, setFormData] = useState({
    plan_name: "",
    price: "",
    duration: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // alert("Plan added successfully!");
        onPlanAdded();
        onClose(); 
      }
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-green-400 p-6 rounded-lg flex flex-col gap-4 w-96 text-green-400"
      >
        <h3 className="text-xl font-bold mb-2">ADD NEW PLAN</h3>

        <div className="flex flex-col">
          <label className="text-xs mb-1">PLAN NAME</label>
          <input
            name="plan_name"
            type="text"
            className="bg-zinc-800 border border-green-900 p-2 outline-none focus:border-green-400"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-1">PRICE</label>
          <input
            name="price"
            type="number"
            className="bg-zinc-800 border border-green-900 p-2 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-1">DURATION</label>
          <input
            name="duration"
            type="text"
            placeholder="e.g. 1 Month"
            className="bg-zinc-800 border border-green-900 p-2 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-1">DESCRIPTION</label>
          <textarea
            name="description"
            className="bg-zinc-800 border border-green-900 p-2 outline-none h-24"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="flex-1 bg-green-400 text-black font-bold py-2 hover:bg-green-300 transition-colors"
          >
            SAVE PLAN
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-red-500 text-red-500 font-bold py-2 hover:bg-red-500 hover:text-white transition-colors"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
