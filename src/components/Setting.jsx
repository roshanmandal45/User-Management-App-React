import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [active, setActive] = useState("profile");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 
    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-all">

      <div className="max-w-6xl mx-auto bg-white/70 dark:bg-gray-800/70 
      backdrop-blur-xl rounded-2xl shadow-2xl p-6 grid md:grid-cols-4 gap-6">

        {/* Sidebar */}
        <div className="space-y-3 md:col-span-1">
          {[
            "profile",
            "privacy",
            "password",
            "notifications",
            "theme"
          ].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-4 py-3 rounded-xl capitalize transition-all duration-300 
              ${
                active === item
                  ? "bg-blue-500 text-white shadow-lg"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {item}
            </button>
          ))}

          <button className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-all">
            logout
          </button>
        </div>

        {/* Content */}
        <div className="md:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-inner transition-all">

          {/* Profile Section */}
          {active === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold dark:text-white">Profile Information</h2>

              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  R
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:scale-105 transition">
                  Change Avatar
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
                />
              </div>

              <textarea
                placeholder="Bio..."
                className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
              />

              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition">
                Save Changes
              </button>
            </div>
          )}

          {/* Privacy Section */}
          {active === "privacy" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold dark:text-white">Privacy Settings</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Control who can see your profile and activity. Changes apply immediately.
              </p>

              <div className="grid gap-4">
                {["Private Account", "Show Activity Status", "Allow Tagging"].map((item) => (
                  <div
                    key={item}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl"
                  >
                    <div>
                      <div className="font-medium dark:text-white">{item}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item === "Private Account"
                          ? "Only approved followers can see your posts."
                          : item === "Show Activity Status"
                          ? "Allow others to see when you're active."
                          : "Allow others to tag you in posts and photos."}
                      </div>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                <h3 className="font-medium dark:text-white">Blocked Users</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage users you've blocked. Blocked users cannot see your profile or interact with you.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">No blocked users</span>
                  <button className="ml-auto px-3 py-1 bg-blue-500 text-white rounded-md hover:opacity-90">
                    Manage Blocked
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Password Section */}
          {active === "password" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Change Password</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use a strong password you haven't used elsewhere. Consider using a passphrase.
              </p>

              <div className="grid gap-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full p-3 rounded-lg border border-red-200 dark:border-red-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 rounded-lg border border-red-200 dark:border-red-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full p-3 rounded-lg border border-red-200 dark:border-red-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700"
                />

                {/* Static password strength indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-white">Password strength</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Weak</span>
                  </div>
                  <div className="w-full bg-red-100 dark:bg-red-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-red-500 h-2 w-1/3" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg hover:scale-105 transition">
                  Update Password
                </button>
                <button className="text-sm text-blue-500 hover:underline">Forgot password?</button>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deleting your account is permanent. All data will be removed. If you're sure, type DELETE and confirm.
                </p>

                <div className="mt-3 flex flex-col md:flex-row items-start md:items-center gap-3">
                  <input
                    placeholder="Type DELETE to confirm"
                    className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white w-full md:w-1/2"
                  />
                  <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:opacity-90">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
          {active === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold dark:text-white">Notifications</h2>

              {[
                "Email Notifications",
                "Push Notifications",
                "Marketing Emails",
              ].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl"
                >
                  <span className="dark:text-white">{item}</span>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              ))}
            </div>
          )}

          {/* Theme Section */}
          {active === "theme" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold dark:text-white">Theme Settings</h2>

              <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
                <span className="dark:text-white">Current Theme: {theme}</span>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:scale-105 transition"
                >
                  Toggle Theme
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
