import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import $ from 'jquery'

import App from './components/app/App';
import Timer from './components/timer/App';
import App2 from './components/getlist/App';

const proxyStore = new Store({portName: 'oneformall'});
const anchor = document.createElement('div');
anchor.id = 'ofa-form-timer-div';

document.body.insertBefore(anchor, document.body.childNodes[0]);




/*///////////////////////////////////////////////////
グローバル変数あり：初期化
/////////////////////////////////////////////////////*/
//ユーザーがアプリを起動したがどうか
var tagappinit=false;
//htmlを解析し、inputが複数ある場合に該当のフォームとして適合。
var selectorForm=initSerchForms();
if(selectorForm){

  //一番最初に表示さｒているインプットテキストを選択
  var selectorfirst=selectorForm+' input[type="text"]:visible:first';
  //アプリ表示
  $(selectorfirst).addClass("input-viewbtn");
  $(selectorfirst).css({'background-image':'url('+chrome.extension.getURL("icons/form_view.png")+')'});
  $(selectorfirst).data("toggle","close");
  //ユーザーがアプリを起動するための画像範囲を決定。
  var forminnerwidth=initFirstinputSetViewbtnArea();
  //アプリgetlist用DIVを追加
  $(selectorfirst).after(function(i) {
    return '<div id="getlist" class="ofa-form-titlediv"></div>';
  });
  $("#getlist").hide();
  $("#getlist").data("toggle","close");
  //アプリ用DIVを追加
  $('input[type="text"]').wrap(function(i) {
    return '<div class="ofa-form-div ofa-form-div'+i+'" data-ofa-form-div-id="'+i+'"></div>';
  });
  setDlagTagArea();

}
/*///////////////////////////////////////////////////
初期化：html解析
/////////////////////////////////////////////////////*/
function initSerchForms(){
  //form要素をカウント
  //var formcount=$('form').length;
  //$("#parent p:nth-child(2)").css("color", "red");
  var forms=[];
    $('form').each( function(index) {
      console.log(index);
      $(this).attr('data-form-id',index);
      var count=inputCountinForm('[data-form-id="'+index+'"]');
      forms.push({"data-form-id":index,"count":count});
  });
  console.log(forms);
  forms.sort(function(a,b){
    if(a.count<b.count) return 1;
    if(a.count > b.count) return -1;
    return 0;
  });
  console.log(forms);
  //もしEmailが一つだけ存在の場合
  var selectormail='[data-form-id="'+forms[0]["data-form-id"]+'"]'+' input[type="email"]';
  if(forms[0]["count"]>2){
    //var result=forms[0]["data-form-id"];
    var result='[data-form-id="'+forms[0]["data-form-id"]+'"]';
  }else if(selectormail){
    var result='[data-form-id="'+forms[0]["data-form-id"]+'"]';
  }else{
    var result=false;
  }
  return result;
}
function inputCountinForm(form){
  var selector=form+' input[type="text"]';
  var selectorpass=form+' input[type="password"]';
var count = $(selector).length+$(selectorpass).length;
return count;
}
function initFirstinputSetViewbtnArea(){

  var b = $(selectorfirst);
    console.log('外部余白込み：' + b.outerHeight(true) + '×' + b.outerWidth(true));
    var maxwidth=b.outerWidth(true);
    var btnwidth=40;
    var forminnerwidth=maxwidth-btnwidth;
  return forminnerwidth;
}



/*///////////////////////////////////////////////////
他ウインドウからのリクエスト
/////////////////////////////////////////////////////*/
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {
    case "addform":
      returnmsg(request.text, sendResponse);
      return true;
      break;
    default:
      console.log("Error: Unkown request.")
      console.log(request);
    }
  }
);

function returnmsg(name, callback) {
  var msg="新規追加開始";
  runtagApp("crome");
  callback(msg);


}


/*///////////////////////////////////////////////////
タグ挿入アプリ起動
/////////////////////////////////////////////////////*/
function runtagApp(mode) {
  if(!tagappinit){
  render(<Provider store={proxyStore}>
    <App2 />
  </Provider>,document.getElementById('getlist'));
  setDlagTagAreaApp();
  tagappinit=true;

  render(<Provider store={proxyStore}>
    <Timer />
  </Provider>,document.getElementById(anchor.id));

    $('div').each(function() {
    var w = $(this).css('overflow');
      if(w=="hidden"){
        $(this).css('overflow',"visible");
      }
    });

  }
if(mode=="crome"){
  $("#getlist").hide("slow");
  $("#getlist").data("toggle","close");

  $('[data-ddlistid="0"]').show("slow");
  $('[data-ddlistid="0"]').data("toggle","open");
}
  $(selectorfirst).css({'background-image':'url('+chrome.extension.getURL("icons/form_view_succes.png")+')'});
  $('.ofa-form-div').css({"position": "relative"});
  $('.ofa-tag-toggle-btn').show();


}







/*///////////////////////////////////////////////////
タグ追加アプリ
/////////////////////////////////////////////////////*/
function setDlagTagArea(){
$('input[type="text"]').addClass('droparea');
$('input[type="text"]').after(function(i) {
  //console.log($(this).attr("name"));
  return '<div class="ofa-tag-toggle-btn" data-ddlisttoggleid="'+i+'">▼</div><div class="ddlist ddlist'+i+'" data-ddlistid="'+i+'" data-inputname="'+$(this).attr("name")+'"></div></div>';
});

$('.ofa-tag-toggle-btn').hide();
$('.ddlist').hide();
$('[data-ddlistid]').data("toggle","close");

}
function setDlagTagAreaApp(){
var classnames=document.getElementsByClassName('ddlist');
console.log(classnames.length);

for(var i = 0; i < classnames.length; i++) { // 配列の長さ分の繰り返し
  var div ='.ddlist'+i+'';
  var inputname=$(div).data("inputname");
  var element =document.querySelector(div)
  render(<Provider store={proxyStore}>
    <App inputname={inputname} />
  </Provider>,element);

}


}

/*///////////////////////////////////////////////////
ユーザーイベント処理
/////////////////////////////////////////////////////*/
$(function(){

    $(selectorfirst).on('click', function(e) {
    console.log('offset=' + e.offsetX + ',' + e.offsetY);
    if(e.offsetX>forminnerwidth){
      console.log("くりっくされたよ");
        var runtagAppMode="htmlmode";
        runtagApp(runtagAppMode);
        var togle=$("#getlist").data("toggle");
        if(togle=="close"){
        $("#getlist").show("slow");
        $("#getlist").data("toggle","open");
      }else{
        $("#getlist").hide("slow");
        $("#getlist").data("toggle","close");
      }


      }
    });

    /*///////////////////////////////////////////////////
    新規追加用ボタン表示
    /////////////////////////////////////////////////////*/
    $('.ofa-tag-toggle-btn').on('click',function(){


      console.log(".toggle-btn click");
      var id=$(this).data('ddlisttoggleid');
      var togle=$('[data-ddlistid="'+id+'"]').data("toggle");
      if(togle=="close"){
        $('.ddlist').hide("slow");
        $('.ddlist').data("toggle","close");
      $('[data-ddlistid="'+id+'"]').show("slow");
      $('[data-ddlistid="'+id+'"]').data("toggle","open");
    }else{
      $('[data-ddlistid="'+id+'"]').hide("slow");
      $('[data-ddlistid="'+id+'"]').data("toggle","close");
    }
    });

});
