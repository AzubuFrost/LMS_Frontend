import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

// action type
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const LOGOUT = 'LOGOUT';

// login reducer
export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { isRegistering: true };
    case REGISTER_SUCCESS:
      return { isRegistering: false, showRegisterSuccess: true };
    case REGISTER_FAILURE:
      return { isRegistering: false, error: action.error, showRegisterError: true };
    case LOGIN_REQUEST:
      return { isLoggingIn: true, user: action.user };
    case LOGIN_SUCCESS:
      return { isLoggingIn: false, showLoginSuccess: true, user: action.user };
    case LOGIN_FAILURE:
      return { isLoggingIn: false, error: action.error, showLoginError: true };
    case LOGOUT:
      return { };
    default:
      return state;
  }
}

// action creator

export const logout = (history) => {
  localStorage.removeItem('user');
  history.push('/login');
  return { type: LOGOUT };
};

export const register = (us) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    return axios.post('api/user/createuser', us)
      .then(() => dispatch({ type: REGISTER_SUCCESS }))
      .catch(error => dispatch({ type: REGISTER_FAILURE, error }));
  };
};

export const login = (username, password) => {
  const data = `grant_type=password&username=${username}&password=${password}`;
  const header = { headers: {
    'Content-Type': 'application/x-www-form-urlencoded' } };

  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return axios.post('/token', data, header)
      .then(response => response.data)
      .then((dt) => {
        axios.post(`api/user/login?username=${username}&password=${password}`)
          .then(repsonse => repsonse.data)
          .then((usr) => {
            localStorage.setItem('user', JSON.stringify(
              { fullName: `${usr.firstName} ${usr.lastName}`,
                accountType: usr.accountType,
                token: dt.access_token,
                expiresin: dt.expires_in }));
            dispatch({ type: LOGIN_SUCCESS,
              user: { fullName: `${usr.firstName} ${usr.lastName}`,
                accountType: usr.accountType,
                token: dt.access_token,
                expiresin: dt.expires_in } });
          });
      })
      .catch(error => dispatch({ type: LOGIN_FAILURE,
        error: error.response.data.error_description }));
  };
};
