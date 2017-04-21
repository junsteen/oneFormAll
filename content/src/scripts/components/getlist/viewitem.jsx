import React, {Component} from 'react';
import Viewitemdetail from './viewitemdetail'
export default class Viewitem extends Component {
  constructor(props) {

    super(props);

    this.state = {
      toggle: "close"
    };

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
        <button type="button" className="btn btn-primary btn-block">使用する</button>
        </li>
    );
  }

}
