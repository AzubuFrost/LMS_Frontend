import React from 'react';
import classnames from 'classnames';

export default function Button({ children, className, primary, danger, loading, disabled, ...other }) {
  return (
    <button
      className={classnames('ui button', { teal: primary, red: danger, loading }, className)}
      disabled={loading || disabled}
      {...other}
    >
      {children}
    </button>
  );
}
