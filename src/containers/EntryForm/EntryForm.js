import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EntryForm.scss';
import MiniHost from '../MiniHost/MiniHost';
import { connect } from 'react-redux';
import { chooseHost } from '../../actions/index.js'

export class EntryForm extends Component {
  constructor() {
    super()
    this.state = {
      hostName: "",
      error: false,
      inputClass: "entryForm-hostName-input"
    }
  }

  generateHostPics = () => {
    return this.props.hostList.map(host => {
      return (
        <MiniHost
          picture={host.picture}
          name={host.name}
          id={host.id}
        />
      )
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  findHost = () => {
    const foundHost = this.props.hostList.find(host => {
      return host.name === this.state.hostName
    })

    return (foundHost ? foundHost: 'error')
  }

  handleError = () => {
    this.state.error === true &&
    this.setState({inputClass: "entryForm-hostName-error", hostName: 'Only choose a name from the list'})

  }

  handleClick = () => {
    return this.findHost() !== 'error' ?
      this.props.chooseAHost(this.findHost()) :
      this.setState({error: true})
      this.handleError()
  }

  render() {
    return (
      <section className="app-entryForm">
        <h2>Welcome!  Choose the person you would like to possess</h2>
        <div className="entryForm-hostName-inputSet">
          <div className="entryForm-hostName-styling">
            <label htmlFor="hostName" className="entryForm-hostName-label">Chosen Host:</label>
            <input name="hostName" className={this.state.inputClass} onChange={this.handleChange}></input>
            <button className="choose-host-button" onClick={this.handleClick}>Dress & Possess!</button>
          </div>
        </div>
        <section className="app-entryForm-hostList">
          {this.generateHostPics()}
        </section>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  hostList: state.hosts,
  host: state.chosenHost
})

export const mapDispatchToProps = (dispatch) => ({
  chooseAHost: hostInfo => dispatch(chooseHost(hostInfo))
})
export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)
