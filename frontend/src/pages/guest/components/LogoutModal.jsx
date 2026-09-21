const REASSURANCES = [
  { title: "Secure & Safe", body: "Your session will be securely closed." },
  { title: "Your Data is Protected", body: "We keep your information safe and secure." },
  { title: "Login Anytime", body: "You can sign in again whenever you want." },
];

export default function LogoutModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 text-xl">
          ×
        </div>
        <div>
          <h2 className="text-lg font-semibold text-navy-900">Ready to Logout?</h2>
          <p className="text-sm text-navy-500 mt-1">
            Are you sure you want to logout from Hotel Management System?
          </p>
        </div>

        <div className="space-y-2 text-left">
          {REASSURANCES.map((r) => (
            <div key={r.title} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-bronze-500">✓</span>
              <div>
                <p className="font-medium text-navy-800">{r.title}</p>
                <p className="text-navy-500 text-xs">{r.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 border border-navy-100 text-navy-700 rounded-lg py-2 text-sm font-medium hover:bg-navy-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-navy-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-navy-900"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
