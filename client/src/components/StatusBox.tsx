import React, { useState, useEffect } from 'react';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { 
  // ProvisionFormData,
   StatusBoxProps ,
  } from '../../types/types';
import '../styles/StatusBox.scss';

const StatusBox = ({ onSubmit }: StatusBoxProps): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [table, setTable] = useState<string[]>([]);
  const [tableName, setTableName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const startTime: string | null = startDate ? startDate.toISOString() : null;
    const endTime: string | null = endDate ? endDate.toISOString() : null;

    onSubmit({
      tableName,
      startTime,
      endTime,
    });
  };

  useEffect(() => {
    const getTables = async (): Promise<void> => {
      const response = await fetch(`/api/tables`);
      const result = await response.json();
      setTable(result);
    };

    getTables().catch((err) => console.error("Couldn't get tables' name", err));
  }, []);

  return (
    <Container maxWidth='sm' style={{ overflow: 'visible' }}>
      <Box sx={{ mt: 4, mb: 4, overflow: 'visible' }}>
        <Typography variant='h4' gutterBottom sx={{ textAlign: 'center' }}>
          Capacity Status
        </Typography>
        <form onSubmit={handleSubmit} style={{ overflow: 'visible' }}>
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth margin='normal'>
              <TextField
                label='Start Time'
                type='datetime-local'
                value={startDate ? format(startDate, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) =>
                  setStartDate(e.target.value ? new Date(e.target.value) : null)
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <TextField
                label='End Time'
                type='datetime-local'
                value={endDate ? format(endDate, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) =>
                  setEndDate(e.target.value ? new Date(e.target.value) : null)
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </FormControl>
          </LocalizationProvider>

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
