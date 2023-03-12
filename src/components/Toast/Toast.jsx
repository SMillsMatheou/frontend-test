import React from 'react';

import './Toast.css';

export function Toast({ message }) {
  const renderToast = (
    <div data-testid="toast__container" className="toast">
      {message}
    </div>
  );

  return renderToast;
}
