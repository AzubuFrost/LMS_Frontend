import React from 'react';
import { connect } from 'react-redux';
import { getAllLecturer } from '../../../Reducers/lecturer.reducer';
import { LecturerListView } from '../../../Components';

class LecturerListViewContainer extends React.Component {
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    if (this.props.fetchData) {
      this.props.fetchData();
    }
  }

  render() {
    const { lecturers, isLoading } = this.props;
    return (
      <LecturerListView lecturers={lecturers} isLoading={isLoading} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lecturers: state.LecturerReducer.lecturers,
    isLoading: state.LecturerReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(getAllLecturer());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LecturerListViewContainer);
