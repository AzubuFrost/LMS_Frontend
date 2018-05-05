import React from 'react';
import { Link } from 'react-router-dom';
import LecturerCard from '../LecturerCard/LecturerCard';
import { PageLoader } from '../../../Framework/ui';

function renderHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Staff Number</th>
        <th />
      </tr>
    </thead>
  );
}


export default class LecturerListView extends React.Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAvailable = user ? user.accountType === 'lecturer' : false;
    return (
      <div>
        {this.props.isLoading && <PageLoader />}
        {!this.props.isLoading && (
          <div>
            <h1 className="ui header">Lectures</h1>
            {isAvailable && <Link className="ui blue button" to="/lecturers/create">Add Lecturer</Link>}
            <table className="ui sortable celled table">
              {renderHeader()}
              <tbody>
                {this.props.lecturers.map(lecturer =>
                  <LecturerCard lecturer={lecturer} key={lecturer.id} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

LecturerListView.defaultProps = {
  lecturers: [],
};
