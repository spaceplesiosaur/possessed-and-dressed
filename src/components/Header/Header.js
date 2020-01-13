import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Link to="/"><header className="app-header">Posessed & Dressed</header></Link>
  )
}

export default Header;
