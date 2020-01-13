import React from 'react';
import './MiniHost.scss';

export const MiniHost = ({picture, name}) => {
  return (
    <div className="entryPage-miniHost-hostAvatar">
      <img src={picture} className="host-avatar-picture" alt="host-screaming"></img>
      <p className="host-avatar-name">{name}</p>
    </div>
  )
}

export default MiniHost;
