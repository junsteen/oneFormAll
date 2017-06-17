import React, {Component} from 'react';

export default class viewitemdetail extends Component {
  render() {
  var tagitemNodes = [];
  var data=this.props.formgroupsUniqe;
  for(var i in data){
    tagitemNodes.push(<li classname="nav-item"><a className="nav-link active" data-toggle="tab" href="#{data[i].tagGroup}" role="tab">{data[i]}</a></li>);
  }

console.log(this.props.tags);

    return(
        <ul classname="nav nav-tabs" role="tablist">
          {tagitemNodes}
        </ul>
    );
  }
}
