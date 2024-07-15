import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/__global.scss';
import '../styles/statusBox.scss';
import { ProvisionFormData, StatusBoxProps } from '../../types/types';

const StatusBox = ({ onSubmit }: StatusBoxProps) => {
  //declare use states to keep track of changes to the form
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  //commented out for MVP
  // const [aWSAccountName, setAWSAccountName] = useState('');
  const [table, setTable] = useState([]);
  const [tableName, setTableName] = useState('');

  // const talbeName = document.querySelector('#tableName')

  //handle when the form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert dates to ISO format if they are not null
    const startTime = startDate ? startDate.toISOString() : null;
    const endTime = endDate ? endDate.toISOString() : null;

    onSubmit({
      //commented out for MVP
      //aWSAccountName,
      tableName,
      startTime,
      endTime,
    });
  };

  useEffect(() => {
    try {
      const getTables = async () => {
        const response = await fetch(`/api/tables`);
        const result = await response.json();
        console.log('tables', result);
        setTable(result);
      };

      getTables();
    } catch (err) {
      console.log("Couldn't get tables' name", err);
    }
  }, []);

  return (
    <div id='statusContainer'>
      <h2>Capacity Status</h2>
      <div className='container'>
        <form id='infoBox' className='formContainer' onSubmit={handleSubmit}>
          {/* commented out for MVP */}
          {/* <label>AWS Account Name</label>
          <select
            value={aWSAccountName}
            onChange={(e) => setAWSAccountName(e.target.value)}
          >
            <option value='' disabled>
              Select an account
            </option>
            <option value='DynamoDB'>DynamoDB</option>
            <option value='SQL'>SQL</option>
            <option value='Watchtower'>Watchtower</option>
          </select> */}

          <label>Table Name</label>
          <select id='tableName' onChange={(e) => setTableName(e.target.value)}>
            <option disabled selected>
              Select a Table
            </option>
            {table &&
              table.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
          </select>

          <label>Start Time</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            dateFormat='yyyy/MM/dd h:mm aa'
            timeCaption='time'
            className='datepicker'
          />

          <label>End Time</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            dateFormat='yyyy/MM/dd h:mm aa'
            timeCaption='time'
            className='datepicker'
          />

          <button id='submitButton' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StatusBox;
