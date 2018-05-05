import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../Reducers/user.reducer';
import { Message, Button } from '../../../Framework/ui';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        password: '',
      },
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }


  handleOnChange(e) {
    const { user } = this.state;
    const { name, value } = e.target;
    this.setState({ user: {
      ...user,
      [name]: value,
    } });
  }

  handleOnSubmit(e) {
    const { user } = this.state;
    e.preventDefault();
    this.props.dispatch(login(user.username, user.password));
    this.props.history.push('/');
  }
  render() {
    const { showLoginError, showLoginSuccess, isLoggingIn } = this.props;
    const { user } = this.state;
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          {showLoginSuccess && (
            <Message header="Success!" type="success">
              <p>You have successfully login!</p>
            </Message>
          )}
          {showLoginError && (
            <Message header="Oops!" type="negative">
              <p>The password or username is not correct</p>
            </Message>
          )}
          <h2 className="ui image header">
            <div className="content">
            Log-in to your account
            </div>
          </h2>
          <form onSubmit={this.handleOnSubmit} className="ui large form">
            <div className="ui stacked secondary  segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    type="text"
                    name="username"
                    placeholder="your username"
                    onChange={this.handleOnChange}
                    value={user.username}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleOnChange}
                    value={user.password}
                  />
                </div>
              </div>
              <Button className={classnames('ui fluid large blue submit button', { loading: isLoggingIn })}>Login</Button>
            </div>

            <div className="ui error message" />

          </form>

          <div className="ui message">
      New to us? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    showLoginError: state.UserReducer.showLoginError,
    showLoginSuccess: state.UserReducer.showLoginSuccess,
    isLoggingIn: state.UserReducer.isLoggingIn,
  };
};
export default connect(mapStateToProps)(Login);
