import React from 'react';
import Button from '../Button/Button';

export default class ModalMessage extends React.Component {
  constructor(props) {
    super(props);
    this.updateModal = this.updateModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    $(this.modal).modal({
      onHide: this.handleClose.bind(this),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      $(this.modal).modal(nextProps.show ? 'show' : 'hide');
    }
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  updateModal(ref) {
    this.modal = ref;
  }

  render() {
    return (
      <div className="ui mini modal" ref={this.updateModal}>
        <div className="ui icon header">
          <i className="redo icon" />
          {this.props.header ? this.props.header : 'Warning'}
        </div>
        <div className="content">
          <p>{this.props.message}</p>
        </div>
        <div className="actions">
          <Button className="ui green ok inverted button">
            <i className="checkmark icon" />
      OK
          </Button>
        </div>
      </div>
    );
  }
}
