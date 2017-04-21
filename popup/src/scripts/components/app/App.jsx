import React, {Component} from 'react';
import List from './list'
import Form from './form'
import $ from 'jquery'

var url="";

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      //data: ["id":"","url":"","tags":"","createdate":"","updatedate":"","autor_id":"","rating":""]
      data: [],
      formnames: this.initformname(),
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
          url="";//実行後URLを空にする
        if(data){
          this.setState({toggle: "open"});
          //this.setState({data: JSON.parse(data)});
          this.initconverttags(data);
          console.log(data);

        }else{

          this.setState({toggle: "close"});
          console.log(data);
        }

        //console.log(data);
        //"[{"id":"12","url":"https:\/\/ssl.kao.com\/jp\/kanebo-soudan\/","tags":"[{\"tag\":\"tel2\",\"inputName\":\"EU_TEL2\",\"tagOrder\":\"1\"},{\"tag\":\"last-name\",\"inputName\":\"EU_FNAME\",\"tagOrder\":\"1\"},{\"tag\":\"last-name-katakana\",\"inputName\":\"EU_KFNAME\",\"tagOrder\":\"1\"},{\"tag\":\"first-name-katakana\",\"inputName\":\"EU_KLNAME\",\"tagOrder\":\"1\"},{\"tag\":\"email\",\"inputName\":\"EU_EMAIL\",\"tagOrder\":\"1\"},{\"tag\":\"tel1\",\"inputName\":\"EU_TEL1\",\"tagOrder\":\"1\"},{\"tag\":\"first-name\",\"inputName\":\"EU_LNAME\",\"tagOrder\":\"1\"},{\"tag\":\"tel3\",\"inputName\":\"EU_TEL3\",\"tagOrder\":\"1\"},{\"tag\":\"zip1\",\"inputName\":\"EU_ZIP1\",\"tagOrder\":\"1\"},{\"tag\":\"zip2\",\"inputName\":\"EU_ZIP2\",\"tagOrder\":\"1\"},{\"tag\":\"city\",\"inputName\":\"EU_ADD1\",\"tagOrder\":\"1\"},{\"tag\":\"addr\",\"inputName\":\"EU_ADD2\",\"tagOrder\":\"1\"},{\"tag\":\"build\",\"inputName\":\"EU_ADD3\",\"tagOrder\":\"1\"}]","autor_id":"20","rating":null,"createdate":"2017-04-12 13:14:14","updatedate":"2017-04-12 13:55:21"},{"id":"6","url":"https:\/\/ssl.kao.com\/jp\/kanebo-soudan\/","tags":"[{\"tag\":\"last-name\",\"inputName\":\"EU_FNAME\",\"tagOrder\":\"1\"},{\"tag\":\"first-name\",\"inputName\":\"EU_LNAME\",\"tagOrder\":\"1\"}]","autor_id":"10","rating":null,"createdate":"2017-04-11 19:30:11","updatedate":"2017-04-11 22:35:58"}]"
         },
        error: (xhr, status, err) => {
          url="";//実行後URLを空にする
          this.setState({toggle: "err"});
          console.error(this.props.url, status, err.toString());
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
      ListNodes =<List data={this.state.data} />
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


    for ( var key in datas) {
    var data = datas[key];
    var tags=JSON.parse(data["tags"])
    //console.log(tags);
    var officecnt=0;
    var pesonalcnt=0;
    var selectform=[];
        for ( var key2 in tags) {
        var tag=tags[key2];
        var fn=this.state.formnames[tag["tag"]];
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

    //タグ生成フェーズ：タグ情報・登録済みフォーム情報（input[name]）※無ければ空を取得
  initformname(){
    var  formnames =
    {"last-name":{"tagName":"姓","tag":"last-name","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"first-name":{"tagName":"名","tag":"first-name","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"last-name-katakana":{"tagName":"セイ","tag":"last-name-katakana","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"first-name-katakana":{"tagName":"メイ","tag":"first-name-katakana","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"last-name-hirakana":{"tagName":"せい","tag":"last-name-hirakana","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"first-name-hirakana":{"tagName":"めい","tag":"first-name-hirakana","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"last-name-roma":{"tagName":"性:ローマ","tag":"last-name-roma","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"first-name-roma":{"tagName":"名:ローマ","tag":"first-name-roma","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"name-space":{"tagName":"空白挿入","tag":"name-space","tagGroup":"name","tagGroupName":"氏名","inputName":"","tagOrder":""}
    ,"email":{"tagName":"Email","tag":"email","tagGroup":"contact-email","tagGroupName":"メール","inputName":"","tagOrder":""}
    ,"re-email":{"tagName":"Email(再)","tag":"re-email","tagGroup":"contact-email","tagGroupName":"メール","inputName":"","tagOrder":""}
    ,"tel1":{"tagName":"TEL:1","tag":"tel1","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
    ,"tel2":{"tagName":"TEL:2","tag":"tel2","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
    ,"tel3":{"tagName":"TEL:3","tag":"tel3","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
    ,"contact-tel-byte2":{"tagName":"半角→全角","tag":"contact-tel-byte2","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
    ,"contact-tel-hyphen":{"tagName":"-　挿入","tag":"contact-tel-hyphen","tagGroup":"contact-tel","tagGroupName":"電話","inputName":"","tagOrder":""}
    ,"zip1":{"tagName":"〒前","tag":"zip1","tagGroup":"contact-zip","tagGroupName":"郵便番号","inputName":"","tagOrder":""}
    ,"zip2":{"tagName":"〒後","tag":"zip2","tagGroup":"contact-zip","tagGroupName":"郵便番号","inputName":"","tagOrder":""}
    ,"contact-zip-byte2":{"tagName":"半角→全角","tag":"contact-zip-byte2","tagGroup":"contact-zip","tagGroupName":"郵便番号","inputName":"","tagOrder":""}
    ,"contact-zip-hyphen":{"tagName":"-　挿入","tag":"contact-zip-hyphen","tagGroup":"contact-zip","tagGroupName":"郵便番号","inputName":"","tagOrder":""}
    ,"pref":{"tagName":"都道府県","tag":"pref","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
    ,"city":{"tagName":"市区町村","tag":"city","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
    ,"addr":{"tagName":"詳細","tag":"addr","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
    ,"build":{"tagName":"ビル名","tag":"build","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
    ,"contact-byte2":{"tagName":"半角→全角","tag":"contact-byte2","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
    ,"contact-space":{"tagName":"空白挿入","tag":"contact-space","tagGroup":"contact","tagGroupName":"住所","inputName":"","tagOrder":""}
    ,"office-name":{"tagName":"社名","tag":"office-name","tagGroup":"office","tagGroupName":"会社","inputName":"","tagOrder":""}
    ,"office-div":{"tagName":"部署名","tag":"office-div","tagGroup":"office","tagGroupName":"会社","inputName":"","tagOrder":""}
    ,"office-position":{"tagName":"役職名","tag":"office-position","tagGroup":"office","tagGroupName":"会社","inputName":"","tagOrder":""}
    ,"office-email":{"tagName":"Email","tag":"office-email","tagGroup":"office-email","tagGroupName":"会社","inputName":"","tagOrder":""}
    ,"re-office-email":{"tagName":"Email(再)","tag":"re-office-email","tagGroup":"office-email","tagGroupName":"会社","inputName":"","tagOrder":""}
    ,"office-tel1":{"tagName":"TEL:1","tag":"office-tel1","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
    ,"office-tel2":{"tagName":"TEL:2","tag":"office-tel2","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
    ,"office-tel3":{"tagName":"TEL:3","tag":"office-tel3","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
    ,"office-fax1":{"tagName":"FAX:1","tag":"office-fax1","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
    ,"office-fax2":{"tagName":"FAX:2","tag":"office-fax2","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
    ,"office-fax3":{"tagName":"FAX:3","tag":"office-fax3","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
    ,"office-tel-byte2":{"tagName":"半角→全角","tag":"office-tel-byte2","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
    ,"office-tel-hyphen":{"tagName":"-　挿入","tag":"office-tel-hyphen","tagGroup":"office-tel","tagGroupName":"会社電話","inputName":"","tagOrder":""}
    ,"office-zip1":{"tagName":"〒前","tag":"office-zip1","tagGroup":"office-zip","tagGroupName":"会社郵便","inputName":"","tagOrder":""}
    ,"office-zip2":{"tagName":"〒後","tag":"office-zip2","tagGroup":"office-zip","tagGroupName":"会社郵便","inputName":"","tagOrder":""}
    ,"office-zip-byte2":{"tagName":"半角→全角","tag":"office-zip-byte2","tagGroup":"office-zip","tagGroupName":"会社郵便","inputName":"","tagOrder":""}
    ,"office-zip-hyphen":{"tagName":"-　挿入","tag":"office-zip-hyphen","tagGroup":"office-zip","tagGroupName":"会社郵便","inputName":"","tagOrder":""}
    ,"office-pref":{"tagName":"都道府県","tag":"office-pref","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
    ,"office-city":{"tagName":"市区町村","tag":"office-city","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
    ,"office-addr":{"tagName":"詳細","tag":"office-addr","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
    ,"office-build":{"tagName":"ビル名","tag":"office-build","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
    ,"office-contact-byte2":{"tagName":"半角→全角","tag":"office-contact-byte2","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}
    ,"office-contact-space":{"tagName":"空白挿入","tag":"office-contact-space","tagGroup":"office-contact","tagGroupName":"会社住所","inputName":"","tagOrder":""}

  };
  return formnames;
  }
}


export default App;
