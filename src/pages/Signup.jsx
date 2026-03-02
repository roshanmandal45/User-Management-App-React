import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      login({
        name: user.displayName || user.email.split("@")[0],
        photo: user.photoURL || null,
        uid: user.uid,
        email: user.email
      });

      // update UI inline: hide the signup form and show a small profile preview + welcome
      try {
        const displayName = user.displayName || (user.email ? user.email.split("@")[0] : "User");
        const container = document.querySelector(".max-w-md");
        if (container) {
          const formEl = container.querySelector("form");
          if (formEl) formEl.classList.add("hidden");

          const header = container.querySelector("h2");
          if (header) header.textContent = `Welcome, ${displayName}!`;

          // remove previous preview if any
          const existing = container.querySelector(".user-profile-preview");
          if (existing) existing.remove();

          const profile = document.createElement("div");
          profile.className = "user-profile-preview mt-4 flex items-center space-x-4 p-4 bg-green-50 rounded";

          if (user.photoURL) {
        const img = document.createElement("img");
        img.src = user.photoURL;
        img.alt = displayName;
        img.className = "w-12 h-12 rounded-full";
        profile.appendChild(img);
          } else {
        const placeholder = document.createElement("div");
        placeholder.className = "w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold";
        placeholder.textContent = displayName.charAt(0).toUpperCase();
        profile.appendChild(placeholder);
          }

          const info = document.createElement("div");
          info.innerHTML = `<div class="font-semibold">${displayName}</div><div class="text-sm text-gray-500">${user.email || user.phoneNumber || ""}</div>`;
          profile.appendChild(info);

          // insert profile under the heading
          if (header && header.parentNode) header.parentNode.insertBefore(profile, header.nextSibling);
        }
      } catch (e) {
        // non-fatal UI update error; keep signup flow working
        console.error("UI update error:", e);
      }
      alert("Signup successful");
      // show a temporary success banner before navigating
      const container = document.querySelector('.max-w-md');
      if (container) {
        const banner = document.createElement('div');
        banner.textContent = 'Signup successful! Redirecting...';
        banner.className = 'mb-4 p-3 rounded text-white bg-green-600 text-center';
        container.prepend(banner);
        setTimeout(() => {
          banner.remove();
          navigate("/");
        }, 1400);
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  const sendOTP = async () => {
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );

      setConfirmationResult(result);
      alert("OTP sent");
    } catch (error) {
      alert(error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      login({
        name: user.displayName || user.phoneNumber,
        photo: user.photoURL || null,
        uid: user.uid,
        email: null
      });
      alert("Phone signup successful");
      navigate("/");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      login({
        name: user.displayName || user.email.split("@")[0],
        photo: user.photoURL || null,
        uid: user.uid,
        email: user.email
      });
      alert("Google signup successful");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSignup(e);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border outline-0 p-3 rounded"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border outline-0  p-3 rounded"
            />
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded">
            Sign Up
          </button>
        </form>

       
        <div className="mt-6 space-y-3">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="+97798XXXXXXXX"
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border outline-0  p-3 rounded"
          />

          <button
            onClick={sendOTP}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Send OTP
          </button>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border outline-0  p-3 rounded"
              />
              <button
                onClick={verifyOTP}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>

        <div className="my-4 text-center text-gray-400">OR</div>

        
        <button
          onClick={handleGoogleSignup}
          className="w-full border  outline-0 py-3 rounded"
        >
          Continue with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600">
            Login
          </Link>
        </p>

        
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Signup;


