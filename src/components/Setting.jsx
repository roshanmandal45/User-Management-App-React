import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-t from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 transition-all p-4 rounded-lg min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white animate-bounce">Settings</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Current Theme: <span className="font-semibold">{theme}</span></p>
      <button
        onClick={toggleTheme}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-all animate-pulse cursor-pointer active:scale-90"
      >
        Change Theme
      </button>
    </div>
  );
}
