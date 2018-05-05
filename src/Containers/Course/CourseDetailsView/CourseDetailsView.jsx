import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getcourseById, modifyOrCreateCourseDetail, deleteCourse } from '../../../Reducers/course.reducer';
import { PageLoader, Segment, Message, Button, Confirm, NotFound } from '../../../Framework/ui';
import { isName, isNumber, isFloat } from '../../../Framework/util';


class CourseDetailsViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: '',
        fee: '',
        maxStudent: '10',
        description: '',
      },
      showConfirmDelete: false,
    };
  }
  componentDidMount() {
    this.fetchCourse();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.course !== this.props.course) {
      this.setState({ course: nextProps.course });
    }
  }


  fetchCourse() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      return;
    }
    if (this.props.fetchCourse) {
      this.props.fetchCourse(id);
    }
  }

  handleSubmit(e) {
    const { id } = this.props.match.params;
    const { course } = this.state;
    e.preventDefault();
    if (this.props.handleSubmit &&
      isName(course.title) &&
      isFloat(course.fee) &&
      isNumber(course.maxStudent)) {
      this.props.handleSubmit(course, id);
    }
  }

  handleDelete() {
    const { id } = this.props.match.params;
    const { history } = this.props;
    this.hideConfirmDelete();
    if (this.props.handleDelete) {
      this.props.handleDelete(history, id);
    }
  }
  handleFieldChange(e) {
    const { course } = this.state;
    this.setState({ course: {
      ...course,
      [e.target.name]: e.target.value },
    });
  }

  handleCancel() {
    this.props.history.push('/courses');
  }

  showConfirmDelete() {
    this.setState({ showConfirmDelete: true });
  }

  hideConfirmDelete() {
    this.setState({ showConfirmDelete: false });
  }


  render() {
    const { isLoading, error, showError, showSuccess } = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    const isAvailable = user ? user.accountType === 'lecturer' : false;
    const { course } = this.state;
    const { id } = this.props.match.params;
    return (
      <div>
        <Segment style={{ width: 600, margin: '0 auto' }}>
          {showSuccess && (
            <Message header="Success!" type="success">
              <p>All changes have been saved</p>
            </Message>
          )}
          {showError && (
            <Message header="Oops!" type="negative">
              <p>{`${error.response.statusText} (${error.response.status})`}</p>
            </Message>
          )}
          {isLoading && <PageLoader />}
          {!isLoading && !course && <NotFound />}
          { !isLoading && course && (
            <form className="ui form" onSubmit={this.handleSubmit.bind(this)}>
              <h4 className="ui dividing header">Course Details</h4>
              <div className="fields">
                <div className={classnames('eleven wide field', { error: !isName(course.title) })}>
                  <label>Title</label>
                  <input
                    disabled={!isAvailable}
                    required
                    type="text"
                    name="title"
                    value={course.title}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="Title"
                  />
                  {!isName(course.title) &&
                  <label className="help-block">Title must only be letters</label>}
                </div>
                <div className={classnames('five wide field', { error: !isFloat(course.fee) })}>
                  <label>Fee ($)</label>
                  <input
                    disabled={!isAvailable}
                    required
                    type="text"
                    name="fee"
                    value={course.fee}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="Fee ($)"
                  />
                  {!isFloat(course.fee) &&
                  <label className="help-block">Fee you typed is not valid</label>}
                </div>
              </div>
              <div className="fields">
                <div className={classnames('five wide field', { error: !isNumber(course.maxStudent) })}>
                  <label>Max students</label>
                  <input
                    disabled={!isAvailable}
                    required
                    type="text"
                    name="maxStudent"
                    value={course.maxStudent}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="MaxStudent ($)"
                  />
                  {!isNumber(course.maxStudent) &&
                  <label className="help-block">NOT VAILD NUMBER</label>}
                </div>
              </div>
              <div className="field">
                <label>Description</label>
                <textarea
                  disabled={!isAvailable}
                  name="description"
                  rows="2"
                  value={course.description}
                  onChange={this.handleFieldChange.bind(this)}
                />
              </div>
              <button
                className={classnames('ui blue button', { loading: this.props.isSaving })}
                type="submit"
                disabled={this.props.isSaving}
              >
          Save changes
              </button>
              {id !== 'create' && <Button
                disabled={!isAvailable}
                danger
                onClick={this.showConfirmDelete.bind(this)}
                loading={this.props.isDeleting}
              >Delete
              </Button>}
              <button className="ui button" type="button" onClick={this.handleCancel.bind(this)} >
          Cancel
              </button>
            </form>
          )
          }
        </Segment>
        <Confirm
          show={this.state.showConfirmDelete}
          onClose={this.hideConfirmDelete.bind(this)}
          onApprove={this.handleDelete.bind(this)}
          header="Confirm deleting lecturer"
        >
         This action cannot be undone, are you sure you want to continue?
        </Confirm>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: (id) => {
      dispatch(getcourseById(id));
    },
    handleSubmit: (course, id) => {
      dispatch(modifyOrCreateCourseDetail(course, id));
    },
    handleDelete: (history, id) => {
      dispatch(deleteCourse(history, id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    course: state.CourseReducer.course,
    isLoading: state.CourseReducer.isLoading,
    isSaving: state.CourseReducer.isSaving,
    isDeleting: state.CourseReducer.isDeleting,
    error: state.CourseReducer.error,
    showError: state.CourseReducer.showError,
    showSuccess: state.CourseReducer.showSuccess,

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseDetailsViewContainer));
