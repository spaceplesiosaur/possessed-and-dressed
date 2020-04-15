import React from 'react';
import { Link } from 'react-router-dom';
import './ColorFeedback.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { clearColor } from '../../actions/index.js';


export const ColorFeedback = ({match, chosenColor, chosenHost, season, clearAColor}) => {

  const determineFeedback = () => {
    return (!match)
      ? (<p className="colorFeedback-main-feedback">Terrible choice! Your host's season is {`${season.toUpperCase()}`}. {`${chosenColor.name.toUpperCase()}`} will make them look tired, sad and afraid. Change clothes before someone alerts The Church!</p>)
      : (<p className="colorFeedback-main-feedback">Great choice! Your host's season is {`${season.toUpperCase()}`}. {`${chosenColor.name.toUpperCase()}`} will look great on them - The Church won't suspect a thing!  Happy haunting!</p>)
  }

  const handleClick = () => {
    clearAColor()
  }

  return (
    console.log('HOST', chosenHost),
    chosenColor.name && <section className="colorFeedback-main">
      <div className="colorFeedback-main-colorBox" style={{backgroundColor: `${chosenColor.hex_code}`}}>
      </div>
      <h2 className="colorFeedback-main-name">{chosenColor.name.toUpperCase()}</h2>
      {determineFeedback()}
      <Link to={`/hosts/${chosenHost.id}`} onClick={handleClick}><button className="back-button">Back</button></Link>
    </section>
  )
}
export const mapStateToProps = (state) => ({
  chosenColor: state.chosenColor,
  chosenHost: state.chosenHost
})
export const mapDispatchToProps = (dispatch) => ({
  clearAColor: () => dispatch(clearColor()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ColorFeedback)

ColorFeedback.propTypes = {
  chosenColor: PropTypes.func,
  chooseColor: PropTypes.string
}
