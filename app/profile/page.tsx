import { useSession } from "next-auth/react";
import ProfileHeader from "../../components/ProfileHeader";
import KYCUploadCard from "../../components/KYCUploadCard";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <ProfileHeader name={session.user.name} email={session.user.email} />
      <section>
        <h2>Current Plan</h2>
        <p>Plan: Shield</p> {/* Replace with dynamic plan data */}
        <p>Status: Active</p> {/* Replace with dynamic status data */}
      </section>
      <section>
        <h2>Uploaded Documents</h2>
        <KYCUploadCard />
      </section>
      <button>Upgrade Plan</button> {/* Stub for upgrade functionality */}
    </div>
  );
}
