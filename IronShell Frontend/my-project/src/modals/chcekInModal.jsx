export function CheckInModal() {
  return (
    // Added flex, justify-center, and adjusted opacity/z-index
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-8 text-white shadow-2xl">
        <p className="text-lg font-medium">Thank you for Checking in...</p>
      </div>
    </div>
  );
}
