import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLecturerById, modifyOrCreateLecturerDetail, deleteLecturer } from '../../../Reducers/lecturer.reducer';
import { PageLoader, Segment, Message, Confirm, Button } from '../../../Framework/ui';
import { isName, isEmail } from '../../../Framework/util';

class LecturerDetailsViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lecturer: {
        name: '',
        email: '',
        staffNumber: '',
      },
      showConfirmDelete: false,

    };
  }
  componentDidMount() {
    this.fetchLecturer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lecturer !== this.props.lecturer) {
      this.setState({ lecturer: nextProps.lecturer });
    }
  }

  fetchLecturer() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      return;
    }
    this.props.dispatch(getLecturerById(id));
  }

  showConfirmDelete() {
    this.setState({ showConfirmDelete: true });
  }

  hideConfirmDelete() {
    this.setState({ showConfirmDelete: false });
  }

  handleFieldChange(e) {
    const { lecturer } = this.state;
    this.setState({ lecturer: {
      ...lecturer,
      [e.target.name]: e.target.value },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { lecturer } = this.state;
    if (isName(lecturer.name) && isEmail(lecturer.email)) {
      this.props.dispatch(modifyOrCreateLecturerDetail(lecturer, id));
    }
  }

  handleDelete() {
    const { id } = this.props.match.params;
    const { history } = this.props;
    this.props.dispatch(deleteLecturer(history, id));
  }

  handleCancel() {
    this.props.history.push('/lecturers');
  }

  render() {
    const { isLoading, isSaving, isDeleting, error } = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    const isAvailable = user ? user.accountType === 'lecturer' : false;
    const { lecturer } = this.state;
    const { id } = this.props.match.params;
    return (
      <div>
        <Segment style={{ width: 600, margin: '0 auto' }}>
          {this.props.showSuccess && (
            <Message header="Success!" type="success">
              <p>All changes have been saved</p>
            </Message>
          )}
          {this.props.showError && (
            <Message header="Oops!" type="negative">
              <p>{`${error.response.statusText} (${error.response.status})`}</p>
            </Message>
          )}
          {isLoading && <PageLoader />}
          {!isLoading && !lecturer && <h1>TO BE CONTINUED</h1>}
          { !isLoading && lecturer && (
            <form className="ui form" onSubmit={this.handleSubmit.bind(this)}>
              <h4 className="ui dividing header">Lecturer Details</h4>
              <div className="fields">
                <div className={classnames('eight wide field', { error: !isName(lecturer.name) })}>
                  <label>Full name</label>
                  <input
                    disabled={!isAvailable}
                    required
                    type="text"
                    name="name"
                    value={lecturer.name}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="Full name"
                  />
                  { !isName(lecturer.name) &&
                  <label className="help-block">Name must be letters</label>}
                </div>
              </div>
              <div className="fields">
                <div className={classnames('eight wide field', { error: !isEmail(lecturer.email) })}>
                  <label>Email</label>
                  <input
                    disabled={!isAvailable}
                    required
                    type="email"
                    name="email"
                    value={lecturer.email}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="Email"
                  />
                  { !isEmail(lecturer.email) &&
                  <label className="help-block">Not valid email</label>}
                </div>
                <div className="eight wide field">
                  <label>Staff Number</label>
                  { id === 'create' &&
                  <input
                    type="text"
                    name="staffNumber"
                    value={lecturer.staffNumber}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="staff Number"
                  /> }
                  {id !== 'create' &&
                  <input
                    disabled
                    type="text"
                    name="staffNumber"
                    value={lecturer.staffNumber}
                    onChange={this.handleFieldChange.bind(this)}
                    placeholder="staff Number"
                  />}
                </div>
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
              >Delete</Button>}
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
    isLoading: state.LecturerReducer.isLoading,
    isSaving: state.LecturerReducer.isSaving,
    isDeleting: state.LecturerReducer.isDeleting,
    lecturer: state.LecturerReducer.lecturer,
    showError: state.LecturerReducer.showError,
    showSuccess: state.LecturerReducer.showSuccess,
    error: state.LecturerReducer.error,
  };
};

export default withRouter(connect(mapStateToProps)(LecturerDetailsViewContainer));
