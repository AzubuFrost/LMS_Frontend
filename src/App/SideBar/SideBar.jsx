import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './SideBar.css';

class SideBar extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="ui wide visible sidebar inverted vertical sticky menu" >
          {user &&
            <div className="item userinfo">
              <img className="ui small circular image" src="/img/avatar.png" />
              <label>WELCOME</label>
              <div>
                <label className="item-username">{user.fullName}</label>
                <p className={classnames('item-type', { green: user.accountType === 'lecturer' }, { yellow: user.accountType === 'student' })}>
                  <label className={classnames('ui empty circular label',
                    { green: user.accountType === 'lecturer' }, { yellow: user.accountType === 'student' })}
                  />
                  <label>{user.accountType}</label></p>
              </div>
            </div>}
          <Link to="/dashboard" className="item">
            <i className="clipboard list icon" />
            <label>Dashboard</label>
          </Link>
          <Link to="/lecturers" className="item">
            <i className="user md icon" />
            <label>Teacher</label>
          </Link>
          <Link to="/students" className="item">
            <i className="child icon" />
            <label>Student</label>
          </Link>
          <Link to="/courses" className="item">
            <i className="book icon" />
            <label>Courses</label>
          </Link>
          <Link to="/" className="item">
            <i className="envelope open icon" />
            <label>Message</label>
          </Link>
          <Link to="/logout" className="item">
            <label>Log Out</label>
            <i className="level up alternate icon" />
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.UserReducer.user,
  };
};
export default connect(mapStateToProps)(SideBar);
