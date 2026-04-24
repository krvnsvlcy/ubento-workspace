import { Modal } from "@/components/modal";
import { Bell, Mail, Shield, User } from "lucide-react";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export function UserSettingsModal({
  isOpen,
  onClose,
  user,
}: UserSettingsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Settings">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
        {/* Sidebar/Profile Section */}
        <div className="col-span-1 space-y-6">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-background-200 border border-background-400/50">
            <div className="h-20 w-20 rounded-full bg-background-400 flex items-center justify-center overflow-hidden mb-4 ring-2 ring-primary-500/20">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-foreground-300" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {user?.name || "User Name"}
            </h3>
            <p className="text-sm text-foreground-300">
              {user?.email || "user@example.com"}
            </p>
          </div>

          <nav className="space-y-1">
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Mail, label: "Email" },
              { icon: Shield, label: "Security" },
              { icon: Bell, label: "Notifications" },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  item.active
                    ? "bg-foreground text-background"
                    : "text-foreground-300 hover:bg-background-200 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Section */}
        <div className="col-span-2 space-y-8">
          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-400">
              Account Information
            </h4>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground-200">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-4 py-2.5 rounded-xl bg-background-200 border border-background-400/50 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground-200">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl bg-background-300/50 border border-background-400/50 text-foreground-400 cursor-not-allowed"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-background-400/30">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-400">
              Preferences
            </h4>
            <div className="flex items-center justify-between p-4 rounded-xl bg-background-200 border border-background-400/50">
              <div>
                <p className="font-medium text-foreground">Marketing Emails</p>
                <p className="text-xs text-foreground-300">
                  Receive updates about new features and offers.
                </p>
              </div>
              <div className="h-6 w-11 rounded-full bg-background-400 relative cursor-pointer transition-colors hover:bg-background-500">
                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button className="px-6 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
