import { X, ShieldCheck, Lock, LogIn } from "lucide-react";

const REASSURANCES = [
  { icon: ShieldCheck, title: "Secure & Safe", body: "Your session will be securely closed." },
  { icon: Lock, title: "Your Data is Protected", body: "We keep your information safe and secure." },
  { icon: LogIn, title: "Login Anytime", body: "You can sign in again whenever you want." },
];

export default function LogoutModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/60 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-forest-50 flex items-center justify-center text-forest-700">
          <X size={20} />
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold text-forest-900">Ready to Logout?</h2>
          <p className="text-sm text-forest-900/50 mt-1">Are you sure you want to logout?</p>
        </div>

        <div className="space-y-2 text-left">
          {REASSURANCES.map((r) => (
            <div key={r.title} className="flex items-start gap-2 text-sm">
              <r.icon size={15} className="mt-0.5 text-sand-gold shrink-0" />
              <div>
                <p className="font-medium text-forest-900">{r.title}</p>
                <p className="text-forest-900/50 text-xs">{r.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 border border-forest-900/15 text-forest-900 rounded-full py-2 text-sm font-medium hover:bg-forest-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-forest-900 text-white rounded-full py-2 text-sm font-medium hover:bg-forest-800"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
