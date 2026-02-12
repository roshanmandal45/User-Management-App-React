import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [activeSection, setActiveSection] = useState("theme");

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 transition-all p-6">
      
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Account Settings
      </h1>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex gap-6">

        {/* LEFT SIDEBAR */}
        <div className="w-1/3 border-r dark:border-gray-700 space-y-4">
          <button onClick={() => setActiveSection("theme")} className="block w-full text-left hover:text-blue-500">
            🌙 Theme
          </button>
          <button onClick={() => setActiveSection("privacy")} className="block w-full text-left hover:text-blue-500">
            🔒 Privacy
          </button>
          <button onClick={() => setActiveSection("password")} className="block w-full text-left hover:text-blue-500">
            🔑 Change Password
          </button>
          <button onClick={() => setActiveSection("notifications")} className="block w-full text-left hover:text-blue-500">
            🔔 Notifications
          </button>
          <button className="block w-full text-left text-red-500 hover:text-red-600">
            🚪 Logout
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-2/3">
          {activeSection === "theme" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Theme</h2>
              <p className="mb-4 dark:text-gray-300">Current Theme: {theme}</p>
              <button
                onClick={toggleTheme}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 text-white rounded-lg"
              >
                Toggle Theme
              </button>
            </div>
          )}

          {activeSection === "privacy" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Privacy</h2>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="dark:text-gray-300">Private Account</span>
              </label>
            </div>
          )}

          {activeSection === "password" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Change Password</h2>
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 mb-3 border rounded-lg"
              />
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                Update Password
              </button>
            </div>
          )}

          {activeSection === "notifications" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Notifications</h2>
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" />
                <span className="dark:text-gray-300">Email Notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="dark:text-gray-300">Push Notifications</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
