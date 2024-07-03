import React from 'react';
import '../styles/statusContainer.scss';
import StatusBox from './statusBox.jsx';

function StatusContainer() {
  return (
    <div id='statusContainer'>
      <h2>Capacity Status</h2>
      <StatusBox />
    </div>
  );
}

export default StatusContainer;
