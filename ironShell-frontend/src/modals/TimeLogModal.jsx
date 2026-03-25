export function TimeLog({ time, state }) {
  const data = time || [];
  const sortedTimes = [...data].sort(
    (a, b) => new Date(a.check_in_time) - new Date(b.check_in_time),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md max-h-[80vh] flex flex-col rounded-xl bg-zinc-900 p-6 text-white shadow-xl border border-zinc-800">
        <h2 className="mb-4 text-center font-bold tracking-tight text-zinc-400 shrink-0">
          TIME LOG HISTORY
        </h2>

        <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-6 custom-scrollbar">
          {sortedTimes.map((t, index) => (
            <div
              key={index}
              className="flex justify-between rounded-lg bg-zinc-800/50 p-3 border border-zinc-700/50"
            >
              <span className="text-zinc-500 text-sm font-mono">
                Entry #{index + 1}
              </span>
              <span className="font-semibold">
                {t.check_in_time || "No Time Recorded"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => state(null)}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-bold shrink-0"
        >
          OK
        </button>
      </div>
    </div>
  );
}
