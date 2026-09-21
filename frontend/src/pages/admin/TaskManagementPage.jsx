const COLUMNS = ["Task ID", "Title", "Assignee", "Room no.", "Status", "Due Date"];

export default function TaskManagementPage() {
  return (
    <div className="px-6 py-6 space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Task Management</h1>
          <p className="text-sm text-navy-400 mt-1">View task detail and current progress</p>
        </div>
        <button
          disabled
          className="bg-navy-100 text-navy-400 rounded-lg px-4 py-2 text-sm font-medium cursor-not-allowed"
          title="Housekeeping/maintenance tasks aren't built on the backend yet"
        >
          + Create New Task
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-4 py-3">
        Task management has no backend yet — housekeeping/maintenance tasks are still planned (PRD Phase 2). This
        page shows the intended layout; it isn't wired to real data.
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-navy-400 border-b border-navy-100">
              {COLUMNS.map((c) => (
                <th key={c} className="py-3 px-4 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={COLUMNS.length} className="py-8 px-4 text-center text-navy-400">
                No tasks to show
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
