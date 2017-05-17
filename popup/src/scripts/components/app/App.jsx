import React, {Component} from 'react';
import List from './list'
import Form from './form'
import $ from 'jquery'
import {connect} from 'react-redux';


let url="";
class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      //data: ["id":"","url":"","tags":"","createdate":"","updatedate":"","autor_id":"","rating":""]
      data:[],
      formnames: this.props.formnames,
      url:url,
      toggle: ""
    };
  }
  loadFormsFromServer() {
  var apiurl="https://yattaru.net/wp-json/wp/v2/oneformall/view";
//URLを取得できたら開始
  if(url!=""){
    var formdata={"url":url};
      $.ajax({
        url: apiurl,
        dataType: 'json',
        cache: false,
        data: formdata,
        success: (data) => {
          var data=JSON.parse(data);
          console.log("JSON.parse(data)");
          console.log(data);
          url="";//実行後URLを空にする
        if(data){
          console.log("data:true");
          this.setState({toggle: "open"});
          //this.setState({data: JSON.parse(data)});
          this.initconverttags(data);


        }else{
          console.log("data:false");
          this.setState({toggle: "close"});
          console.log(data);
        }

        //console.log(data);
        //"[{"id":"12","url":"https:\/\/ssl.kao.com\/jp\/kanebo-soudan\/","tags":"[{\"tag\":\"tel2\",\"inputName\":\"EU_TEL2\",\"tagOrder\":\"1\"},{\"tag\":\"last-name\",\"inputName\":\"EU_FNAME\",\"tagOrder\":\"1\"},{\"tag\":\"last-name-katakana\",\"inputName\":\"EU_KFNAME\",\"tagOrder\":\"1\"},{\"tag\":\"first-name-katakana\",\"inputName\":\"EU_KLNAME\",\"tagOrder\":\"1\"},{\"tag\":\"email\",\"inputName\":\"EU_EMAIL\",\"tagOrder\":\"1\"},{\"tag\":\"tel1\",\"inputName\":\"EU_TEL1\",\"tagOrder\":\"1\"},{\"tag\":\"first-name\",\"inputName\":\"EU_LNAME\",\"tagOrder\":\"1\"},{\"tag\":\"tel3\",\"inputName\":\"EU_TEL3\",\"tagOrder\":\"1\"},{\"tag\":\"zip1\",\"inputName\":\"EU_ZIP1\",\"tagOrder\":\"1\"},{\"tag\":\"zip2\",\"inputName\":\"EU_ZIP2\",\"tagOrder\":\"1\"},{\"tag\":\"city\",\"inputName\":\"EU_ADD1\",\"tagOrder\":\"1\"},{\"tag\":\"addr\",\"inputName\":\"EU_ADD2\",\"tagOrder\":\"1\"},{\"tag\":\"build\",\"inputName\":\"EU_ADD3\",\"tagOrder\":\"1\"}]","autor_id":"20","rating":null,"createdate":"2017-04-12 13:14:14","updatedate":"2017-04-12 13:55:21"},{"id":"6","url":"https:\/\/ssl.kao.com\/jp\/kanebo-soudan\/","tags":"[{\"tag\":\"last-name\",\"inputName\":\"EU_FNAME\",\"tagOrder\":\"1\"},{\"tag\":\"first-name\",\"inputName\":\"EU_LNAME\",\"tagOrder\":\"1\"}]","autor_id":"10","rating":null,"createdate":"2017-04-11 19:30:11","updatedate":"2017-04-11 22:35:58"}]"
         },
        error: (xhr, status, err) => {

          this.setState({toggle: "err"});
          console.error(url, status, err.toString());
          url="";//実行後URLを空にする
        }
      });
      }
    }
  componentDidMount() {

    if(!url){

    chrome.runtime.sendMessage({
      type: "url",
      text: "Taka"
    },
      function (response) {
        console.log(response);
          url=response.url;
          //tabid=response.id;
      }
    );

  }

//URLを取得できるまで繰り返し実行。実行後URLを殻にする
    setInterval(this.loadFormsFromServer.bind(this),2000);
  }
  render() {
    var ListNodes;
    if(this.state.toggle=="open"){
      ListNodes =<List data={this.state.data} formnames={this.props.formnames} dispatch={this.props.dispatch}  />
    }else if(this.state.toggle=="close"){
    ListNodes =<div>おめでとう。あなたが初めての登録者です。新規追加できます。</div>
    }else if(this.state.toggle=="err"){
    ListNodes =<div>読み込みエラー。更新するか新規追加をお願いします。</div>
    }else{
      ListNodes =<div>読み込み中...</div>
    }
    return (
    <div className='commentBox'>
    <div className="card">
    <div className="card-header">
      <h2>登録フォーム一覧</h2>
      </div>
      <div className="card-block">
      {ListNodes}
      <Form />
      </div>
      </div>
    </div>
    );
  }
  //使用するタグのみの配列
  initconverttags(datas){
    console.log("initconverttags");
    console.log(datas);

    for ( var key in datas) {
    var data = datas[key];
    var tags=JSON.parse(data["tags"])
    //console.log(tags);
    var officecnt=0;
    var pesonalcnt=0;
    var selectform=[];
        for ( var key2 in tags) {
        var tag=tags[key2];

        var fn=this.props.formnames[tag["tag"]];
            if(!tag["tag"].indexOf('office')){
            officecnt++;
            }else{
            pesonalcnt++;
            }
        selectform.push({"tagGroupName":fn["tagGroupName"],"tagGroup":fn["tagGroup"],"tagName":fn["tagName"],"tag":tag["tag"],"inputName":tag["inputName"],"tagOrder":tag["tagOrder"]});
        }
        datas[key]["tags"]=selectform;
        datas[key]["officecnt"]=officecnt;
        datas[key]["pesonalcnt"]=pesonalcnt;
    }

  this.setState({data:datas});
  console.log(datas);
  return datas;
  }

}

const mapStateToProps = (state) => {
  return {
    //count: state.count
    count: state.counter,
    formnames: state.formnames,
    getformdata: state.getformdata
  };
};

export default connect(mapStateToProps)(App);
