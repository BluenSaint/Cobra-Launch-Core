"use client";
import { useSession } from "next-auth/react";
import ProfileHeader from "../../components/ProfileHeader";
import KYCUploadCard from "../../components/KYCUploadCard";
import { useState } from "react";

export default function ProfilePage() {
  // Use optional chaining to safely handle undefined session
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;
  const [error, setError] = useState<string | null>(null);

  // Handle loading state
  if (status === "loading") {
    return <div className="loading-container">Loading profile information...</div>;
  }

  // Handle authentication error
  if (status === "unauthenticated" || !session) {
    return (
      <div className="error-container">
        <h2>Access Denied</h2>
        <p>You must be signed in to view this page.</p>
        <button onClick={() => (window.location.href = "/auth/signin")}>Sign In</button>
      </div>
    );
  }

  // Handle data fetching errors
  const handleError = (err: Error) => {
    console.error("Profile page error:", err);
    setError("Failed to load some profile data. Please try again later.");
  };

  return (
    <div>
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <ProfileHeader
        name={session.user?.name || "User"}
        email={session.user?.email || "No email provided"}
      />

      <section>
        <h2>Current Plan</h2>
        <p>Plan: Shield</p> {/* Replace with dynamic plan data */}
        <p>Status: Active</p> {/* Replace with dynamic status data */}
      </section>

      <section>
        <h2>Uploaded Documents</h2>
        <KYCUploadCard />
      </section>

      <button
        onClick={() => {
          try {
            // Upgrade plan logic would go here
            console.log("Plan upgrade requested");
          } catch (err) {
            handleError(err as Error);
          }
        }}
      >
        Upgrade Plan
      </button>
    </div>
  );
}
