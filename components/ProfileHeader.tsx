export default function ProfileHeader({ name, email }) {
  return (
    <header>
      <h1>{name}</h1>
      <p>{email}</p>
    </header>
  );
}
