import React from 'react';
import '../styles/statusContainer.scss';
import StatusBox from './StatusBox';

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

const StatusContainer = () => {
  return (
    <div id='statusContainer'>
      <h2>Capacity Status</h2>
      <StatusBox />
    </div>
  );
}

export default StatusContainer;
