import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful");
      navigate("/");
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
      await confirmationResult.confirm(otp);
      alert("Phone signup successful");
      navigate("/");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google signup successful");
      navigate("/");
    } catch (error) {
      alert(error.message);
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


