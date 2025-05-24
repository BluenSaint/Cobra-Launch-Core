export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <header>
        <h1>Admin</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
