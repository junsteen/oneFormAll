import React, {Component} from 'react';

export default class Form extends Component {
  addform() {
    chrome.runtime.sendMessage({
      type: "addform",
      text: ""
    },
      function (response) {
        console.log(response);
          //tabid=response.id;
      }
    );
    this.props.dispatch({
       type: 'RESET_FOMENAMES'
     });
    return ;
  }
  render() {
    return(
      <div className='card-footer text-muted'>
      <button type="button" onClick={this.addform.bind(this)} className="btn btn-info">新規追加</button>
      </div>
    );
  }
}
