import React, { Component } from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import EntryForm from '../EntryForm/EntryForm';
import HostPage from '../../components/HostPage/HostPage';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getInfo } from '../../util/apiCalls';
import { setHosts } from '../../actions/index.js';

export class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {
    this.supplyHosts()
  }

  supplyHosts = () => {
    return getInfo('https://color-seasons.herokuapp.com/hosts/', 'hosts')
    .then(data => this.props.storeHosts(data))
  }

  render() {
    return (
      <main className="app">
        <Route exact path='/' render={() => {
          return (
            <>
              <Header />
              <EntryForm />
            </>
          )
        }} />
        <Route path='/hosts/:id' render={(match) => {
          console.log('MATCH', match.match.params)
          const selectedHost = this.props.hostList.find(host => {
            console.log('ID', host.id)
            return host.id === parseInt(match.match.params.id)
          })

          return (
            selectedHost && <HostPage host={selectedHost}/>
          )
        }}/>
      </main>
    );
  }
}

export const mapStateToProps = (state) => ({
  hostList: state.hosts,
  chosenHost: state.chosenHost
})

export const mapDispatchToProps = (dispatch) => ({
  storeHosts: hostData => dispatch(setHosts(hostData))
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
