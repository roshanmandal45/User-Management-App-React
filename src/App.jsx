import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import Settings from "./components/Setting";

function App() {
  const activeClass = "text-blue-500 border-b-2 border-blue-500";
  const inactiveClass = "text-gray-700 dark:text-gray-300";

  return (
    <Router>
      <nav className="bg-white dark:bg-gray-900 shadow p-4 flex justify-center space-x-8 sticky top-0 z-50 transition-all ">
        <NavLink to="/" className={({isActive}) => isActive ? activeClass : inactiveClass}>Home</NavLink>
        <NavLink to="/users" className={({isActive}) => isActive ? activeClass : inactiveClass}>Users</NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? activeClass : inactiveClass}>Settings</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
