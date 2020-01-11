import React, { Component } from 'react';
import './ColorBar.scss';
import ColorChooser from '../ColorChooser/ColorChooser';
import { getInfo } from '../../utils/apiCalls';
import { connect } from 'react-redux';
import { setCategories } from '../../actions/index.js';
import { setAllColors } from '../../actions/index.js';
import { setSeasons } from '../../actions/index.js';

export class ColorChooser extends Component {
  constructor({colorCategories, hexCodes, seasons}) {
    super({colorCategories, hexCodes, seasons})
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

  displayColorBar = () => {
    const: colorBuilder = [{red: '#F87E97', orange: '#F89C51', yellow: '#E7C142', green: '#A7C65F', blue: '#5DA1DA', violet: '#5C50B6', pink: '#DE92DA', neutral: '#E2E2E3'}]
    
    const colorWheel = colorCategories.map(category => {
      return (
        <ColorChooser
          color={category.color}
          borderColor=
        />
      )
    })
  }
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
