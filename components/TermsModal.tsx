import React, { useState } from "react";

const TermsModal = ({ onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAgree = () => {
    if (isChecked) {
      onAgree();
    }
  };

  return (
    <div className="terms-modal">
      <h2>Terms and Conditions</h2>
      <p>Please read and agree to the terms and conditions to proceed.</p>
      <label>
        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />I
        agree to the terms and conditions
      </label>
      <button onClick={handleAgree} disabled={!isChecked}>
        Agree
      </button>
    </div>
  );
};

export default TermsModal;
