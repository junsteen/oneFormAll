import React, {Component} from 'react';
import Viewitemdetail from './viewitemdetail'
export default class Viewitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actives: []
    };

  }

  componentWillMount(){


  }
  componentWillReceiveProps(nextProps){

  }

  render() {
    //console.log(this.props.tags);

    var Viewitems=[];
    Viewitems.push(<h3 className="tagGroupName">test</h3>);


    return(
      <div data-toggle="buttons">
          {Viewitems}
        </div>
    );
  }

}
