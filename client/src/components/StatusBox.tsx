import React from 'react';
import '../styles/statusBox.scss';


const StatusBox = () => {
  return (
    <div id='infoBox'>
      <ul>
        <li>Current Provision Level: 80%</li>
        <li>RUC: 100</li>
        <li>WUC: 100</li>
        <li>Time to start: 100 ms</li>
      </ul>
    </div>
  );
}

export default StatusBox;
