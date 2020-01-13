import React, { Component } from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import EntryForm from '../EntryForm/EntryForm';
import ColorBar from '../ColorBar/ColorBar';
import HostPage from '../../components/HostPage/HostPage';
import ColorFeedback from '../ColorFeedback/ColorFeedback';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getInfo } from '../../util/apiCalls';
import { setHosts } from '../../actions/index.js';
import { setSeasons } from '../../actions/index.js';

export class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {
    this.supplyHosts()
    this.supplySeasons()
  }

  supplyHosts = () => {
    return getInfo('https://color-seasons.herokuapp.com/hosts/', 'hosts')
    .then(data => this.props.storeHosts(data))
  }

  supplySeasons = () => {
    getInfo('https://color-seasons.herokuapp.com/seasons/', 'seasonal analysis')
    .then(data => this.props.storeSeasons(data))
    // .then(data => console.log(data))
  }

  determineHostSeason = () => {
    return this.props.seasonList.find(season => {
      return season.id === this.props.chosenHost.season
    })
  }

  determineMatch = () => {
    const hostSeason = this.determineHostSeason()

    const isAMatch = hostSeason.colors.includes(this.props.chosenColor.id)
    // const isAMatch = hostSeason.colors.includes(colorID => {
    //   console.log('colorID from host season', colorID)
    //   console.log('chosen color id', this.props.chosenColor.id)
    //   return colorID === this.props.chosenColor.id
    // })

    return isAMatch
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
        <Route exact path='/hosts/:id' render={(match) => {
          const selectedHost = this.props.hostList.find(host => {
            return host.id === parseInt(match.match.params.id)
          })

          return (
            selectedHost && (
              <>
                <HostPage host={selectedHost}/>
                <ColorBar />
              </>
            )
          )
        }}/>
        <Route exact path='/hosts/:id/:colorName' render={(match) => {
          return (
            <>
            <Header />
            <ColorFeedback
              match={this.determineMatch()}
              season={this.determineHostSeason().name}
            />
            </>
          )
        }}/>
      </main>
    );
  }
}

export const mapStateToProps = (state) => ({
  hostList: state.hosts,
  seasonList: state.seasons,
  chosenHost: state.chosenHost,
  chosenColor: state.chosenColor,
  hexList: state.allColors
})

export const mapDispatchToProps = (dispatch) => ({
  storeHosts: hostData => dispatch(setHosts(hostData)),
  storeSeasons: seasonData => dispatch(setSeasons(seasonData))
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
