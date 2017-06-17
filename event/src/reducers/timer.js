

function getinitialtime(){
  let times={"inputtime":{"tagName":"キー入力時間","tagModeName":"キー入力中","tag":"inputtime","select":false,"starttime":starttime(),"time":"00:00:00","mtime":"0"}
,"selecttime":{"tagName":"タグ選択時間","tagModeName":"タグ選択中","tag":"selecttime","select":false,"starttime":starttime(),"time":"00:00:00","mtime":"0"}
,"confirmtime":{"tagName":"タグ確認時間","tagModeName":"タグ確認中","tag":"confirmtime","select":true,"starttime":starttime(),"time":"00:00:00","mtime":"0"}
,"mytime":{"tagName":"合計節約時間","tag":"mytime","time":"00:00:00"}
//,"alltime":{"tagName":"みんなの節約時間","tag":"alltime","time":"00:00:00"}

  };

  return times;
}
function starttime(){
  var date_obj = new Date();
  var time_start = date_obj.getTime();
  return time_start;
}

function get_updatetime(time,starttime,payloads){

//window.alert(starttime);
  var date_obj2 = new Date();
  var updatetime = parseInt(date_obj2.getTime() - starttime);
  time[payloads.mode].time=formattime(updatetime);
  time[payloads.mode].mtime=updatetime;


  var totalmtime=0;

  for(var key in payloads.formnames){

      if(payloads.formnames[key]["inputName"]!=""){
        totalmtime += parseInt(payloads.storeforms[key]["time"]);
        }
      }

  time["inputtime"].mtime=totalmtime;
  time["inputtime"].time=formattime(totalmtime);
  //window.alert(times[mode].time);
  var totalmymtime=0;
  totalmymtime=parseInt(time["inputtime"].mtime) + parseInt(time["selecttime"].mtime) + parseInt(time["confirmtime"].mtime);

  time["mytime"].mtime=totalmymtime;
  time["mytime"].time=formattime(totalmymtime);

  return time;
}
function formattime(time){
  if(time!=0){
  var hh = parseInt(time / (60 * 60 * 1000));
  var mm = parseInt(time / (60 *1000) % 60);
  var ss = time / (1000) % 60;
  var ss = Math.floor( ss ) ;
  // 数値が1桁の場合、頭に0を付けて2桁で表示する指定
	if(hh < 10) { hh = "0" + hh; }
	if(mm < 10) { mm = "0" + mm; }
	if(ss < 10) { ss = "0" + ss; }
  var formattime=hh+':'+mm+':'+ss;
}else{
  var formattime="00:00:00";
}

  return formattime;
}
function get_updatetime_replay(time,modename){

  time[modename].starttime=starttime();
  time[modename].starttime=time[modename].starttime - time[modename].mtime;

  time=get_updatetime(time,time[modename].starttime,modename);
  return time;
}

function get_updatemode(time,modename){
//window.alert(starttime);
  for(var key in time){
  time[key].select=false;
  time[key].starttime=starttime();
  }
  time[modename].select=true;
  return time;
}

function set_updatetime(time,payload){
  var totalmtime=0;
  for(var key in payload.formnames){
      if(payload.formnames[key]["inputName"]!=""){

        totalmtime += parseInt(payload.storeforms[key]["time"]);
        }
      }
  //window.alert(totalmtime);
  time["inputtime"].mtime=totalmtime;
  time["inputtime"].time=formattime(totalmtime);

  return time;
}
const initialState = getinitialtime();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GET_TIMES':
    //window.alert("ADD_GET_TIMES");
    return Object.assign({}, state, get_updatetime(state,state[action.payload.mode].starttime,action.payload));

    case 'CHANGE_MODE':
    //window.alert("ADD_GET_TIMES");
    return Object.assign({}, state, get_updatemode(state,action.payload));

    case 'REPLAY_TIMES':
    return Object.assign({}, state, get_updatetime_replay(state,action.payload));

    case 'RESET_TIMES':
    return Object.assign({}, initialState);

    case 'ADD_INPUT_TIMES':
    return Object.assign({}, state, set_updatetime(state,action.payload));

    default:
      return state;

  }
};
