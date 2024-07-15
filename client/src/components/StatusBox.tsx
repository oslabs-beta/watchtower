import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/__global.scss';
import '../styles/statusBox.scss';
import { ProvisionFormData, StatusBoxProps } from '../../types/types';

const StatusBox = ({ onSubmit }: StatusBoxProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [table, setTable] = useState([]);
  const [tableName, setTableName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startTime = startDate ? startDate.toISOString() : null;
    const endTime = endDate ? endDate.toISOString() : null;

    onSubmit({
      tableName,
      startTime,
      endTime,
    });
  };

  useEffect(() => {
    const getTables = async () => {
      const response = await fetch(`/api/tables`);
      const result = await response.json();
      setTable(result);
    };

    getTables().catch((err) => console.log("Couldn't get tables' name", err));
  }, []);

  return (
    <div id='statusContainer'>
      <h2>Capacity Status</h2>
      <div className='container'>
        <form id='infoBox' className='formContainer' onSubmit={handleSubmit}>
          <label>Table Name</label>
          <select
            id='tableName'
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          >
            <option value='' disabled>
              Select a Table
            </option>
            {table.map((name, index) => (
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
