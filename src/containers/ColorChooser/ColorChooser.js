import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import './ColorChooser.scss'
import { connect } from 'react-redux'
import { chooseColor } from '../../actions/index.js';

export class ColorChooser extends Component {
  constructor({colorName, hues, borderColor}) {
    super({colorName, hues, borderColor})
    this.state = {
      open: false,
      listDisplay: 'hidden',
    }
  }

  toggleListDisplay = () => {
    this.setState({open: !this.state.open})
  }
  handleMenuClick = async () => {
    await this.toggleListDisplay()
    !this.state.open ?
    this.setState({listDisplay: 'hidden'}) :
    this.setState({listDisplay: 'colorList-hues'})

  }

  handleColorClick = (event) => {
    const colorChoice = this.props.hues.find(hue => {
      return hue.name === event.target.id
    })
    this.props.chooseColor(colorChoice)
  }

  hydrateColorList = () => {
    return this.props.hues.map(hue => {
      return <li className="colorList-box" style={{backgroundColor: `${hue.hex_code}`}} id={hue.name} onClick={this.handleColorClick}></li>
    })
  }
  render() {
    return (
      this.props.chosenColor !== "" ?
      <Redirect to={`/hosts/${this.props.chosenHost.id}/${this.props.chosenColor.name}`} /> :
      <div className="colorChooser-colorDropdown-widget">
        <h4 className="colorList-box" style={{border: `10px solid ${this.props.borderColor}`}} onClick={this.handleMenuClick}>{this.props.colorName}</h4>
        <ul className={this.state.listDisplay}>
          {this.hydrateColorList()}
        </ul>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  chosenHost: state.chosenHost,
  chosenColor: state.chosenColor
})

export const mapDispatchToProps = (dispatch) => ({
  chooseColor: chosenColorInfo => dispatch(chooseColor(chosenColorInfo))
})
export default connect(mapStateToProps, mapDispatchToProps)(ColorChooser)
