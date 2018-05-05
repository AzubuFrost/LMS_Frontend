import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Shell } from './App';
import Routes from './Routes';
import './styles/app.css';
import rootReducer from './Reducers';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(
  thunkMiddleware,
  logger,
));
axios.defaults.baseURL = 'http://localhost:49224';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Shell>
          <Routes />
        </Shell>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
