import React from 'react';
import { CustomerBookings } from '../types/customer'; 
import { Box, Typography,Grid,Divider,   Stack, Avatar } from '@mui/material';

interface BookingListProps {
  bookings: CustomerBookings[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <div>
      {bookings.map((booking) => (

      <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              p: 2,
              backgroundColor: '#F9F9F9'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: 2 }}>
                <Avatar sx={{ bgcolor: '#0090F8', fontWeight: 400, fontSize: '26px', color: 'white', width: 56, height: 56 }}>
                  {booking.firstName[0]}{booking.lastName[0]}
                </Avatar>
              </Box>
              <Box sx={{ flex: '0 0 150px', display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
                <Typography variant="body2" sx={{ mt: 1 , fontWeight : 600 , fontSize:'20px' }}>
                  {booking.firstName} {booking.lastName}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight : 400 , fontSize:'14px' }}>
                      {booking.position}
                </Typography>

                <Typography variant="body2" sx={{ fontWeight: 400, fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                  <img src="/assets/logos/phone.svg" alt="phone" height="15px" style={{ marginRight: '8px' }} />
                  {booking.phone}
                </Typography>


              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              position: 'relative',
              padding: 2,
            }}
          >
            <Box sx={{ 
                position: 'absolute',
                top: 0,
                right: 0,
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
              </Box>
              <Box sx={{ flex: 1 ,        
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#576574'
                        }}>
                <Stack spacing={1}>
                <Typography variant="body2" sx={{  display: 'flex', alignItems: 'center' }}>
                  <img src="/assets/logos/email.svg" alt="phone" height="15px" style={{ marginRight: '8px' }} />
                  {booking.date}
                </Typography>                
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src="/assets/logos/timer.svg" alt="phone" height="15px" style={{ marginRight: '8px' }} />
                  {booking.time}
                </Typography>                
                <Typography variant="body2" sx={{  display: 'flex', alignItems: 'center' }}>
                  <img src="/assets/logos/vehicle.svg" alt="phone" height="15px" style={{ marginRight: '8px' }} />
                  {booking.travelTime} travel time
                </Typography>

                </Stack>
              </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} /> 
    </Box>
        ))}
    </div>
  );
};

export default BookingList;
