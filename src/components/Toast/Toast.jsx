import React from 'react';

import './Toast.css';

export function Toast({ message }) {
  const renderToast = (
    <div className="toast">
      {message}
    </div>
  );

  return renderToast;
}
