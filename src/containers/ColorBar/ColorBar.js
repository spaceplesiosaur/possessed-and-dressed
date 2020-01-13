import React, { Component } from 'react';
import './ColorBar.scss';
import ColorChooser from '../ColorChooser/ColorChooser';
import { getInfo } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { setCategories } from '../../actions/index.js';
import { setAllColors } from '../../actions/index.js';


export class ColorBar extends Component {
  constructor({colorCategories, hexCodes, seasons}) {
    super({colorCategories, hexCodes, seasons})
    this.state = {

    }
  }

  componentDidMount () {
    this.supplyColorCategories();
    this.supplyHexCodes();
    // this.supplySeasons()
  }

  supplyColorCategories = () => {
    getInfo('https://color-seasons.herokuapp.com/categories/', 'color categories')
    .then(data => this.props.storeCategories(data))
    // .then(data => console.log(data))
  }

  supplyHexCodes = () => {
    getInfo('https://color-seasons.herokuapp.com/colors/', 'colors and hex codes')
    .then(data => this.props.storeAllColors(data))
    // .then(data => console.log(data))
  }

  displayColorBar = () => {
    const colorTitles = [{red: '#F87E97'}, {orange: '#F89C51'}, {yellow: '#E7C142'}, {green: '#A7C65F'}, {blue: '#5DA1DA'}, {violet: '#5C50B6'}, {pink: '#DE92DA'}, {neutral: '#E2E2E3'}]

    const colorWidgetMaker = this.props.colorCategories.map(category => {

      const colorBorder = colorTitles.find(color => {
        return Object.keys(color)[0] === category.name
      })[category.name]


      const decipherHues = category.colors.map(colorId => {
        return this.props.hexCodes.find(hex => {
          return hex.id === colorId
        })
      })

      // console.log('HUES', decipherHues)
      // console.log('COLOR NAME', category.name)
      // console.log('BORDER COLOR', colorBorder)
      // console.log('HUES', decipherHues.hex_code)

      return (
        decipherHues.every(color => color !== undefined) &&
        (<ColorChooser
          colorName={category.name}
          hues={decipherHues}
          borderColor={colorBorder}
        />)
      )
    })
    return colorWidgetMaker
  }

  render() {
    return (
      <section className="colorBar-main-frame">
      <h2>What color would you like your host to wear?</h2>
      <section className="colorBar-frame-navBar">
        {this.displayColorBar()}
      </section>
    </section>)

  }
}

export const mapStateToProps = (state) => ({
  colorCategories: state.categories,
  hexCodes: state.allColors,
  seasons: state.seasons
})

export const mapDispatchToProps = (dispatch) => ({
  storeCategories: categoriesInfo => dispatch(setCategories(categoriesInfo)),
  storeAllColors: colorsInfo => dispatch(setAllColors(colorsInfo)),
  // storeSeasons: (seasonsInfo) => dispatch(setSeasons(seasonsInfo))
})
export default connect(mapStateToProps, mapDispatchToProps)(ColorBar)
