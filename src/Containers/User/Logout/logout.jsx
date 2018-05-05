import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../../Reducers/user.reducer';
import { Button } from '../../../Framework/ui';


class Logout extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('user')) {
      $(this.confirmModal).modal('show');
    } else {
      $(this.messageModal).modal('show');
    }
  }
  handleApprove() {
    const { history } = this.props;
    this.props.dispatch(logout(history));
    $(this.confirmModal).modal('hide');
  }
  handleClose() {
    $(this.confirmModal).modal('hide');
    this.props.history.goBack();
  }

  handleMessageClose() {
    this.props.history.goBack();
  }

  updateConfirmModalRef(ref) {
    this.confirmModal = ref;
  }
  updateMessageModal(ref) {
    this.messageModal = ref;
  }

  render() {
    return (
      <div>
        <div className="ui tiny modal" ref={this.updateConfirmModalRef.bind(this)}>
          <div className="header">Confirm Logout</div>
          <div className="content">
        Are you sure you want to logout ?
          </div>
          <div className="actions">
            <Button className="right labeled icon" primary onClick={this.handleApprove.bind(this)}>
              Yes
              <i className="checkmark icon" />
            </Button>
            <Button danger onClick={this.handleClose.bind(this)}>No</Button>
          </div>
        </div>

        <div className="ui mini modal" ref={this.updateMessageModal.bind(this)}>
          <div className="ui icon header">
            <i className="redo icon" />
            Warning
          </div>
          <div className="content">
            You have logged out !
          </div>
          <div className="actions">
            <Button className="ui green ok inverted button" onClick={this.handleMessageClose.bind(this)}>
              <i className="checkmark icon" />
    OK
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (state) => {
  return {
    loggedout: state.UserReducer.loggedout,
  };
};
export default withRouter(connect(mapDispatchToProps)(Logout));

