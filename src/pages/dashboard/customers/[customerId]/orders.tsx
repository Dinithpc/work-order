import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Card, Skeleton , Button, Typography , Modal , Tabs , Stack , TextField , MenuItem, CardContent,    Tab, Divider} from '@mui/material';
import { customersApi } from '../../../../api/customers';
import { ResourceError } from '../../../../components/resource-error';
import { ResourceUnavailable } from '../../../../components/resource-unavailable';
import { useMounted } from '../../../../hooks/use-mounted';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as CustomerLayout } from '../../../../layouts/customer';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { ProductServiceTable } from '../../../../sections/dashboard/customers/product-services-table';
import type { CustomerOrder } from '../../../../types/customer';
import type { ChangeEvent, FC, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { paths } from '../../../../paths';


import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import InputAdornment from '@mui/material/InputAdornment';
import {  SvgIcon } from '@mui/material';
import {

  Unstable_Grid2 as Grid
} from '@mui/material';
import BookingList from '../../../../components/bookingComponent';


interface OrdersSearchState {
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

interface TabOption {
  label: string;
  path: string;
}

const tabOptions: TabOption[] = [
  {
    label: 'General',
    path: paths.dashboard.customers.details.orders
  },
  {
    label: 'Estimate Information',
    path: ''
  },
];


const useOrdersSearch = () => {
  const [state, setState] = useState<OrdersSearchState>({
    sortBy: 'createdAt',
    sortDir: 'desc'
  });

  const handleSortChange = useCallback(
    (sortBy: string): void => {
      setState((prevState) => {
        const sortDir = (prevState.sortBy === sortBy && prevState.sortDir === 'asc')
          ? 'desc'
          : 'asc';

        return {
          ...prevState,
          sortBy,
          sortDir
        };
      });
    },
    []
  );

  return {
    handleSortChange,
    state
  };
};

interface OrdersStoreState {
  data?: CustomerOrder[];
  error?: string;
  isLoading?: boolean;
}

interface OrdersStore {
  state: OrdersStoreState;
}


const useOrdersStore = (searchState: OrdersSearchState): OrdersStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<OrdersStoreState>({ isLoading: true });

  const handleOrdersGet = useCallback(
    async (searchState: OrdersSearchState) => {
      setState({ isLoading: true });

      try {
        const response = await customersApi.getCustomerOrders({
          sortBy: searchState.sortBy,
          sortDir: searchState.sortDir
        });

        if (isMounted()) {
          setState({ data: response });
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          setState({ error: 'Something went wrong' });
        }
      }
    },
    [isMounted]
  );

  useEffect(
    () => {
      handleOrdersGet(searchState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    state
  };
};

type ResourcesState = 'loading' | 'error' | 'unavailable' | 'available';

const getResourcesState = (storeState: OrdersStoreState): ResourcesState => {
  if (storeState.isLoading) {
    return 'loading';
  }

  if (storeState.error) {
    return 'error';
  }

  return storeState.data?.length! > 0 ? 'available' : 'unavailable';
};

const Page: NextPage = () => {
  const ordersSearch = useOrdersSearch();
  const ordersStore = useOrdersStore(ordersSearch.state);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  usePageView();

  const resourcesState = getResourcesState(ordersStore.state);
  const handleTabsChange = useCallback(
    (event: ChangeEvent<{}>, value: string): void => {
      router.push(value);
    },
    [router]
  );

  const currentTab = tabOptions.find((option) => option.path === pathname);


  return (
    <>
      <Head>
        <title>
          Customer: Orders | Carpatin
        </title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
          }}
        >

<Box
    sx={{
      width: '100%',
      bgcolor: '#ffffff',
      py: 3,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      px: 3,
      fontWeight: 500,
    }}
  >
    <Box sx={{ display: 'flex', gap: 4 }}>
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' , gap: 1  , border: '1px solid #E8E8E8', py :1 , px:2,  borderRadius :"50px"}}>
      <img src="/assets/productService/shippingBox.svg" alt="shippingBox" />
      <Typography sx={{ 
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '27px',
          textAlign: 'left',
          color : "#222F3E",
        }}>
          Products
        </Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' , gap: 1  , backgroundColor : "#0090F8" , py:1 , px:2  , borderRadius :"50px"}}>
        <img src="/assets/productService/microphone.svg" alt="microphone" /> 
        <Typography sx={{ 
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '27px',
          textAlign: 'left',
          color : "#ffffff",
        }}>
          Products
        </Typography>
      </Box>
    </Box>
    <Button
      sx={{ 
        fontWeight: 600, 
        fontSize: '20px', 
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : "#0090F8",
        color : "#ffffff",
        '&:hover': {
      backgroundColor: "#0090F8", // Keep the same background color on hover
      color: "#ffffff" // Keep the same text color on hover
    }
      }}
      startIcon={<img src="/assets/productService/plus.svg" alt="plus" />}
      onClick={handleOpen}>
        Add Project
      </Button>
  </Box>
          <ProductServiceTable
              // items={ordersStore.state.data}
              onSortChange={ordersSearch.handleSortChange}
            />
          {resourcesState === 'loading' && (
            <Box sx={{ m: 2 }}>
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </Box>
          )}
          {resourcesState === 'error' && (
            <ResourceError
              message="Something went wrong"
              sx={{ m: 2 }}
            />
          )}
          {resourcesState === 'unavailable' && (
            <ResourceUnavailable
              message="Add a service to this work order"
              sx={{ m: 2 }}
            />
          )}
          {resourcesState === 'available' && (
            <ProductServiceTable
              // items={ordersStore.state.data}
              onSortChange={ordersSearch.handleSortChange}
            />
          )}
        </Card>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'white',
            borderRadius: '10px',
            p: 4,
            overflowY: 'auto',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            New Work Order Project
          </Typography>
            <div>
              <Tabs
                onChange={handleTabsChange}
                value={currentTab?.path}
                variant="scrollable"
              >
                {tabOptions.map((option) => (
                  <Tab
                    key={option.path}
                    label={option.label}
                    value={option.path}
                    sx={{
                      mt:4,
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '27px',
                      textAlign: 'left',
                    }}
                  />
                ))}
              </Tabs>
              <Divider />
            </div>

            <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              lg={6}
            >
              <Stack spacing={3}>
              <Card>
                <CardContent sx={{ border: '1px solid #E8E8E8' , borderRadius:'10px' , mt:2 }}>
                 <Grid
                    container
                    spacing={3}
                  >
                    <Box sx={{minWidth : '100%'}}>

                    <Typography variant="h6">
                    Basic Details
                    </Typography>

                    <form>

                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
                        <Typography sx={{ color: '#576574' , fontWeight : 400 , fontSize: '18px' }}>Product</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="serviceAmount"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SvgIcon
                                      fontSize="small"
                                      sx={{ mr: 1 }}
                                    >
                                <MagnifyingGlassIcon />
                              </SvgIcon>        
                            </InputAdornment>
                          ),
                        }}/>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
                        <Typography sx={{ color: '#576574' }}>Line Status</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="workOrderType"
                            placeholder="Estimated" 
                             />
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
                        <Typography sx={{ color: '#576574' }}>Estimated Quantity</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="incidentType" 
                            placeholder="---" 
                        />
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
                        <Typography sx={{ color: '#576574' }}>Work Order Type</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="agreement"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SvgIcon
                                      fontSize="small"
                                      sx={{ mr: 1 }}
                                    >
                                <MagnifyingGlassIcon />
                              </SvgIcon>        
                            </InputAdornment>
                          ),
                        }}/>
                      </Stack>

                             
                    </form>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>        
      <Grid
        xs={12}
        lg={6}
      > 
      <Card>
          <CardContent sx={{ border: '1px solid #E8E8E8' , borderRadius:'10px' , mt:2 }}>

            <Typography variant="h6" sx={{mb:2}}>
            Description
            </Typography>
              <Stack direction="row" justifyContent="space-between"  spacing={2} sx={{ mb: 2 }}>
              <Typography sx={{ color: '#576574' }}>Description</Typography>
                <TextField multiline rows={4} sx={{width:"300px"}} name="agreementLg" placeholder="---"  />
              </Stack> 

              <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
              <Typography sx={{ color: '#576574' }}>Internal Description</Typography>
                <TextField multiline rows={4} sx={{width:"300px"}} name="agreementLg" placeholder="---"  />
              </Stack> 
        </CardContent>           
      </Card>
      </Grid>
    </Grid>
    <Box sx={{ 
          position: 'absolute',
          bottom: '5%',
          right: '5%'
          }}>
      <Button
          sx={{
            backgroundColor: '#0090F8',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#0077CC',
            },
          }}
          onClick={handleOpen}
        >
          Save
        </Button>
    </Box>
    

        </Box>
      </Modal>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <CustomerLayout>
      {page}
    </CustomerLayout>
  </DashboardLayout>
);

export default Page;
