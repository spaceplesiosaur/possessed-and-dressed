import React, {Component} from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearHost } from '../../actions/index.js';

export class Header extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  handleClick = () => {
    this.props.clearAHost()
  }

  render() {
    return (
      <Link to="/" onClick={this.handleClick} style={{textDecoration: "none"}}><header className="app-header">Posessed & Dressed</header></Link>
    )
  }
}

export const mapStateToProps = (state) => ({
  chosenHost: state.chosenHost,
})
export const mapDispatchToProps = (dispatch) => ({
  clearAHost: () => dispatch(clearHost()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
