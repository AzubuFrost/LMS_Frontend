import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../CourseCard/CourseCard';
import { PageLoader } from '../../../Framework/ui';
import './CourseListView.css';


export default class CourseListView extends React.Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAvailable = user ? user.accountType === 'lecturer' : false;
    return (
      <div>
        {this.props.isLoading && <PageLoader />}
        {!this.props.isLoading && (
          <div>
            <h1 className="ui header">Courses</h1>
            {isAvailable && <Link to="/courses/create" className="ui blue button">Add course</Link>}
            <div className="ui cards">
              {this.props.courses.map(course => <CourseCard course={course} key={course.id} />)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

CourseListView.defaultProps = {
  courses: [],
};
