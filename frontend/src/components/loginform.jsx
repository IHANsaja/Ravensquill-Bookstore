import React, { useState, useEffect, useContext } from "react";
import { toast, Toaster } from "sonner";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();
  const { setIsLoggedIn, getUserData, backendUrl } = useContext(AppContent);

  // Remember Me functionality
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast("Please fill in all fields", { variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        setIsLoggedIn(true);
        getUserData();
        toast("Login successful");
        navigate("/");
      } else {
        toast(data.message, { variant: "destructive" });
      }
    } catch {
      toast("Network error", { variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-primary-black dark:bg-secondary-black rounded-xl shadow-md font-poppins"
      >
        <h2 className="text-2xl font-semibold text-primary-white mb-4">Login</h2>

        <label className="block mb-2 text-sm text-secondary-lightgray">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full mb-4 px-3 py-2 bg-secondary-darkgray text-primary-white border border-secondary-regulargray rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-sm text-secondary-lightgray">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full mb-4 px-3 py-2 bg-secondary-darkgray text-primary-white border border-secondary-regulargray rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ Remember Me Checkbox */}
        <label className="flex items-center text-sm text-secondary-lightgray mb-4">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2 accent-primary-blue"
          />
          Remember Me
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full mb-4 px-4 py-2 bg-primary-blue text-primary-white font-semibold rounded hover:bg-secondary-blue disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </>
  );
}
