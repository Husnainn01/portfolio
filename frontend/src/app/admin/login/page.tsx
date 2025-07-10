"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1626] to-[#101e36] px-4">
      <div className="w-full max-w-md bg-[#131e2e] rounded-2xl shadow-2xl p-8 md:p-10 border border-blue-900/40">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="Husnain Dev Logo" width={80} height={80} className="mb-4" priority />
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight font-aldrich">Admin Login</h1>
          <p className="text-blue-200/80 text-sm">Sign in to manage your portfolio</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg bg-[#19243a] border border-blue-900/30 text-white focus:outline-none focus:ring-2 focus:ring-lightBlue/60 focus:border-lightBlue/60 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full px-4 py-2 rounded-lg bg-[#19243a] border border-blue-900/30 text-white focus:outline-none focus:ring-2 focus:ring-lightBlue/60 focus:border-lightBlue/60 transition pr-12"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-blue-200 hover:text-lightBlue focus:outline-none"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.216.41 4.563 1.125M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-lightBlue to-blue-500 text-darkBlue font-semibold rounded-lg shadow-md hover:from-blue-400 hover:to-lightBlue transition-colors focus:outline-none focus:ring-2 focus:ring-lightBlue/60 focus:ring-offset-2 focus:ring-offset-blue-900 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-darkBlue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : null}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="text-xs text-blue-300 hover:text-lightBlue focus:outline-none"
              tabIndex={-1}
              onClick={() => setError("Forgot password? Please contact the site admin.")}
            >
              Forgot password?
            </button>
          </div>
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-300 rounded-lg px-4 py-2 text-sm text-center mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 