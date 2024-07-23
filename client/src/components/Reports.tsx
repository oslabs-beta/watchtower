// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Container, Grid, Paper } from '@mui/material';
// import { ReportsProps, ProvisionFormData, Metrics } from '../../types/types';
// import {
//   DataGrid,
//   GridRowsProp,
//   GridColDef,
//   GridEventListener,
//   GridColumnGroupingModel,
//   GridToolbar,
// } from '@mui/x-data-grid';
// import { useNavigate } from 'react-router-dom';
// import GraphContainer from './GraphContainer';
// import Layout from './Layout';
// import DataStats from './DataStats';

// const Reports = ({ timeFrame }: ReportsProps): JSX.Element => {
//   const [show, setShow] = useState(false);
//   const [currentProvision, setCurrentProvision] =
//     useState<ProvisionFormData | null>(null);
//   const [currentMetrics, setCurrentMetrics] = useState<Metrics | null>(null);
//   const [currentBedrockAnalysis, setCurrentBedrockAnalysis] =
//     useState<string>('');
//   const [pastAnalysis, setPastAnalysis] = useState<any>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPastAnalysis = async (): Promise<void> => {
//       console.log('Fetching past analysis');
//       try {
//         const response = await fetch('/api/pastAnalysis');

//         if (!response.ok) {
//           throw new Error(`HTTP error status: ${response.status}`);
//         }

//         const data = await response.json();
//         data.map((el) => {
//           el.createdAt = el.createdAt.S;
//           el.provision = JSON.parse(el.provision.S);
//           el.metrics = JSON.parse(el.metrics.S);
//           el.bedrockAnalysis = el.bedrockAnalysis.S;
//         });
//         setPastAnalysis(data);
//       } catch (error) {
//         console.error('Error fetching past analysis:', error);
//       }
//     };

//     fetchPastAnalysis();
//   }, []);

//   const handleRowClick: GridEventListener<'rowClick'> = (params) => {
//     if (pastAnalysis) {
//       const selectedProvision = pastAnalysis[params.row.id].provision;
//       const selectedMetrics = pastAnalysis[params.row.id].metrics;
//       const selectedBedrockAnalysis =
//         pastAnalysis[params.row.id].bedrockAnalysis;

//       setShow(true);
//       setCurrentProvision(selectedProvision);
//       setCurrentMetrics(selectedMetrics);
//       setCurrentBedrockAnalysis(selectedBedrockAnalysis);

//       navigate('/dashboard', {
//         state: {
//           provision: selectedProvision,
//           metrics: selectedMetrics,
//           bedrockAnalysis: selectedBedrockAnalysis,
//         },
//       });
//     }
//   };

//   const rows: GridRowsProp = pastAnalysis.map((el, i) => ({
//     id: i,
//     tablename: el.provision.tableName,
//     time: el.createdAt,
//     pRCU: el.metrics.ProvRCU,
//     pWCU: el.metrics.ProvWCU,
//     cRCU: Math.max(...el.metrics.ConsRCU.map((RCU) => RCU.Maximum)).toFixed(3),
//     cWCU: Math.max(...el.metrics.ConsWCU.map((WCU) => WCU.Maximum)).toFixed(3),
//     analysis: el.bedrockAnalysis,
//   }));

//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 50 },
//     { field: 'tablename', headerName: 'Table Name', width: 150 },
//     {
//       field: 'time',
//       headerName: 'Time Created',
//       width: 200,
//     },
//     {
//       field: 'pRCU',
//       headerName: 'RCU',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'pWCU',
//       headerName: 'WCU',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'cRCU',
//       headerName: 'RCU',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'cWCU',
//       headerName: 'WCU',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'analysis',
//       headerName: 'Bedrock Analysis',
//       width: 400,
//     },
//   ];

//   const columnGroupingModel: GridColumnGroupingModel = [
//     {
//       groupId: 'Internal',
//       description: '',
//       children: [{ field: 'id' }, { field: 'tablename' }, { field: 'time' }],
//     },
//     {
//       groupId: 'Provision Level',
//       children: [{ field: 'pRCU' }, { field: 'pWCU' }],
//     },
//     {
//       groupId: 'Cousumed Maximum',
//       children: [{ field: 'cRCU' }, { field: 'cWCU' }],
//     },
//   ];

//   return (
//     <Layout>
//       <Typography variant='h4' sx={{ height: '70%', width: '100%' }}>
//         Reports {timeFrame ? ` - ${timeFrame}` : ''}
//         <Box>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 10,
//                 },
//               },
//             }}
//             pageSizeOptions={[5, 10, 20]}
//             columnGroupingModel={columnGroupingModel}
//             onRowClick={handleRowClick}
//             disableRowSelectionOnClick
//             slots={{ toolbar: GridToolbar }}
//             slotProps={{
//               toolbar: {
//                 csvOptions: { disableToolbarButton: true },
//                 printOptions: { disableToolbarButton: true },
//                 showQuickFilter: true,
//               },
//             }}
//           />
//         </Box>
//         {show && currentProvision && currentMetrics && (
//           <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={4}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: 500,
//                   }}
//                 >
//                   <DataStats
//                     provisionData={currentProvision}
//                     currentMetrics={currentMetrics}
//                   />
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: 500,
//                   }}
//                 >
//                   <GraphContainer
//                     currentProvision={currentProvision}
//                     currentMetrics={currentMetrics}
//                   />
//                 </Paper>
//               </Grid>
//             </Grid>
//             {currentBedrockAnalysis && <Box> {currentBedrockAnalysis}</Box>}
//           </Container>
//         )}
//       </Typography>
//     </Layout>
//   );
// };

// export default Reports;

import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Grid, Paper } from '@mui/material';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import { ReportsProps, ProvisionFormData, Metrics } from '../../types/types';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridEventListener,
  GridColumnGroupingModel,
  GridToolbar,
} from '@mui/x-data-grid';
import GraphContainer from './GraphContainer';
import Layout from './Layout';
import DataStats from './DataStats';

const Reports = ({ timeFrame }: ReportsProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const [currentProvision, setCurrentProvision] =
    useState<ProvisionFormData | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<Metrics | null>(null);
  const [currentBedrockAnalysis, setCurrentBedrockAnalysis] =
    useState<string>('');
  const [pastAnalysis, setPastAnalysis] = useState<any>([]);

  useEffect(() => {
    const fetchPastAnalysis = async (): Promise<void> => {
      console.log('Fetching past analysis');
      try {
        const response = await fetch('/api/pastAnalysis');

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        //pass the correct data before usestate
        data.map((el) => {
          el.createdAt = el.createdAt.S;
          el.provision = JSON.parse(el.provision.S);
          el.metrics = JSON.parse(el.metrics.S);
          el.bedrockAnalysis = el.bedrockAnalysis.S;
        });
        setPastAnalysis(data);
        // console.log('CurrentProvision: ', JSON.parse(data[0].provision.S));
        // console.log('metrics: ', JSON.parse(data[0].metrics.S));
        // console.log('bedrockAnalysis: ', data[0].bedrockAnalysis.S);
      } catch (error) {
        console.error('Error fetching past analysis:', error);
      }
    };

    fetchPastAnalysis();
  }, []);

  // console.log('pastAnalysis: ', pastAnalysis);

  const handleRowClick: GridEventListener<'rowClick'> = (
    params // GridRowParams
    // event, // MuiEvent<React.MouseEvent<HTMLElement>>
    // details // GridCallbackDetails
  ) => {
    if (pastAnalysis) {
      setShow(true);
      setCurrentProvision(pastAnalysis[params.row.id - 1].provision);
      setCurrentMetrics(pastAnalysis[params.row.id - 1].metrics);
      setCurrentBedrockAnalysis(
        pastAnalysis[params.row.id - 1].bedrockAnalysis
      );
    }
  };

  // console.log('parsePastAnalysis', parsePastAnalysis);

  const rows: GridRowsProp = pastAnalysis.map((el, i) => ({
    id: i + 1,
    tablename: el.provision.tableName,
    time: el.createdAt,
    pRCU: el.metrics.ProvRCU,
    pWCU: el.metrics.ProvWCU,
    cRCU: Math.max(...el.metrics.ConsRCU.map((RCU) => RCU.Maximum)).toFixed(3), //typo here, i have consRCU instead of ConsRcu
    cWCU: Math.max(...el.metrics.ConsWCU.map((WCU) => WCU.Maximum)).toFixed(3), //typo here, i have consWCU instead of ConsWcu
    analysis: el.bedrockAnalysis,
  }));
  // [
  //   {
  //     id: 1,
  //     tablename: 'mocktabletesting',
  //     time: new Date(),
  //     pRCU: 1,
  //     pWCU: 1,
  //     cRCU: 1,
  //     cWCU: 1,
  //     analysis: 'This is great!',
  //   },
  //   {
  //     id: 2,
  //     tablename: 'mocktabletesting',
  //     time: new Date(),
  //     pRCU: 2,
  //     pWCU: 1,
  //     cRCU: 1,
  //     cWCU: 1,
  //     analysis: 'not great!',
  //   },
  //   {
  //     id: 3,
  //     tablename: 'mocktabletesting',
  //     time: new Date(),
  //     pRCU: 3,
  //     pWCU: 1,
  //     cRCU: 1,
  //     cWCU: 1,
  //     analysis: 'Hello',
  //   },
  // ];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'tablename', headerName: 'Table Name', width: 150 },
    {
      field: 'time',
      headerName: 'Time Created',
      width: 200,
    },
    {
      field: 'pRCU',
      headerName: 'RCU',
      type: 'number',
      width: 90,
    },
    {
      field: 'pWCU',
      headerName: 'WCU',
      type: 'number',
      width: 90,
    },
    {
      field: 'cRCU',
      headerName: 'RCU',
      type: 'number',
      width: 90,
    },
    {
      field: 'cWCU',
      headerName: 'WCU',
      type: 'number',
      width: 90,
    },
    {
      field: 'analysis',
      headerName: 'Bedrock Analysis',
      width: 400,
    },
  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: 'Internal',
      description: '',
      children: [{ field: 'id' }, { field: 'tablename' }, { field: 'time' }],
    },
    {
      groupId: 'Provision Level',
      children: [{ field: 'pRCU' }, { field: 'pWCU' }],
    },
    {
      groupId: 'Consumed Maximum',
      children: [{ field: 'cRCU' }, { field: 'cWCU' }],
    },
  ];

  return (
    <Layout>
      <Typography
        variant='h4'
        sx={{
          height: 500,
          width: '100%',
          fontSize: 0.8,
        }}
      >
        Reports {timeFrame ? ` - ${timeFrame}` : ''}
        <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            columnGroupingModel={columnGroupingModel}
            onRowClick={handleRowClick}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                sx: {
                  '& .MuiToolbar-root': {
                    color: 'red',
                  },
                },
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
              },
            }}
          />
        </Box>
      </Typography>
      {show && currentProvision && currentMetrics && (
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 500,
                }}
              >
                <DataStats
                  provisionData={currentProvision}
                  currentMetrics={currentMetrics}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 500,
                }}
              >
                <GraphContainer
                  currentProvision={currentProvision}
                  currentMetrics={currentMetrics}
                />
              </Paper>
            </Grid>
          </Grid>
          {currentBedrockAnalysis && (
            <Box
              sx={{
                mt: 2,
                width: '100%',
                borderRadius: 1,
                p: 2,
                maxHeight: 200,
                overflow: 'auto',
                border: '1px solid rgba(0, 0, 0, 0.12)',
              }}
            >
              {currentBedrockAnalysis}
            </Box>
          )}
        </Container>
      )}
    </Layout>
  );
};

export default Reports;
