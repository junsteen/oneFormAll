import React, {Component} from 'react';
import Viewitemdetail from './viewitemdetail'
export default class Viewitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actives: []
    };

  }
  changestate(nextProps) {

    //console.log("changestate");
    var selectdata={};
    var activesdata={};

    for(var key in this.props.formnames){
        if(this.props.formnames[key]["inputName"]!=""){
          if(this.props.inputname==this.props.formnames[key]["inputName"]){
          selectdata[this.props.formnames[key]["tagOrder"]]=this.props.storeforms[this.props.formnames[key]["tag"]];
          activesdata[this.props.formnames[key]["tagOrder"]]=this.props.formnames[key]["tag"];
          }
        }
      }
      console.log("selectdata");
      console.log(selectdata);
      var addtext="";
      var actives=this.state.actives;
      for(var key in activesdata){
        actives.splice(Number(key)-1, 1, activesdata[key]);
        addtext+=selectdata[key];
      }
      console.log("actives");
      console.log(actives);
      if(actives.length>0){

      $('input[name="'+this.props.inputname+'"]').addClass("addtext");
      }
      $('input[name="'+this.props.inputname+'"]').val(addtext);
    return actives;

  }
  componentWillMount(){
    var actives=this.changestate();
      this.setState({"actives":actives});

  }
  componentWillReceiveProps(nextProps){
    /*
    console.log("更新されたよcomponentWillReceiveProps");
    console.log(nextProps.formnames);
    console.log("↑nextProps");
    console.log(this.props.formnames);
    console.log("↑this.props");
    */
    $('input[name="'+this.props.inputname+'"]').removeClass("addtext");
    $('input[name="'+this.props.inputname+'"]').val();
    var actives=this.changestate(nextProps);
      this.setState({"actives":actives});

  }
  changetoggle(e) {
    /*
    オーダー情報をフォーム配列に追加、次の描画に備える。
    */
    //console.log("this.props.formnames");
    //console.log(this.props.formnames);
    //console.log($(e.target).text());
  //  console.log("e.target.value");
    //console.log(this._reactInternalInstance._rootNodeID);
    //console.log(e.target.value);

    /*
    オーダー専用配列：配列になければ追加。あれば削除。
    */

      var actives=this.state.actives;
      var index=actives.indexOf(e.target.value)
      if(index!= -1){
        console.log("index");
        actives.splice(index,1);
      }else{
        console.log("noindex");
        actives.push(e.target.value);
      }


    //console.log("this.state.actives");
  //console.log(this.state.actives);
  //console.log(this.props.inputname);

  //console.log("this.props.formnames");
  //console.log(this.props.formnames);
  /*
  オーダー初期化：押されたものをとにかく一旦削除
  */
  var newformnames=this.props.formnames;
  if(newformnames[e.target.value]["inputName"]!=""){
    newformnames[e.target.value]["inputName"]="";
    newformnames[e.target.value]["tagOrder"]="";

  }
  /*
  オーダー初期化：このフォームに対して使用するタブ名にオーダー情報を順番に追加。
  */
  for(var key in actives){
    newformnames[actives[key]]["inputName"]=this.props.inputname;
    newformnames[actives[key]]["tagOrder"]=Number(key)+1;
    console.log("newformnames[actives[key]][tagOrder]");
    console.log(Number(key)+1);
  }

  /*
  フォーム情報更新：オーダー情報含む
  */
  //console.log("newformnames");
  //console.log(newformnames);
    this.props.dispatch({
      type: 'ADD_GET_FOMENAMES',
      payload: newformnames
    });
    //console.log('click');
    //console.log(this.props.storeforms);
   //inputname={this.props.inputname}

  }
  render() {
    //console.log(this.props.tags);
    var tags=this.props.tags;
    var ViewitemheadNodes=[];
    var ViewitembodyNodes=[];

      for(var key in tags){
        ViewitemheadNodes.push(<h3 className="tagGroupName"><button type="button" className="btn btn-default btn-sm">
        {tags[key][0].tagGroupName}</button></h3>);
          for(var i in tags[key]){
            //if(this.state.actives.indexOf(tags[key][i].tag) != -1){

            if(this.props.formnames[tags[key][i].tag]["inputName"] != ""){
                if(this.props.inputname==this.props.formnames[tags[key][i].tag]["inputName"]){
                ViewitemheadNodes.push(<label className="btn btn-primary active"><input type="checkbox" onClick={this.changetoggle.bind(this)}  autoComplete="off" value={tags[key][i].tag} />{tags[key][i].tagName}</label>);
              }else{
                ViewitemheadNodes.push(<label className="btn btn-info" ><input type="checkbox" onClick={this.changetoggle.bind(this)} autoComplete="off" value={tags[key][i].tag} />{tags[key][i].tagName}</label>);
              }
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
