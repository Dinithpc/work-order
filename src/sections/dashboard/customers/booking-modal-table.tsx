import * as React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper ,
  Box,
  Avatar,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';

const UserTable = () => {
  const rows = [
    {
      name: 'John Doe',
      startTime: '5/25/2024 08:30AM',
      endTime: '5/25/2024 10:30AM',
      travelTime: '1 hour 10 mins',
      distance: '10 km',
      resourceType: 'User',
      jobDescription: 'Field Service Officer'
    },
    {
      name: 'John Doe',
      startTime: '5/25/2024 08:30AM',
      endTime: '5/25/2024 10:30AM',
      travelTime: '1 hour 10 mins',
      distance: '10 km',
      resourceType: 'User',
      jobDescription: 'Field Service Officer'
    },
    {
      name: 'John Doe',
      startTime: '5/25/2024 08:30AM',
      endTime: '5/25/2024 10:30AM',
      travelTime: '1 hour 10 mins',
      distance: '10 km',
      resourceType: 'User',
      jobDescription: 'Field Service Officer'
    },
    {
      name: 'John Doe',
      startTime: '5/25/2024 08:30AM',
      endTime: '5/25/2024 10:30AM',
      travelTime: '1 hour 10 mins',
      distance: '10 km',
      resourceType: 'User',
      jobDescription: 'Field Service Officer'
    }
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell>User</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Travel Time</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Resource Type</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>
                <Avatar sx={{ bgcolor: '#0090F8', fontWeight: 400, fontSize: '13px', color: 'white', width: '40px', height: '40px' }}>
                  {row.name[0]}{row.name[0]}
                </Avatar>
              </Box>
              <Box sx={{ flex: '0 0 150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mt: 1 , fontWeight : 600 , fontSize:'15px' }}>
                  {row.name} 
                </Typography>
                <Typography variant="body2" sx={{ fontWeight : 400 , fontSize:'14px' }}>
                      {row.jobDescription}
                </Typography>
              </Box>
            </Box>
              </TableCell>
              <TableCell>{row.startTime}</TableCell>
              <TableCell>{row.endTime}</TableCell>
              <TableCell>{row.travelTime}</TableCell>
              <TableCell>{row.distance}</TableCell>
              <TableCell>{row.resourceType}</TableCell>
              <TableCell>
              <Stack sx={{ 
                width: '30px',
                height: '30px',
                backgroundColor: '#0090F8',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1
              }}>
                <img src="/assets/logos/profileCircle.svg" alt="profile" style={{ width: '100%', height: '100%' }} />
              </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
