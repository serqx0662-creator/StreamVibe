"use client";

import { ArrowRight, CheckCircle2, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "something went wrong");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] font-sans selection:bg-blue-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md p-8 relative">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 mb-6 shadow-lg shadow-purple-500/20">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Create Account</h1>
          <p className="text-gray-400">Join our community and start your journey</p>
        </div>

        {success ? (
          <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-4 animate-in zoom-in-95 duration-500">
            <div className="flex justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-green-400">Successfully Registered!</h2>
            <p className="text-green-500/70">Redirecting you to the login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            <div className="group space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1 group-focus-within:text-purple-400 transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors group-focus-within:text-purple-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1 group-focus-within:text-purple-400 transition-colors">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors group-focus-within:text-purple-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#121212] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-6"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Register
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-all">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
