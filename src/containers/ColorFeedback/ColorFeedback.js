import React from 'react';
import { Link } from 'react-router-dom'
import './ColorFeedback.scss'
import { connect } from 'react-redux'

export const ColorFeedback = ({match, chosenColor, chosenHost, season}) => {

  const determineFeedback = () => {
    return (!match)
      ? (<p className="colorFeedback-main-feedback">Terrible choice! Your host's season is {`${season.toUpperCase()}`}. {`${chosenColor.name.toUpperCase()}`} will make them look tired, sad and afraid, and the church will surely try to perform an exorcism on them!</p>)
      : (<p className="colorFeedback-main-feedback">Great choice! Your host's season is {`${season.toUpperCase()}`}. {`${chosenColor.name.toUpperCase()}`} will look great on them - nobody will suspect a thing!  Happy haunting!</p>)
  }
  return (
    chosenColor.name && <section className="colorFeedback-main">
      <div className="colorFeedback-main-colorBox" style={{backgroundColor: `${chosenColor.hex_code}`}}>
      </div>
      <h2 className="colorFeedback-main-name">{chosenColor.name.toUpperCase()}</h2>
      {determineFeedback()}
      <button className="back-button" onClick={()=> window.location = '/'}>Back</button>
    </section>
  )
}

export const mapStateToProps = (state) => ({
  chosenColor: state.chosenColor,
  chosenHost: state.chosenHost
})
export default connect(mapStateToProps, null)(ColorFeedback)
