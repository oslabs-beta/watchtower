import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/statusBox.scss';
import '../styles/__global.scss';

const StatusBox: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className='container'>
      <form id='infoBox' className='formContainer'>
        <label>AWS Account Name</label>
        <select>
          <option value='' disabled>
            Select an account
          </option>
          <option>DynamoDB</option>
          <option>SQL</option>
          <option>Watchtower</option>
        </select>
        <label>Table Name</label>
        <input type='text' />
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
  );
};

export default StatusBox;
