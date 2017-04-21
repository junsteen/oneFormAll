import React, {Component} from 'react';

export default class viewitemdetail extends Component {
  render() {
  var tagitemNodes = [];
  var data=this.props.tags;
  for(var i in data){
    tagitemNodes.push(<button type="button" className="btn btn-info btn-sm">{data[i].tagName}</button>);
  }

console.log(this.props.tags);

    return(
        <div>{tagitemNodes}
        </div>
    );
  }
}
