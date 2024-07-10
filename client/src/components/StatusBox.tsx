import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/statusBox.scss';
import '../styles/__global.scss';
import '../styles/statusContainer.scss';
import { ProvisionFormData, StatusBoxProps } from '../../types/types';

const StatusBox = ({ onSubmit }: StatusBoxProps) => {
  //declare use states to keep track of changes to the form
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  //commented out for MVP
  // const [aWSAccountName, setAWSAccountName] = useState('');
  const [tableName, setTableName] = useState('');

  //handle when the form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      //commented out for MVP
      //aWSAccountName,
      tableName,
      startTime: startDate,
      endTime: endDate,
    });
  };

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
          <input
            type='text'
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />

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
