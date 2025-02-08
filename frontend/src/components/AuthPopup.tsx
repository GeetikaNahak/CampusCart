import React, { useState } from "react";
import { login, signup, signInWithGoogle } from "../firebase";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(username, email, password);
        alert("Signup Successful!");
      } else {
        await login(email, password);
        alert("Login Successful!");
      }
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Google Sign-in Successful!");
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>✖</button>
        <h2 className="text-xl font-semibold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <form onSubmit={handleAuth}>
          {isSignup && (
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
            alt="Google Icon"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="text-blue-600 underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPopup;
