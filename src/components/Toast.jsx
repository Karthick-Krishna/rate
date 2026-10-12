import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="google-toast-container">
      <div className={`google-toast-pill ${type}`}>
        {type === 'success' ? (
          <CheckCircle2 size={16} className="google-toast-icon" />
        ) : (
          <Info size={16} className="google-toast-icon" />
        )}
        <span className="google-toast-msg">{message}</span>
        <button className="google-toast-close" onClick={onClose} aria-label="Close toast">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
