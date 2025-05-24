import React from "react";

interface ProfileHeaderProps {
  name: string;
  email: string;
}

export default function ProfileHeader({ name, email }: ProfileHeaderProps) {
  return (
    <header>
      <h1>{name}</h1>
      <p>{email}</p>
    </header>
  );
}
