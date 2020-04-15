import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './EntryForm.scss';
import MiniHost from '../MiniHost/MiniHost';
import { connect } from 'react-redux';
import { chooseHost } from '../../actions/index.js';
import PropTypes from 'prop-types';

export class EntryForm extends Component {
  constructor() {
    super()
    this.state = {
      hostName: "",
      error: false,
      inputClass: {input: "entryForm-hostName-input", text: "hidden"},
      hostPossessed: false,
    }
  }

  generateHostPics = () => {
    return this.props.hostList.map(host => {
      return (
        <MiniHost
          key={host.id}
          picture={host.picture}
          happy_pic={host.happy_picture}
          name={host.name}
          change={this.handleImageClick}
          click={this.handleClick}
          id={host.id}
        />
      )
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleImageClick = (event) => {
    this.setState({[event.target.name]: event.target.dataset.host})
  }

  findHost = () => {
    const foundHost = this.props.hostList.find(host => {
      return host.name === this.state.hostName
    })

    return (foundHost ? foundHost: 'error')
  }

  handleError = () => {
    this.state.error &&
    this.setState({inputClass: {input: "entryForm-hostName-inputError", text: ".entryForm-error-text"}})
  }

  handleClick = async () => {
    if (this.findHost() === 'error' || this.state.hostName === "") {
      await this.setState({error: true})
      this.handleError()
    } else {
      // this.supplyColorCategories()
      // this.supplyHexCodes()
      this.props.chooseAHost(this.findHost())
      this.setState({hostPossessed: true})
    }
  }

  render() {

    return (
      this.props.host.name ?
      <Redirect to={`/hosts/${this.props.host.id}`} /> :
      <section className="app-entryForm">
        <h2>Welcome!  Choose the person you would like to possess today.</h2>
        <div className="entryForm-hostName-inputSet">
          <div className="entryForm-hostName-styling">
            <label htmlFor="hostName" className="entryForm-hostName-label">Chosen Host:</label>
            <input name="hostName" id="hostName-input" className={this.state.inputClass.input} onChange={this.handleChange}></input>
            <button className="choose-host-button" onClick={this.handleClick} id="hostName-button">Dress & Possess!</button>
          </div>
          <p className={this.state.inputClass.text}>Only enter a name from the list!</p>
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
  chooseAHost: hostInfo => dispatch(chooseHost(hostInfo)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)

EntryForm.propTypes = {
  hostList: PropTypes.array,
  host: PropTypes.object,
  chooseColor: PropTypes.func
}
