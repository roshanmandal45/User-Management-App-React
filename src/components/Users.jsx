import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../API/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchUsers();
        if (!mounted) return;
        const enhanced = data.map((u) => ({
          ...u,
          // provide a pleasant fallback avatar based on initials when missing
          avatar:
            u.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              `${u.first_name} ${u.last_name}`
            )}&background=0D8ABC&color=fff&size=128`,
        }));
        setUsers(enhanced);
      } catch (err) {
        console.error("Error fetching users:", err);
        if (mounted) setUsers([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.length === 0 ? (
        <p className="text-center col-span-full text-gray-700 dark:text-gray-300 animate-pulse">
          Loading users...
        </p>
      ) : (
        users.map((user) => (
          <Link
            key={user.id}
            to={`/user/${user.id}`}
            state={{ user }} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:scale-105 transition-transform duration-300 flex flex-col items-center"
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-24 h-24 rounded-full mb-3"
            />
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {user.email}
            </p>
          </Link>
        ))
      )}
    </div>
  );
}
