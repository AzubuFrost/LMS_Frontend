import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { Clock } from '../../Framework/ui';
import './TopNav.css';

export default class TopNav extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date() };
  }

  handleChange(date) {
    this.setState({ date });
  }
  render() {
    const { date } = this.state;
    return (
      <div className="ui fixed inverted blue menu">
        <a className="item topmenu">
          <i className="envelope outline icon" />
          <div className="floating ui red circular empty label" />
        </a>
        <a className="item topmenu">
          <i className="bell icon" />
          <div className="floating ui red circular empty label" />
        </a>
        <div className="right menu">
          <div className="ui simple dropdown item">
            <Clock />
            <div className="menu">
              <div className="item">
                <Calendar
                  onChange={this.handleChange.bind(this)}
                  value={date}
                />
              </div>
            </div>
          </div>
          <Link to="/login"className="item right">
            <i className="level down alternate icon" />
            <label>Log In</label>
          </Link>
          <Link to="/register"className="item right">
            <i className="edit icon" />
            <label>Register</label>
          </Link>
        </div>
      </div>
    );
  }
}
