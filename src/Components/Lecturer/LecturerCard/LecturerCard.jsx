import React from 'react';
import { Link } from 'react-router-dom';

export default function LecturerCard({ lecturer }) {
  return (
    <tr>
      <td>{lecturer.id}</td>
      <td>{lecturer.name}</td>
      <td>{lecturer.email}</td>
      <td>{lecturer.staffNumber}</td>
      <td style={{ textAlign: 'right' }}>
        <Link to={`/lecturers/${lecturer.id}`} className="ui blue tiny button">
          <i className="edit icon" />
          Details
        </Link>
      </td>
    </tr>
  );
}
