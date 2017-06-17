import React, {Component} from 'react';
import Viewitem from './viewitem'

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "personal"
    };
  }

  render() {
    var timeviews = [];
    for(var key in this.props.timer){
      timeviews.push(<div>{this.props.timer[key]["tagName"]}:{this.props.timer[key]["time"]}</div>);
    }
    //timeviews.push(<div><Viewitem dispatch={this.props.dispatch} /></div>);
    return(
      <div>
        {timeviews}
      </div>
  );
  }
}
