import React from 'react';
import classnames from 'classnames';
import './page-loader.css';

export default function PageLoader({ children, className, ...other }) {
  return (
    <div className={classnames('ui segment jr-page-loader', className)} {...other}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">{children || 'Loading'}</div>
      </div>
    </div>
  );
}
