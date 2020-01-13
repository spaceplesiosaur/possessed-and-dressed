import React from 'react'
import './HostPage.scss'

export const HostPage = ({host}) => {
  return (
    <section className="hostPage-main-frame">
      <p className="host-name-tag">Meet {host.name}! {host.name} is very excited to be possessed by you.</p>
      <img className="hostPage-picture-host" src={host.picture} alt="hostPage-main-hostPic"></img>
    </section>
  )
}

export default HostPage;
