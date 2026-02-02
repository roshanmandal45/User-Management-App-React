import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Home from "./components/Home";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import Settings from "./components/Setting";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Navbar() {
  const activeClass = "text-blue-500 border-b-2 border-blue-500";
  const inactiveClass = "text-gray-700 dark:text-gray-300";

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Read cookie when navbar mounts
  useEffect(() => {
    const cookieUser = Cookies.get("user");
    setUser(cookieUser ? JSON.parse(cookieUser) : null);
  }, []);

  const handleLogout = () => {
    Cookies.remove("user"); // remove cookie
    setUser(null);          // remove profile from navbar
    navigate("/login");     // redirect to login page
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center sticky top-0 z-50 transition-all px-20">
      <div>

      </div>
      <div className="flex space-x-8">
        <NavLink to="/" className={({isActive}) => isActive ? activeClass : inactiveClass}>Home</NavLink>
        <NavLink to="/users" className={({isActive}) => isActive ? activeClass : inactiveClass}>Users</NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? activeClass : inactiveClass}>Settings</NavLink>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Profile Image */}
            <img
              src={"https://imgs.search.brave.com/DK4q7NY_WKrop9ptJygsAxMuao3IvjBww-i2e9Ld8WU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzk0LzA0Lzcy/LzM2MF9GXzEwOTQw/NDcyOTNfeWZEWU45/am5LVTFOUXdTV2Vs/WkxVdkpZTFZKWGdW/eVcuanBn"}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            {/* Name */}
            <span className="text-sm font-medium">{user.name}</span>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium px-2 py-1 border rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({isActive}) => isActive ? activeClass : inactiveClass}>Login</NavLink>
            <NavLink to="/signup" className={({isActive}) => isActive ? activeClass : inactiveClass}>Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
