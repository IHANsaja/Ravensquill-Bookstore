import React, { useState } from "react";
import { toast, Toaster } from "sonner";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast("Please fill in all fields", { variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        toast("Registration successful");
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
        className="max-w-md mx-auto p-6 bg-primary-black dark:bg-secondary-black rounded-2xl shadow-md font-poppins"
      >
        <h2 className="text-2xl font-semibold text-primary-white mb-4">Sign Up</h2>

        <label className="block mb-2 text-sm text-secondary-lightgray">Username</label>
        <input
          type="text"
          placeholder="Your username"
          className="w-full mb-4 px-3 py-2 bg-secondary-darkgray text-primary-white border border-secondary-regulargray rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button
          type="submit"
          disabled={loading}
          className="w-full mb-4 px-4 py-2 bg-primary-blue text-primary-white font-semibold rounded hover:bg-secondary-blue disabled:opacity-50"
        >
          {loading ? "Signing up…" : "Sign Up"}
        </button>

        
      </form>
    </>
  );
}
