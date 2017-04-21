import React, {Component} from 'react';
import Viewitem from './viewitem'
export default class List extends Component {
  render() {
    var commentNodes = this.props.data.map((comment)=> {
      return(<Viewitem autor_id={comment.autor_id} id={comment.id} tags={comment.tags} pesonalcnt={comment.pesonalcnt} officecnt={comment.officecnt} key={comment.id}></Viewitem>);
    });
    return(<ul className='list-group'>{commentNodes}</ul>);
  }
}
