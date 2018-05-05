import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { PageLoader, Segment, Message, Button, Confirm } from '../../../Framework/ui';
import { getStudentById, modifyOrCreateStudentDetail, deleteStudent } from '../../../Reducers/student.reducer';
import { isName, isEmail, isNumber } from '../../../Framework/util';

class StudentDetailsViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        id: '',
        fullName: '',
        firstName: '',
        lastName: '',
        gender: 'Male',
        dateOfBirth: '1999-01-01',
        email: '',
        credit: 16,
      },
      showConfirmDelete: false,
    };
  }

  componentDidMount() {
    this.fetchStudent();
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.student !== nextProps.student) {
      this.setState({ student: nextProps.student });
    }
  }

  handleFieldChange(e) {
    const { student } = this.state;
    this.setState({ student: {
      ...student,
      [e.target.name]: e.target.value },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { student } = this.state;
    const { id } = this.props.match.params;
    const names = student.fullName.split(' ');
    const newstudent = {
      id: student.id,
      firstName: names[0],
      lastName: names[1],
      gender: student.gender,
      dateOfBirth: student.dateOfBirth,
      email: student.email,
      credit: student.credit,
    };
    if (isName(student.firstName) && isName(student.lastName
      && isEmail(student.email) && isNumber(student.credit))) {
      if (id === 'create') {
        this.props.dispatch(modifyOrCreateStudentDetail(student, id));
      } else {
        this.props.dispatch(modifyOrCreateStudentDetail(newstudent, id));
      }
    }
  }

  handleDelete() {
    const { id } = this.props.match.params;
    const { history } = this.props;
    this.hideConfirmDelete();
    this.props.dispatch(deleteStudent(history, id));
  }

  handleCancel() {
    this.props.history.push('/students');
  }

  showConfirmDelete() {
    this.setState({ showConfirmDelete: true });
  }

  hideConfirmDelete() {
    this.setState({ showConfirmDelete: false });
  }

  fetchStudent() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      return;
    }
    this.props.dispatch(getStudentById(id));
  }

  render() {
    const { isSaving, isDeleting, isLoading, showError, showSuccess, error } = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    const isAvailable = user ? user.accountType === 'lecturer' : false;
    const { student } = this.state;
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
          {!isLoading && !student && <h1>TO BE CONTINUED</h1>}
          { !isLoading && student && (
            <form className="ui form" onSubmit={this.handleSubmit.bind(this)}>
              <h4 className="ui dividing header">Student Details</h4>
              <div className="fields">
                <div className={classnames('eight wide field', { error: !isName(student.fullName) })}>
                  <label>Full name</label>
                  <input
                    disabled={!isAvailable}
                    required
                    type="text"
                    name="fullName"
                    value={student.fullName}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="First name"
                  />
                  { !isName(student.fullName) &&
                  <label className="help-block">Not valid name</label>}
                </div>
              </div>
              <div className="fields">
                <div className={classnames('eight wide field', { error: !isEmail(student.email) })}>
                  <label>Email</label>
                  <input
                    disabled={!isAvailable}
                    required
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="Email"
                  />
                  { !isEmail(student.email) &&
                  <label className="help-block">Not valid email</label>}
                </div>
                <div className="eight wide field">
                  <label>Date of birth</label>
                  <input
                    disabled={!isAvailable}
                    required
                    type="text"
                    name="dateOfBirth"
                    value={moment(student.dateOfBirth).format('MMM/DD/YYYY')}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="YYYY-MM-DD"
                  />
                </div>
              </div>
              <div className="fields">
                <div className="four wide field">
                  <label>Gender</label>
                  <select
                    disabled={!isAvailable}
                    required
                    name="gender"
                    value={student.gender}
                    className="ui fluid dropdown"
                    onChange={this.handleFieldChange.bind(this)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className={classnames('five wide field', { error: !isNumber(student.credit) })}>
                <label>Credit</label>
                <input
                  disabled={!isAvailable}
                  required
                  type="text"
                  name="credit"
                  value={student.credit}
                  onChange={this.handleFieldChange.bind(this)}
                  placeholder="credit"
                />
                { !isNumber(student.credit) &&
                  <label className="help-block">Not a number!</label>}
              </div>
              <button
                className={classnames('ui blue button', { loading: isSaving })}
                type="submit"
                disabled={isSaving}
              >
          Save changes
              </button>
              {id !== 'create' && <Button
                disabled={!isAvailable}
                danger
                onClick={this.showConfirmDelete.bind(this)}
                loading={isDeleting}
              >Delete
              </Button>}
              <button className="ui button" type="button" onClick={this.handleCancel.bind(this)}>
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

const mapStateToProps = (state) => {
  return {
    student: state.StudentReducer.student,
    isLoading: state.StudentReducer.isLoading,
    isSaving: state.StudentReducer.isSaving,
    isDeleting: state.StudentReducer.isDeleting,
    showError: state.StudentReducer.showError,
    showSuccess: state.StudentReducer.showSuccess,
    error: state.StudentReducer.error,

  };
};

export default withRouter(connect(mapStateToProps)(StudentDetailsViewContainer));
