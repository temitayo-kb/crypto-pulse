import React from "react";
import "./ErrorBanner.css";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-banner">
      <div className="error-content">
        <ErrorOutlineIcon className="error-icon" />
        <p className="error-message">{message}</p>
      </div>
      <button className="error-dismiss" onClick={onDismiss}>
        <CloseIcon />
      </button>
    </div>
  );
}

export default ErrorBanner;
