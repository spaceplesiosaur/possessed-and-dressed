import React from 'react'
import './HostPage.scss'

export const HostPage = ({host}) => {
  return (
    <section className="hostPage-main-frame">
      <p>Name: {host.name} Season: {host.season}</p>
      <img src={host.picture}></img>
    </section>
  )
}

export default HostPage;
