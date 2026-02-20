// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const root = document.querySelector('.min-h-screen');
    if (!root) return;

    // Make page background a stronger blue gradient
    root.style.background = 'linear-gradient(90deg, #0ea5ff 0%, #0369a1 100%)';

    // Tweak the card to a bluish card with white text
    const card = root.querySelector('.max-w-md');
    if (card) {
      card.style.background = '#0f172a'; // dark blue-gray
      card.style.color = '#e6f7ff'; // pale blue text
      card.style.boxShadow = '0 10px 30px rgba(2, 48, 71, 0.4)';
      card.style.borderRadius = '1rem';
      card.style.padding = '2rem';
    }

    // Style primary submit button to vivid blue
    const submit = root.querySelector('button[type="submit"]');
    if (submit) {
      submit.style.background = '#0066ff';
      submit.style.color = '#ffffff';
      submit.style.border = 'none';
      submit.style.boxShadow = '0 6px 18px rgba(0,102,255,0.25)';
    }

    // Style Google button to match blue theme (light background + blue border)
    let googleBtn = Array.from(root.querySelectorAll('button')).find(b =>
      /google/i.test(b.textContent || '')
    );
    if (googleBtn) {
      googleBtn.style.background = '#eaf4ff';
      googleBtn.style.border = '1px solid #88c0ff';
      googleBtn.style.color = '#003a63';
    }

    // Cleanup on unmount
    return () => {
      if (root) {
        root.style.background = '';
        if (card) {
          card.style.background = '';
          card.style.color = '';
          card.style.boxShadow = '';
          card.style.borderRadius = '';
          card.style.padding = '';
        }
        if (submit) {
          submit.style.background = '';
          submit.style.color = '';
          submit.style.border = '';
          submit.style.boxShadow = '';
        }
        if (googleBtn) {
          googleBtn.style.background = '';
          googleBtn.style.border = '';
          googleBtn.style.color = '';
        }
      }
    };
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      login({
          name: user.displayName || user.email.split("@")[0],
          photo: user.photoURL || null,
          uid: user.uid,
          email: user.email
      });

      alert("Login successful ✅");
      navigate("/"); // go home
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      login({
          name: user.displayName || user.email.split("@")[0],
          photo: user.photoURL || null,
          uid: user.uid,
          email: user.email
      });

      alert("Google login successful ✅");
      navigate("/"); // go home
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400 font-medium">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://imgs.search.brave.com/jkbMhUzFlfiqzmU4cnbqA5ScYzzLfJqTT1pJXORG2CM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzUv/NzQ2LzA1Ni9zbWFs/bC9nb29nbGUtYXBw/LWxvZ28taW4tYmln/LXN1ci1zdHlsZS0z/ZC1yZW5kZXItaWNv/bi1kZXNpZ24tY29u/Y2VwdC1lbGVtZW50/LWlzb2xhdGVkLXRy/YW5zcGFyZW50LWJh/Y2tncm91bmQtZnJl/ZS1wbmcucG5n"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
