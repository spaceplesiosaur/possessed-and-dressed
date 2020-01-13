import React, { Component } from 'react';
import './ColorBar.scss';
import ColorChooser from '../ColorChooser/ColorChooser';
import PropTypes from 'prop-types';
import { getInfo } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { setCategories } from '../../actions/index.js';
import { setAllColors } from '../../actions/index.js';


export class ColorBar extends Component {
  constructor({colorCategories, hexCodes}) {
    super()
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

  findMenuParentColor = (parentHexesList, nameFromList) => {
    return parentHexesList.find(color => {
      return Object.keys(color)[0] === nameFromList
    })[nameFromList]

  }

  matchAvailableHuesToList = (colorIdList) => {
    return colorIdList.map(colorId => {
      return this.props.hexCodes.find(hex => {
        return hex.id === colorId
      })
    })
  }

  displayColorBar = () => {
    const colorTitles = [{red: '#F87E97'}, {orange: '#F89C51'}, {yellow: '#E7C142'}, {green: '#A7C65F'}, {blue: '#5DA1DA'}, {violet: '#5C50B6'}, {pink: '#DE92DA'}, {neutral: '#E2E2E3'}]

    const colorWidgetMaker = this.props.colorCategories.map(category => {
      const colorBorder = this.findMenuParentColor(colorTitles, category.name)
      const decipherHues = this.matchAvailableHuesToList(category.colors)

      return (
        decipherHues.every(color => color !== undefined) &&
        (<ColorChooser
          key={category.id}
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
      <h2 className="colorBar-main-header">What color would you like your host to wear?</h2>
      <p className="colorBar-main-explantion">Remember, it is VERY IMPORTANT to dress your host in something they look their best in - if they don't look their best, the church will become suspicious and may perform an exorcism on them!</p>
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

ColorBar.propTypes = {
  colorCategories: PropTypes.array,
  hexCodes: PropTypes.array,
  seasons: PropTypes.array,
  storeCategories: PropTypes.func,
  storeAllColors: PropTypes.func
}
