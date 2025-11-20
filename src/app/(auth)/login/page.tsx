"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClearSession = async () => {
    toast.loading("Clearing session...");

    try {
      await supabase.auth.signOut();

      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Clear localStorage
      localStorage.clear();

      toast.success("Session cleared! You can now login.");
      setError("");
    } catch (err) {
      console.error("Clear session error:", err);
      toast.error("Failed to clear session");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        // Wait a bit for session to be stored
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Use window.location for hard redirect
        window.location.href = "/admin";
      } else {
        setError("Login failed: No session created");
        setLoading(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border border-border shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <Alert className="bg-red-500/10 border-red-500 text-red-500">
            {error}
          </Alert>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-4"
          suppressHydrationWarning
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-border"
              required
              disabled={loading}
              suppressHydrationWarning
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-border"
              required
              disabled={loading}
              suppressHydrationWarning
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80"
            disabled={loading}
            suppressHydrationWarning
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <div className="border-t border-border pt-4 mt-4">
          <p className="text-xs text-muted-foreground text-center mb-2">
            Having trouble logging in?
          </p>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-xs"
            onClick={handleClearSession}
            disabled={loading}
          >
            Clear Session & Cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
