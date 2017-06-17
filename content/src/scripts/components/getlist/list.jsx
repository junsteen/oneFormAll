import React, {Component} from 'react';
import Viewitem from './viewitem'
export default class List extends Component {
  render() {
    var i=0;
    var commentNodes = this.props.data.map((comment,i)=> {
      return(<Viewitem dispatch={this.props.dispatch} formnames={this.props.formnames}  data={this.props.data} autor_id={comment.autor_id} id={i} tags={comment.tags} pesonalcnt={comment.pesonalcnt} officecnt={comment.officecnt} key={i} ></Viewitem>);
      i++;
    });
    return(<ul className='list-group'>{commentNodes}</ul>);
  }
}
