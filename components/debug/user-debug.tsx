"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkUserStatus = async () => {
    setLoading(true);
    const supabase = createClient();

    try {
      // Check current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      console.log("[v0] Current user:", user);
      console.log("[v0] User error:", userError);

      // Check if profile exists
      let profile = null;
      let profileError = null;
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        profile = data;
        profileError = error;
        console.log("[v0] Profile data:", profile);
        console.log("[v0] Profile error:", profileError);
      }

      // Check all profiles (for debugging)
      const { data: allProfiles, error: allProfilesError } = await supabase
        .from("profiles")
        .select("*");
      console.log("[v0] All profiles:", allProfiles);
      console.log("[v0] All profiles error:", allProfilesError);

      setDebugInfo({
        user,
        userError,
        profile,
        profileError,
        allProfiles,
        allProfilesError,
      });
    } catch (error) {
      console.error("[v0] Debug error:", error);
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>User Debug Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={checkUserStatus} disabled={loading}>
          {loading ? "Checking..." : "Check User Status"}
        </Button>

        {debugInfo && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Current User:</h3>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(debugInfo.user, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">User Profile:</h3>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(debugInfo.profile, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">All Profiles Count:</h3>
              <p>{debugInfo.allProfiles?.length || 0} profiles found</p>
            </div>

            {debugInfo.error && (
              <div>
                <h3 className="font-semibold text-red-600">Error:</h3>
                <p className="text-red-600">{debugInfo.error}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
