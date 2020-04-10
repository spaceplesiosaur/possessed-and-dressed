import React, { Component } from 'react';
import './MiniHost.scss';

export class MiniHost extends Component {
  constructor({picture, name, happy_pic, change, click}) {
    super()
    this.state = {
      ishappy: true
    }
  }

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

  clickChooseHost = async (event) => {
    await this.props.change(event)
    await this.props.click()
  }

  render() {
    return (
      <div className="entryPage-miniHost-hostAvatar">
        <img src={this.switchPic()} className="host-avatar-picture" alt="host-screaming" onMouseEnter={this.scareHost} onMouseLeave={this.unScareHost} name="hostName" data-host={this.props.name} onClick={this.clickChooseHost}></img>
        <p className="host-avatar-name">{this.props.name}</p>
      </div>
    )
  }
}

export default MiniHost;
