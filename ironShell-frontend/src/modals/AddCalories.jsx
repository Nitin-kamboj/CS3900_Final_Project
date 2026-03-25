export function AddCaloriesModal({ onSubmit }) {
  // const [todayCalories, setTodayCalories] = useState();
  async function addCalories(e) {
    e.preventDefault();
    const calories = e.target.calories.value;
    // setTodayCalories(calories);
    if (calories) {
      onSubmit(parseInt(calories));
    }
  }
  return (
    // Backdrop overlay
    <form action="" onSubmit={addCalories}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        {/* Modal Container */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col gap-4 text-center shadow-xl">
          <label className="text-green-300 text-lg font-medium">
            Enter the number of Calories
          </label>

          <input
            type="number"
            name="calories"
            placeholder="0"
            className="bg-zinc-800 border border-zinc-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-center"
          />

          <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg mt-2 transition-colors">
            ADD CALORIES
          </button>
        </div>
      </div>
    </form>
  );
}
