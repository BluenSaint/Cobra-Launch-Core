import React from "react";

export default function TermsModal() {
  return (
    <div className="terms-modal">
      <div className="modal-content">
        <h2>Terms and Conditions</h2>
        <div className="terms-text">
          <p>
            By using the Cobra Launch Core platform, you agree to the following terms and conditions.
            These terms govern your use of our credit repair and monitoring services.
          </p>
          <h3>Service Agreement</h3>
          <p>
            We provide credit monitoring, dispute management, and credit improvement services.
            Results may vary based on your specific credit situation and history.
          </p>
          <h3>Privacy Policy</h3>
          <p>
            Your data is protected according to our privacy policy. We use industry-standard
            security measures to protect your personal and financial information.
          </p>
        </div>
        <div className="modal-actions">
          <button className="accept-button">Accept Terms</button>
          <button className="decline-button">Decline</button>
        </div>
      </div>
    </div>
  );
}
