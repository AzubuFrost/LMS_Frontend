import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function StudentListItem({ student }) {
  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.fullName}</td>
      <td>{student.email}</td>
      <td>{student.gender}</td>
      <td>{moment(student.dateOfBirth).format('MMM/DD/YYYY')}</td>
      <td>{student.credit}</td>
      <td style={{ textAlign: 'right' }}>
        <Link to={`/students/${student.id}`} className="ui blue tiny button">
          <i className="edit icon" />
          Details
        </Link>
      </td>
    </tr>
  );
}
