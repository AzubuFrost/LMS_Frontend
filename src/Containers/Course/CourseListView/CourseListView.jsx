import React from 'react';
import { connect } from 'react-redux';
import { getAll } from '../../../Reducers/course.reducer';
import { CourseListView } from '../../../Components';


class CourseListViewContainer extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    if (this.props.fetchData) {
      this.props.fetchData();
    }
  }

  render() {
    return (
      <CourseListView courses={this.props.courses} isLoading={this.props.isLoading} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.CourseReducer.courses,
    isLoading: state.CourseReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(getAll());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseListViewContainer);
