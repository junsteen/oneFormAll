import React, {Component} from 'react';
import Viewitemdetail from './viewitemdetail'
export default class Viewitem extends Component {
  constructor(props) {

    super(props);

    this.state = {
      toggle: "close"
    };
    console.log("PROPS初期viewitemdetailthis.props.formnames");
    console.log(this.props.formnames);
    console.log("this.props.data");
    console.log(this.props.data);

  }
  setformdata() {
    chrome.runtime.sendMessage({
      type: "addform",
      text: ""
    },
      function (response) {
        console.log(response);
          //tabid=response.id;
      }
    );
    console.log("selectdata");
    var selecttags=this.props.data[this.props.id]["tags"];
    console.log(selecttags);
    //
    var newformnames=this.props.formnames;

    for(var key in this.props.formnames){
     newformnames[key]["inputName"]="";
     newformnames[key]["tagOrder"]="";
   }
    for(var key in selecttags){
     newformnames[selecttags[key]["tag"]]["inputName"]=selecttags[key]["inputName"];
     newformnames[selecttags[key]["tag"]]["tagOrder"]=selecttags[key]["tagOrder"];
   }
    console.log("PROPS初期化newformnames");
   console.log(newformnames);
   console.log("RESETformnames");
   this.props.dispatch({
      type: 'RESET_ADD_FOMENAMES',
      payload: newformnames
    });

     console.log(this.props.formnames);
  }
  changetoggle() {
  if(this.state.toggle=="close"){
  this.setState({toggle: "open"});
  }else{
  this.setState({toggle: "close"});
  }
  console.log(this.state.toggle);
    return ;
  }
  render() {

    var ViewitemdetailNodes;
    if(this.state.toggle=="open"){
      ViewitemdetailNodes =   <Viewitemdetail tags={this.props.tags} />;
    }else{

    }

    return(
        <li className='list-group-item'><h3 className='commentAuthor'>
          {this.props.autor_id}
          <button type="button" className="btn btn-default btn-sm">個人:{this.props.pesonalcnt}</button>
          <button type="button" className="btn btn-default btn-sm">会社:{this.props.officecnt}</button>
          <button type="button" onClick={this.changetoggle.bind(this)} className="btn btn-default btn-sm">使用タグ一覧</button>
        </h3>
        {ViewitemdetailNodes}
        <button type="button" onClick={this.setformdata.bind(this)} className="btn btn-primary btn-block">使用する</button>
        </li>
    );
  }

}
