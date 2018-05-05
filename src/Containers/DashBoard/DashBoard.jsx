import React from 'react';
import { Segment } from '../../Framework/ui';

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div className="ui vertically divided padded grid">
          <div className="three column row">
            <div className="red column">
              <Segment />
            </div>
            <div className=" green column">
              <Segment />
            </div>
            <div className="yellow column">
              <Segment />
            </div>
          </div>
        </div>


        <div className="ui two column divided grid">
          <div className="row">
            <div className="blue column">
              <Segment />
            </div>
            <div className="purple column">
              <Segment />
            </div>
          </div>
        </div>


      </div>
    );
  }
}
