import React from 'react';
import '../styles/statusBox.scss';
//import { useState, useEffect } from 'react';

//Use state to update the data fetched from the CloudWatch Api
//const [data, setData] = useState(null);

// useeffect to check when the API is updated
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch('cloudWatchApi');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const result = await response.json();
//       setData(result);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchData();
// }, []);

function StatusBox() {
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
