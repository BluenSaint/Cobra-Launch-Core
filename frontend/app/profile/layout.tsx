export default function ProfileLayout({ children }) {
  return (
    <div className="profile-layout">
      <header>
        <h1>Profile</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
