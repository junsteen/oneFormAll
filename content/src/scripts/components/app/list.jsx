import React, {Component} from 'react';
import Viewitem from './viewitem'

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "personal"
    };
  }
  changetoggle() {
  if(this.state.toggle=="personal"){
  this.setState({toggle: "office"});
  }else{
  this.setState({toggle: "personal"});
  }
  console.log(this.state.toggle);
    return ;
  }
  render() {
    var tagheadNodes = [];
    var tagbodyNodes = [];
    if(this.state.toggle=="personal"){
      tagheadNodes.push(<label className="btn btn-primary active"><input type="radio" autoComplete="off" />個人</label>);
      tagheadNodes.push(<label className="btn btn-primary" onClick={this.changetoggle.bind(this)}><input type="radio" autoComplete="off" />会社</label>);
      tagbodyNodes.push(<div><Viewitem tags={this.props.formgroupsUniqe.personal} inputname={this.props.inputname} storeforms={this.props.storeforms} formnames={this.props.formnames} /></div>);
    }else{
      tagheadNodes.push(<label className="btn btn-primary" onClick={this.changetoggle.bind(this)}><input type="radio" autoComplete="off" />個人</label>);
      tagheadNodes.push(<label className="btn btn-primary active"><input type="radio" autoComplete="off" />会社</label>);
      tagbodyNodes.push(<div><Viewitem tags={this.props.formgroupsUniqe.office} inputname={this.props.inputname} storeforms={this.props.storeforms} formnames={this.props.formnames} /></div>);
    }

/*
    console.log("this.props.formgroupsUniqe.personal");
    console.log(this.props.formgroupsUniqe.personal);
    console.log("this.props.formgroupsUniqe.office");
    console.log(this.props.formgroupsUniqe.office);
    */


      /*
    for(var i in data){
        if(data[i][0].tagGroup.indexOf('office')){
            tagbodyNodes.push(<div className="tab-pane" role="tabpanel" id="ofm-office" ><h3>{data[i][0].tagGroupName}</h3></div>);
        }else{
            tagbodyNodes.push(<div className="tab-pane" role="tabpanel" id="ofm-profile" ><h3>{data[i][0].tagGroupName}</h3></div>);
        }

    }
    */


    return(
      <div>
        <div className="btn-group" data-toggle="buttons">
        {tagheadNodes}
        </div>
        <div>
        {tagbodyNodes}
        </div>
      </div>
  );
  }
}
