import { useLocation } from "react-router-dom";

export default function UserProfile() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] mt-10">
        <p className="text-center animate-pulse text-gray-700 dark:text-gray-300 mb-4">
          No user data available.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]
                    bg-gradient-to-t from-green-100 to-blue-100
                    dark:from-gray-800 dark:to-gray-900
                    transition-all p-6 rounded-lg mx-4 md:mx-20 mt-10">
      <img
        src={user.avatar}
        alt={user.first_name}
        className="w-32 h-32 rounded-full mb-4 animate-spin-slow"
      />
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        {user.first_name} {user.last_name}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">{user.email}</p>

      <button className="p-2 bg-blue-700 mt-10 text-white rounded-2xl text-shadow-2xs shadow active:scale-95">Add to friend</button>
    </div>
  );
}
