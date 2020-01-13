import React from 'react'
import './HostPage.scss'

export const HostPage = ({host}) => {
  return (
    <section className="hostPage-main-frame">
      <p>Name: {host.name} Season: {host.season}</p>
      <img className="hostPage-picture-host" src={host.picture}></img>
    </section>
  )
}

export default HostPage;
