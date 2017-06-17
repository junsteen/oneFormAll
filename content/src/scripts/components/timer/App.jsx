import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from './list'


class timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeforms: this.props.storeforms,
      formnames: this.props.formnames,
      timer: this.props.timers,
      toggle: "play"
    };

  }

  componentDidMount() {
    this.props.dispatch({
      type: 'CHANGE_MODE',
      payload: "confirmtime"
    });

    //this.interval = setInterval(this.gettimenow,1000,this.props); // タイマーをセット(1000ms間隔)

  }
  componentWillUnmount() {
    //clearInterval(this.interval);
  }
  componentWillReceiveProps(nextProps){
    clearInterval(this.interval);
    if(this.state.toggle=="play"){

    //console.log("タグ挿入アプリcomponentWillReceiveProps開始");
    //console.log(this.props);
    //console.log(nextProps);
    this.interval = setInterval(this.gettimenow,1000,nextProps);
  }

  }
  togglebtn(){
    console.log(this.state.toggle);
    if(this.state.toggle=="stop"){
    this.setState({toggle: "play"});
    var mode=this.getmodename(this.props.timers);
    console.log(mode);
    this.props.dispatch({
      type: 'REPLAY_TIMES',
      payload: mode
    });
    this.interval = setInterval(this.gettimenow,1000,this.props);
    }else{
    this.setState({toggle: "stop"});

    }

      return ;

  }
  resultbtn(){

    this.setState({toggle: "stop"});
      return ;

  }
  gettimenow(props){
    var mode="";
    for(var key in props.timers){
      if(props.timers[key].select){
        mode=key;
      }
    }
    //console.log("ADD_GET_TIMESmode");
    //console.log(mode);
    var peyloads={"storeforms":props.storeforms,"formnames":props.formnames,"mode":mode};
      props.dispatch({
        type: 'ADD_GET_TIMES',
        payload: peyloads
      });


  }
  getmodename(propstimers){
    var mode="";
    for(var key in propstimers){

      if(propstimers[key].select){

        mode=key;
      }
    }
    return mode;


  }

  render() {
    var timemode = [];
    for(var key in this.props.timers){

      if(this.props.timers[key].select){
        if(this.state.toggle=="stop"){
          timemode.push(<div>{this.props.timers[key].tagModeName}:{this.props.timers[key].time}<button type="button" onClick={this.togglebtn.bind(this)} className="btn btn-success">▶開始</button></div>);
        }else{
          timemode.push(<div>{this.props.timers[key].tagModeName}:{this.props.timers[key].time}<button type="button" onClick={this.togglebtn.bind(this)} className="btn btn-danger">❚❚一時停止</button></div>);
        }

      }
    }
    var ListNodes;
    ListNodes =<List dispatch={this.props.dispatch} timer={this.props.timers}/>
    //console.log("タグ挿入アプリrender開始");

    //Count: {this.props.count}
    return (
      <div className="card">
        {timemode}
        {ListNodes}
<button type="button" onClick={this.resultbtn.bind(this)} className="btn btn-info timer-result-btn">選択完了<span>定義情報と時間情報を送信。アプリを終了</span></button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //count: state.count
    timers: state.timer,
    formnames: state.formnames,
    storeforms: state.storeforms
  };
};

export default connect(mapStateToProps)(timer);
