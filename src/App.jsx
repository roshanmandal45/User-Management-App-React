import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./components/Home";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import Settings from "./components/Setting";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Messages from "./pages/Messages";
import Footer from "./components/Footer";

function Navbar() {
  const activeClass = "text-blue-500 border-b-2 border-blue-500";
  const inactiveClass = "text-gray-700 dark:text-gray-300";

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center sticky top-0 z-50 transition-all px-20">
      <div>
        {/* Logo or Brand could go here */}
      </div>
      <div className="flex space-x-8">
        <NavLink to="/" className={({isActive}) => isActive ? activeClass : inactiveClass}>Home</NavLink>
        <NavLink to="/users" className={({isActive}) => isActive ? activeClass : inactiveClass}>Users</NavLink>
        {user && (
          <NavLink to="/messages" className={({isActive}) => isActive ? activeClass : inactiveClass}>Messages</NavLink>
        )}
        <NavLink to="/settings" className={({isActive}) => isActive ? activeClass : inactiveClass}>Settings</NavLink>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Profile Image */}
            <img
              src={user.photo || "https://ui-avatars.com/api/?name=" + user.name + "&background=random"}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            {/* Name */}
            <span className="text-sm font-medium dark:text-gray-200">{user.name}</span>
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
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
             <Route path="/messages" element={<Messages />} />
          </Route>

        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
