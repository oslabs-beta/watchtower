import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from './Layout';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ProvisionFormData, StatusBoxProps } from '../../types/types';

const StatusBox = ({ onSubmit }: StatusBoxProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [table, setTable] = useState<string[]>([]);
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
  
      <Container maxWidth='sm'>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant='h4' gutterBottom sx={{ textAlign: 'center' }}>
            Capacity Status
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='tableName-label'>Table Name</InputLabel>
              <Select
                labelId='tableName-label'
                id='tableName'
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                label='Table Name'
              >
                <MenuItem value='' disabled>
                  Select a Table
                </MenuItem>
                {table.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='yyyy/MM/dd h:mm aa'
                timeCaption='time'
                customInput={
                  <TextField label='Start Time' variant='outlined' fullWidth />
                }
              />
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='yyyy/MM/dd h:mm aa'
                timeCaption='time'
                customInput={
                  <TextField label='End Time' variant='outlined' fullWidth />
                }
              />
            </FormControl>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
  
  );
};

export default StatusBox;
