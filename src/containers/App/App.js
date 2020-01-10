import React, { Component } from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import EntryForm from '../EntryForm/EntryForm';
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
    console.log('PROPS', this.props)
    return getInfo('https://color-seasons.herokuapp.com/hosts/', 'hosts')
    .then(data => this.props.storeHosts(data))
  }

  render() {
    console.log('HOSTS', this.props.hostList)
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
      </main>
    );
  }
}

export const mapStateToProps = (state) => ({
  hostList: state.hosts
})

export const mapDispatchToProps = (dispatch) => ({
  storeHosts: hostData => dispatch(setHosts(hostData))
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
