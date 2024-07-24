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
import { StatusBoxProps } from '../../types/types';
import Swal from 'sweetalert2';

const StatusBox = ({ onSubmit }: StatusBoxProps): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [table, setTable] = useState<string[] | null>(null);
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
      const response: Response = await fetch(`/api/tables`);

      if (!response.ok) {
        console.log(response);
        throw new Error(
          `HTTP error status:${response.status}, AWS security token is incorrect!`
        );
      }

      const data = await response.json();
      if(!data.includes('WatchTowerUserProfiles')){
        Swal.fire({
          title: 'Are you sure?',
          text: 'AWS Account Info Submitted! We will create a table "WatchTowerUserProfiles" to save reports.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#70c0c2',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response: Response = await fetch('/api/createTable');
            const data = await response.json();
            Swal.fire({
              title: 'Table created!',
              text: `Table "WatchTowerUserProfiles" is created successfully in your DynamoDB!`,
              icon: 'success',
              confirmButtonColor: '#70c0c2',
            });
            setTable(data);
          }

        });
      }
      setTable(data);
    };

    getTables().catch((err) => {
      console.error("Couldn't get tables' name", err);
      Swal.fire({
        title: 'Oops...',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#70c0c2',
      });
    });
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
              {table &&
                table.length &&
                table.map((name, index) => (
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
