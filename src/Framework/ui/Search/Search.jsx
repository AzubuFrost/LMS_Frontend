import React from 'react';
import classnames from 'classnames';
import './Search.css';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
    this.isReadyToSubmit = this.isReadyToSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.setState({ content: e.target.value });
  }

  isReadyToSubmit(e) {
    e.preventDefault();
    const { content } = this.state;
    const { Submit } = this.props;
    Submit(content);
  }
  render() {
    return (
      <form onSubmit={this.isReadyToSubmit}>
        <div className={classnames('ui', 'search')} style={{ float: 'right' }}>
          <div className="ui icon input">
            <input className="prompt" type="text" placeholder="Search your NAME and EMAIL" onChange={this.handleOnChange} value={this.state.content} />
            <i className="search icon" />
          </div>
        </div>
      </form>
    );
  }
}
