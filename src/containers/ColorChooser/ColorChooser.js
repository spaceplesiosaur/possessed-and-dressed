import React, { Component } from 'react'
import './ColorChooser.scss'
import { connect } from 'react-redux'

export default class ColorChooser extends Component {
  constructor({colorName, hues, borderColor}) {
    super({colorName, hues, borderColor})
    this.state = {
      listDisplay: 'colorList-hues',
    }
  }

  hydrateColorList = () => {
    return this.props.hues.map(hue => {
      return <li className="colorList-box" style={{backgroundColor: {hue}}}></li>
    })
  }
  render() {
    return (
      <div className="colorChooser-colorDropdown-widget">
        <h4 className="colorList-box" style={{border: `10px solid ${this.props.borderColor}`}}>{this.props.colorName}</h4>
        <ul className={this.state.listDisplay}>
          {this.hydrateColorList()}
        </ul>
      </div>
    )
  }
}
