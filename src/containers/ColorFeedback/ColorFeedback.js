import React from 'react';
import './ColorFeedback.scss'
import { connect } from 'react-redux'

export const ColorFeedback = ({match, chosenColor, chosenHost, season}) => {

  const determineFeedback = () => {
    return (!match)
      ? (<p>No! Your host's season is {`${season}`}. The color {`${chosenColor.name}`} will make them look tired, sad and afraid, and someone will try to perform an exorcism on them!</p>)
      : (<p>Yes! Your host's season is {`${season}`}. The color {`${chosenColor.name}`} will look great on them - nobody will suspect a thing!</p>)
  }
  return (
    chosenColor.name && <section className="colorFeedback-main">
      <div className="colorFeedback-main-colorBox" style={{backgroundColor: `${chosenColor.hex_code}`}}>
      </div>
      <h2 className="colorFeedback-main-name">{chosenColor.name}</h2>
      {determineFeedback()}
    </section>
  )
}

export const mapStateToProps = (state) => ({
  chosenColor: state.chosenColor,
  chosenHost: state.chosenHost
})
export default connect(mapStateToProps, null)(ColorFeedback)
