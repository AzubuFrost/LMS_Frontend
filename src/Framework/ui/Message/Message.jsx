import React from 'react';
import classnames from 'classnames';

export default function Message({ className, type, header, children, ...other }) {
  return (
    <div className={classnames('ui message', type)} {...other}>
      <div className="header">
        {header}
      </div>
      {children}
    </div>
  );
}
