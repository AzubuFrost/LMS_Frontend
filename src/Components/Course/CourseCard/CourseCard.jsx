import React from 'react';
import { Link } from 'react-router-dom';
import { truncate } from 'lodash/string';

export default function CourseCard({ course }) {
  return (
    <div className="card">
      <div className="content">
        <div className="header">{truncate(course.title, { length: 20 })}</div>
        <div className="meta">Fee: ${course.fee}</div>
        <div className="meta">Max students: {course.maxStudent}</div>
        <div className="description">
          {truncate(course.description, { length: 60 })}
        </div>
      </div>
      <Link to={`/courses/${course.id}`}>
        <div className="ui bottom attached blue button">
          <i className="edit icon" />
    Details
        </div>
      </Link>
    </div>
  );
}
