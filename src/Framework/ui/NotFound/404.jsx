import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

export default function () {
  return (
    <div >
      <div className="_404">404</div>
      <div className="_2">It appears that the data you were looking for doesn&rsquot exist.</div>
      <Link className="ui inverted blue button" to="/courses">BACK TO HOME</Link>
    </div>
  );
}
