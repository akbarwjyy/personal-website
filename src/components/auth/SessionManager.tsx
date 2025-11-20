"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function SessionManager() {
  useEffect(() => {
    // Clear session when tab is closed
    const handleBeforeUnload = () => {
      // Clear sessionStorage
      sessionStorage.clear();

      // Sign out from Supabase
      supabase.auth.signOut();
    };

    // Listen for tab close
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}
