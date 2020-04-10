import React, { Component } from 'react';
import './MiniHost.scss';

export class MiniHost extends Component {
  constructor({picture, name, happy_pic}) {
    super()
    this.state = {
      ishappy: true
    }
  }

  // switchPic = () => {
  //   return (
  //     this.state.happy === true ?
  //     this.props.picture :
  //     this.props.happy_pic
  //   )
  // }

  switchPic = () => {
    if (this.state.ishappy === true) {
      return this.props.happy_pic
    }

    if (this.state.ishappy === false) {
      return this.props.picture
    }
  }

  scareHost = () => {
    this.setState({ishappy: false})
  }

  unScareHost = () => {
    this.setState({ishappy: true})
  }

  render() {
    return (
      <div className="entryPage-miniHost-hostAvatar">
        <img src={this.switchPic()} className="host-avatar-picture" alt="host-screaming" onMouseEnter={this.scareHost} onMouseLeave={this.unScareHost}></img>
        <p className="host-avatar-name">{this.props.name}</p>
      </div>
    )
  }
}

export default MiniHost;
