import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../../Reducers/user.reducer';
import { isName, isEmail, isNumber, isUsername } from '../../../Framework/util';
import { Message } from '../../../Framework/ui';
import './register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        accountType: '',
        personalId: 0,
        username: '',
        password: '',
        confirmPassword: '',
        email: '' },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({ user: nextProps.user });
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleCancel() {
    this.props.history.push('/students');
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.state;
    this.setState({ isSubmitted: true });
    if (isName(user.firstName) && isName(user.lastName) && isUsername(user.username)
      && user.accountType && isNumber(user.personalId) &&
      user.password && user.confirmPassword && isEmail(user.email)) {
      this.props.dispatch(register(user));
    }
  }
  render() {
    const { isRegistering, showRegisterError, showRegisterSuccess, error } = this.props;
    const { user } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        {showRegisterSuccess && (
          <Message header="Success!" type="success">
            <p>Successfully Registered!<Link to="/userlogin" className="btn btn-link">Login</Link>
            </p>
          </Message>
        )}
        {showRegisterError && (
          <Message header="Oops!" type="negative">
            <label>{`${error.response.statusText} (${error.response.status})`}</label>
          </Message>
        )}
        <h2>Register</h2>
        <form className={classnames('ui', { isRegistering: 'loading' }, 'form')} onSubmit={this.handleSubmit}>
          <div className="two fields">
            <div className={classnames('field', { error: !isName(user.firstName) })}>
              <label htmlFor="firstName">First Name</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={user.firstName}
                onChange={this.handleChange}
              />
              { !isName(user.firstName) &&
              <label className="help-block">Name must only be letters</label>
              }
            </div>
            <div className={classnames('field', { error: !isName(user.lastName) })}>
              <label htmlFor="lastName">Last Name</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={this.handleChange}
              />
              { !isName(user.lastName) &&
              <label className="help-block">Name must only be letters</label>
              }
            </div>
          </div>
          <div className="field ">
            <label>Are you a </label>
            <select name="accountType" required value={user.accountType} className="ui fluid dropdown" onChange={this.handleChange}>
              <option value="">AccountType</option>
              <option value="student">Student</option>
              <option value="lecturer">Teacher</option>

            </select>
          </div>
          <div className={classnames('field', { error: !isNumber(user.personalId) })}>
            <label htmlFor="userId">UserId</label>
            <input
              required
              type="text"
              placeholder="user id"
              className="form-control"
              name="personalId"
              value={user.userId}
              onChange={this.handleChange}
            />
            {!isNumber(user.personalId) &&
            <label className="help-block">UserId can only be numbers</label>
            }
          </div>
          <div className={classnames('field', { error: !isUsername(user.username) })}>
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              placeholder="username"
              className="form-control"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
            { !isUsername(user.username) &&
            <label className="help-block">Username is not vaild</label>
            }
          </div>
          <div className={classnames('field', { error: !isEmail(user.email) })}>
            <label htmlFor="email">Email</label>
            <input
              required
              type="text"
              placeholder="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={this.handleChange}
            />
            {!isEmail(user.email) &&
            <label className="help-block">Email is not valid</label>
            }
          </div>
          <div className={`field${user.password !== user.confirmPassword ? ' error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              placeholder="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {user.password !== user.confirmPassword &&
            <label className="help-block">please confirm your password</label>
            }
          </div>
          <div className={`field${user.password !== user.confirmPassword ? ' error' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              required
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className={classnames('ui blue button', { loading: isRegistering })}>Register</button>
            <button className="ui button" type="button" onClick={this.handleCancel.bind(this)}>
          Cancel
            </button>
          </div>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    isRegistering: state.UserReducer.isRegistering,
    isSubmitted: state.UserReducer.isSubmitted,
    showRegisterError: state.UserReducer.showRegisterError,
    showRegisterSuccess: state.UserReducer.showRegisterSuccess,
    error: state.UserReducer.error,
  };
};

export default connect(mapStateToProps)(Register);
