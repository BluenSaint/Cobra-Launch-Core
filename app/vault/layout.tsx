import React, { ReactNode } from "react";

interface VaultLayoutProps {
  children: ReactNode;
}

const VaultLayout: React.FC<VaultLayoutProps> = ({ children }) => {
  return (
    <div className="vault-layout">
      <header>
        <h1>Vault</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default VaultLayout; 