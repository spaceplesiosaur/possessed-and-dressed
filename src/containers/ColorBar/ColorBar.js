import React, { Component } from 'react';
import './ColorBar.scss';
import ColorChooser from '../ColorChooser/ColorChooser';
import { getInfo } from '../../utils/apiCalls';
import { connect } from 'react-redux';
import { setCategories } from '../../actions/index.js';
import { setAllColors } from '../../actions/index.js';
import { setSeasons } from '../../actions/index.js';

export class ColorChooser extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  supplyColorCategories = () => {
    getInfo('https://color-seasons.herokuapp.com/categories/', 'color categories')
    .then(data => this.props.storeCategories(data))
  }

  supplyHexCodes = () => {
    getInfo('https://color-seasons.herokuapp.com/colors/', 'colors and hex codes')
    .then(data => this.props.storeAllColors(data))
  }

  supplySeasons = () => {
    getInfo('https://color-seasons.herokuapp.com/seasons/', 'seasonal analysis')
    .then(data => this.props.storeSeasons(data))
  }
  // displayColorBar = () => {
  //   const colorWheel = []
  // }
  render() {
    <section className="colorBar-main-frame">
      <h2>What color would you like your host to wear?</h2>
      <section className="coloBar-frame-navBar">
      </section>
    </section>
  }
}

export mapStateToProps = (state) => ({
  colorCategories: state.colorCategories,
  hexCodes: state.allColors,
  seasons: state.seasons
})

export mapDispatchToProps = (dispatch) => ({
  storeCategories: (categoriesInfo) => dispatch(setCategories(categoriesInfo)),
  storeAllColors: (colorsInfo) => dispatch(setAllColors(colorsInfo)),
  storeSeasons: (seasonsInfo) => dispatch(setSeasons(seasonsInfo))
})
export default connect(mapStateToProps, mapDispatchToProps)(ColorBar)
