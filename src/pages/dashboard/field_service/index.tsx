import type { NextPage } from 'next';
import Head from 'next/head';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { Box, FormControl , InputLabel , Select , MenuItem ,  Grid, Typography } from '@mui/material';

const Page: NextPage = () => {
  usePageView();
  
  return (
    <>
      <Head>
        <title>
          Customer: Tasks | Carpatin
        </title>
      </Head>
      
      <Box padding={4} sx={{ 
        backgroundColor: "#ffffff",
        m: 1,
        borderRadius: '14px',
        boxShadow: '0px 4px 10px 0px #8989891A'
        }}>

        <Typography
            sx={{ fontWeight: 600, fontSize: '22px', mb:2 }} >
                Work Order Summary
        </Typography>

        <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 2,
            padding: 2, 
            mb:3,
            borderRadius: '8px',
            flexWrap: 'wrap' // This ensures that items wrap when they overflow
        }}
    >
        <Box sx={{ flex: '1 1 auto', minWidth: '300px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Date Range</Typography>
                <FormControl sx={{ mt: 1, minWidth: 130, backgroundColor: '#FFFFFF' }} size="small">
                    <InputLabel sx={{ color: "#B9B9B9" }} id="date-range">Last</InputLabel>
                    <Select labelId="customer" id="customer" label="Customer">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 1, minWidth: 80, backgroundColor: '#FFFFFF' , px:1}} size="small">
                    <InputLabel sx={{ color: "#B9B9B9" }} id="date-range">10</InputLabel>
                    <Select labelId="customer" id="customer" label="Customer">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 1, minWidth: 130, backgroundColor: '#FFFFFF' }} size="small">
                    <InputLabel sx={{ color: "#B9B9B9" }} id="date-range">Months</InputLabel>
                    <Select labelId="customer" id="customer" label="Customer">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 2 , alignItems: 'flex-end'}}>
                <Box>
                    <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Customer</Typography>
                        <FormControl sx={{ mt: 1, minWidth: 150, backgroundColor: '#FFFFFF' }} size="small">
                        <InputLabel sx={{ color: "#B9B9B9" }} id="demo-select-small-label">All</InputLabel>
                        <Select labelId="customer" id="customer" label="Customer">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>System Status</Typography>
                        <FormControl sx={{ mt:1,  minWidth: 150, backgroundColor: '#FFFFFF' }} size="small">
                        <InputLabel sx={{ color: "#B9B9B9" }} id="demo-select-small-label">All</InputLabel>
                        <Select labelId="customer" id="customer" label="Customer">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Order Type</Typography>
                        <FormControl sx={{ mt:1, minWidth: 150, backgroundColor: '#FFFFFF' }} size="small">
                        <InputLabel sx={{ color: "#B9B9B9" }} id="demo-select-small-label">All</InputLabel>
                        <Select labelId="customer" id="customer" label="Customer">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Substatus</Typography>
                        <FormControl sx={{ mt: 1, minWidth: 150, backgroundColor: '#FFFFFF' }} size="small">
                        <InputLabel sx={{ color: "#B9B9B9" }} id="demo-select-small-label">All</InputLabel>
                        <Select labelId="customer" id="customer" label="Customer">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Territory</Typography>
                        <FormControl sx={{ mt: 1, minWidth: 150, backgroundColor: '#FFFFFF' }} size="small">
                        <InputLabel sx={{ color: "#B9B9B9" }} id="demo-select-small-label">All</InputLabel>
                        <Select labelId="customer" id="customer" label="Customer">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>

      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} sm={2.4}>
            <Box 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                height="100%"
                padding={2}
                marginX={1}
                sx={{ backgroundColor: "#F9F9F9" }}
            >        
            <Typography sx={{fontSize:'14px' , fontWeight:300 , color : '#576574'}} > Work Orders</Typography>
            <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="flex-end" 
                    height="100%" 
                    paddingBottom={2}
                    >
                    <Box display="flex" alignItems="flex-end">
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' }}>101</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>

        <Grid item xs={12} sm={2.4}>
            <Box 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                height="100%"
                padding={2}
                marginX={1}
                sx={{ backgroundColor: "#F9F9F9" }}
            >        
            <Typography sx={{fontSize:'14px' , fontWeight:300 , color : '#576574'}} > Open Orders</Typography>
            <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="flex-end" 
                    height="100%" 
                    paddingBottom={2}
                    >
                    <Box display="flex" alignItems="flex-end">
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' }}>50</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12} sm={2.4}>
            <Box 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                height="100%"
                padding={2}
                marginX={1}
                sx={{ backgroundColor: "#F9F9F9" }}
            >        
            <Typography sx={{fontSize:'14px' , fontWeight:300 , color : '#576574'}} > Broken Promise</Typography>
            <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="flex-end" 
                    height="100%" 
                    paddingBottom={2}
                    >
                    <Box display="flex" alignItems="flex-end">
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' }}>9.44%</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12} sm={2.4}>
            <Box 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                height="100%"
                padding={2}
                marginX={1}
                sx={{ backgroundColor: "#F9F9F9" }}
            >        
            <Typography sx={{fontSize:'14px' , fontWeight:300 , color : '#576574'}} > Mean Time to Schedule</Typography>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="flex-end" 
                    height="100%" 
                    paddingBottom={2}
                    >
                    <Box display="flex" alignItems="flex-end">
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' }}>15.01</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>

        <Grid item xs={12} sm={2.4}>
            <Box 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                height="100%"
                padding={2}
                marginX={1}
                sx={{ backgroundColor: "#F9F9F9" }}
            >        
            <Typography sx={{fontSize:'14px' , fontWeight:300 , color : '#576574'}} > Mean Time to Travel </Typography>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="flex-end" 
                    height="100%" 
                    paddingBottom={2}
                    >
                    <Box display="flex" alignItems="flex-end">
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' }}>0.66</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
      </Grid>

    <Grid container spacing={2} justifyContent="center" sx={{mt:4}}>
        <Grid item xs={12} sm={7} >
            <Box sx={{paddingX:4 , paddingTop:4,  border: "1px solid #E8E8E8" , borderRadius:'10px'}}>
            <Typography
            sx={{
                fontWeight: 500,
                fontSize: '18px',
                mb:2
            }}
            >Work Order by System Status</Typography>
                <Box sx={{
                    backgroundColor: "#E8E8E8",
                    borderRadius:'10px',
                    minHeight: "200px",
                    display: "flex",
                    alignItems:"center",
                    justifyContent: "center"
                }}>
                    Chart
                </Box>
            </Box>
        </Grid>

        <Grid item xs={12} sm={5}>
            <Box sx={{paddingX:4 , paddingTop:4,  border: "1px solid #E8E8E8" , borderRadius:'10px'}}>
            <Typography
            sx={{
                fontWeight: 500,
                fontSize: '18px',
                mb:2
            }}
            >Work Order trends by System Status</Typography>
                <Box sx={{
                    backgroundColor: "#E8E8E8",
                    borderRadius:'10px',
                    minHeight: "200px",
                    display: "flex",
                    alignItems:"center",
                    justifyContent: "center"
                }}>
                    Chart
                </Box>
            </Box>
        </Grid>
    </Grid>
    </Box>

    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
      {page}
  </DashboardLayout>
);

export default Page;
