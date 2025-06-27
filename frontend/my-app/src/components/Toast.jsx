import React, { useEffect, useState } from 'react';

// Toast styles
const toastStyles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
  },
  toast: {
    minWidth: '300px',
    margin: '10px',
    padding: '15px 20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    animation: 'slideIn 0.3s ease forwards',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
  },
  success: {
    backgroundColor: '#28a745',
    borderLeft: '5px solid #1e7e34',
  },
  error: {
    backgroundColor: '#dc3545',
    borderLeft: '5px solid #bd2130',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '10px',
    padding: '0 5px',
    fontSize: '20px',
    opacity: '0.7',
    transition: 'opacity 0.2s ease',
  },
  icon: {
    marginRight: '10px',
    fontSize: '18px',
  },
};

// CSS animations
const styles = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  return (
    <>
      <style>{styles}</style>
      <div
        style={{
          ...toastStyles.toast,
          ...toastStyles[type],
          animation: isClosing ? 'slideOut 0.3s ease forwards' : undefined,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <i
            className={`bi ${
              type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'
            }`}
            style={toastStyles.icon}
          />
          {message}
        </div>
        <button
          onClick={handleClose}
          style={{
            ...toastStyles.closeButton,
            ':hover': { opacity: 1 },
          }}
        >
          ×
        </button>
      </div>
    </>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={toastStyles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export { Toast, ToastContainer };
