import React, { Component } from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import EntryForm from '../EntryForm/EntryForm';
import ColorBar from '../ColorBar/ColorBar';
import HostPage from '../../components/HostPage/HostPage';
import ColorFeedback from '../ColorFeedback/ColorFeedback';
import ErrorPage from '../../components/404Page/404Page';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
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
  }

  determineHostSeason = () => {
    return this.props.seasonList.find(season => {
      return season.id === this.props.chosenHost.season
    })
  }

  determineMatch = () => {
    const hostSeason = this.determineHostSeason()
    const isAMatch = hostSeason.colors.includes(this.props.chosenColor.id)

    return isAMatch
  }
  render() {
    return (
      <main className="app">
      <Switch>
        <Route exact path="/" render={() => {
          return (
            <>
              <Header />
              <EntryForm />
            </>
          )
        }} />
        <Route exact path={`${process.env.PUBLIC_URL}/hosts/:id`} render={(match) => {
          const selectedHost = this.props.hostList.find(host => {
            return host.id === parseInt(match.match.params.id)
          })

          return (
            selectedHost && (
              <>
                <Header />
                <HostPage host={selectedHost}/>
                <ColorBar />
              </>
            )
          )
        }}/>
        <Route exact path={`${process.env.PUBLIC_URL}/hosts/:id/:colorName`} render={(match) => {
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
        <Route path='*' render={({ match }) => {
          return (
            <>
              <Header />
              <h1>match is: {match.path}, {match.url}</h1>
              <ErrorPage />
            </>
          )
        }}/>
      </Switch>
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

App.propTypes = {
  hostList: PropTypes.array,
  seasonList: PropTypes.array,
  chosenHost: PropTypes.object,
  chosenColor: PropTypes.string,
  hexList: PropTypes.array
}
