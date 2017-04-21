import React, {Component} from 'react';
import Viewitemdetail from './viewitemdetail'
export default class Viewitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actives: [],
      tags: []
    };
    console.log(this.props.storeforms);
  }
  changetoggle(e) {
    //console.log($(e.target).text());
    console.log("e.target.value");
    console.log(this._reactInternalInstance._rootNodeID);
    console.log(e.target.value);
    if(e.target.value){
      var actives=this.state.actives;
      var index=actives.indexOf(e.target.value)
      if(index!= -1){
        console.log("index");
        actives.splice(index,1);
      }else{
        console.log("noindex");
        actives.push(e.target.value);
      }
      this.setState({"actives":actives});
    }
    console.log("this.state.actives");
  console.log(this.state.actives);
  console.log(this.props.inputname);

  var addtext="";
  for(var key in actives){
    addtext+=this.props.storeforms[actives[key]];
  }

  $('input[name="'+this.props.inputname+'"]').val(addtext);
  $('input[name="'+this.props.inputname+'"]').addClass("addtext");
   //inputname={this.props.inputname}
    return ;
  }
  render() {
    //console.log(this.props.tags);
    var tags=this.props.tags;
    var ViewitemheadNodes=[];
    var ViewitembodyNodes=[];
      for(var key in tags){
        ViewitemheadNodes.push(<h3 className="tagGroupName"><button type="button" className="btn btn-default btn-sm">{tags[key][0].tagGroupName}</button></h3>);
          for(var i in tags[key]){
            if(this.state.actives.indexOf(tags[key][i].tag) != -1){
              ViewitemheadNodes.push(<label className="btn btn-primary active"><input type="checkbox" onClick={this.changetoggle.bind(this)}  autoComplete="off" value={tags[key][i].tag} />{tags[key][i].tagName}</label>);
            }else{
              ViewitemheadNodes.push(<label className="btn btn-info" ><input type="checkbox" onClick={this.changetoggle.bind(this)} autoComplete="off" value={tags[key][i].tag} />{tags[key][i].tagName}</label>);
            }
          }
      }
    return(
      <div data-toggle="buttons">
          {ViewitemheadNodes}
        </div>
    );
  }

}
