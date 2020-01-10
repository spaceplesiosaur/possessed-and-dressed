import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './EntryForm.scss';
import MiniHost from '../MiniHost/MiniHost';
import { connect } from 'react-redux';

export class EntryForm extends Component {
  constructor() {
    super()
    this.state = {
      hostName: ""
    }
  }

  generateHostPics = () => {
    console.log('STATE', this.state)
    return this.props.hostList.map(host => {
      return (
        <MiniHost
          picture={host.picture}
          name={host.name}
        />
      )
    })
  }

  render() {
    return (
      <section className="app-entryForm">
        <h2>Welcome!  Choose the person you would like to possess</h2>
        <div className="entryForm-hostName-inputSet">
          <div className="entryForm-hostName-styling">
            <label htmlFor="hostName" className="entryForm-hostName-label">Chosen Host</label>
            <input name="hostName" className="entryForm-hostName-input"></input>
          </div>
        </div>
        <section className="app-entryForm-hostList">
          {this.generateHostPics()}
        </section>
        <NavLink to='/hosts/:id' render={({match}) => {
          return (
            <button className="choose-host-button">Choose</button>
          )
        }}/>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  hostList: state.hosts
})


export default connect(mapStateToProps, null)(EntryForm)
