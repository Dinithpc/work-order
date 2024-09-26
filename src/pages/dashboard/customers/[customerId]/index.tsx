import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { customersApi } from '../../../../api/customers';
import { ResourceError } from '../../../../components/resource-error';
import { ResourceLoading } from '../../../../components/resource-loading';
import { ResourceUnavailable } from '../../../../components/resource-unavailable';
import { useDialog } from '../../../../hooks/use-dialog';
import { useMounted } from '../../../../hooks/use-mounted';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as CustomerLayout } from '../../../../layouts/customer';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { CustomerDialog } from '../../../../sections/dashboard/customers/customer-dialog';
import React from 'react';
import { QueryField } from 'src/components/query-field';
import type { Customer, CustomerNote, CustomerOrder } from '../../../../types/customer';
import { createResourceId } from '../../../../utils/create-resource-id';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import InputAdornment from '@mui/material/InputAdornment';
import {  SvgIcon } from '@mui/material';
import UserTable from '../../../../sections/dashboard/customers/booking-modal-table';
import {
  Modal,
  Box,
  Card,
  CardContent,
  Button,
  MenuItem,
  TextField,
  Typography,
  Stack,
  Unstable_Grid2 as Grid
} from '@mui/material';
import BookingList from '../../../../components/bookingComponent';
import { CustomerBookings } from '../../../../types/customer';
import { CustomerBooking } from '../../../../api/customers/dummydata';

interface CustomerStoreState {
  data?: Customer;
  error?: string;
  isLoading?: boolean;
}

interface CustomerStore {
  state: CustomerStoreState;
}

interface DashboardProps {
  bookings: CustomerBookings[];
}

const useCustomerStore = (): CustomerStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<CustomerStoreState>({ isLoading: true });

  const handleCustomerGet = useCallback(
    async () => {
      setState({ isLoading: true });

      try {
        const response = await customersApi.getCustomer();

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
      handleCustomerGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
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

const useOrdersStore = (): OrdersStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<OrdersStoreState>({ isLoading: true });


  const handleOrdersGet = useCallback(
    async () => {
      setState({ isLoading: true });

      try {
        const response = await customersApi.getCustomerOrders();

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
      handleOrdersGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    state
  };
};

interface NotesStoreState {
  data?: CustomerNote[];
  error?: string;
  isLoading?: boolean;
}

interface NotesStore {
  handleNoteCreate: (content: string) => void;
  handleNoteDelete: (noteId: string) => void;
  state: NotesStoreState;
}

const useNotesStore = (): NotesStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<NotesStoreState>({ isLoading: true });

  const handleNotesGet = useCallback(
    async () => {
      setState({ isLoading: true });

      try {
        const response = await customersApi.getCustomerNotes();

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

  const handleNoteCreate = useCallback(
    (content: string): void => {
      // Do API call and create the note

      const note: CustomerNote = {
        id: createResourceId(),
        authorId: '5e86809283e28b96d2d38537',
        authorAvatar: '/assets/avatars/avatar-chen-simmons.jpg',
        authorName: 'Chen Simmons',
        content,
        createdAt: new Date().getTime()
      };

      setState((prevState) => {
        if (!prevState.data) {
          return prevState;
        }

        return {
          ...prevState,
          data: [
            note,
            ...prevState.data
          ]
        };
      });
    },
    []
  );

  const handleNoteDelete = useCallback(
    (noteId: string): void => {
      // Do API call

      setState((prevState) => {
        return {
          ...prevState,
          data: (prevState.data || []).filter((note) => note.id !== noteId)
        };
      });
    },
    []
  );

  useEffect(
    () => {
      handleNotesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    handleNoteCreate,
    handleNoteDelete,
    state
  };
};

type ResourcesState = 'loading' | 'error' | 'unavailable' | 'available';

const getResourcesState = (
  customerStoreState: CustomerStoreState,
  ordersStoreState: OrdersStoreState,
  notesStoreState: NotesStoreState
): ResourcesState => {
  if (
    customerStoreState.isLoading ||
    notesStoreState.isLoading ||
    ordersStoreState.isLoading
  ) {
    return 'loading';
  }

  if (
    customerStoreState.error ||
    notesStoreState.error ||
    ordersStoreState.error
  ) {
    return 'error';
  }

  if (
    customerStoreState.data &&
    notesStoreState.data &&
    ordersStoreState.data
  ) {
    return 'available';
  }

  return 'unavailable';
};

const statusOptions = [
  { value: 'Scheduled', label: 'Scheduled' },
  { value: 'Unscheduled', label: 'Unscheduled' },
];

const priorityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const Page: NextPage = () => {
  const [bookings, setBookings] = useState<CustomerBookings[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchBookings = useCallback(async () => {
    try {
      // Simulate an API call
      setTimeout(() => {
        setBookings(CustomerBooking);
        setIsLoading(false);
      }, 1000); // Simulate a delay
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);  
  const customerStore = useCustomerStore();
  const ordersStore = useOrdersStore();
  const notesStore = useNotesStore();
  const detailsDialog = useDialog();

  usePageView();

  const resourcesState = getResourcesState(
    customerStore.state,
    ordersStore.state,
    notesStore.state
  );


  return (
    <>
      <Head>
        <title>
          Customer: Summary | Carpatin
        </title>
      </Head>
       {resourcesState === 'loading' && (
        <ResourceLoading message="Loading resources" />
      )}
      {resourcesState === 'error' && (
        <ResourceError message="Something went wrong" />
      )}
      {resourcesState === 'unavailable' && (
        <ResourceUnavailable message="Resources are not available" />
      )} 
       {resourcesState === 'available' && (
        <div>
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
                <CardContent sx={{ border: '1px solid #E8E8E8' , borderRadius:'10px' }}>
                 <Grid
                    container
                    spacing={3}
                  >
                    <Box sx={{minWidth : '100%'}}>

                    <Typography variant="h6">
                      Details
                    </Typography>

                    <form>
                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ my: 2 }}>
                        <Typography sx={{ color: '#576574' }}>Status</Typography>
                        <TextField  sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }}
                              name="status" select value={statusOptions[0].value} >
                          {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              <img src="/assets/ScheduleBoard.svg" alt="Icon" style={{ marginRight: '8px', height: '15px' }} />
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
                        <Typography sx={{ color: '#576574' }}>Priority</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }}
                              name="priority" select value={priorityOptions[0].value}>
                          {priorityOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
                        <Typography sx={{ color: '#576574' }}>Service Amount</Typography>
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
                        <Typography sx={{ color: '#576574' }}>Work Order Type:</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="workOrderType" 
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
                        <Typography sx={{ color: '#576574' }}>Incident Type</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="incidentType" 
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
                        <Typography sx={{ color: '#576574' }}>Agreement</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="agreement" placeholder="---" 
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
                      <Typography sx={{ color: '#576574' }}>Agreement</Typography>
                        <TextField multiline rows={4} sx={{width:"300px"}} name="agreementLg" placeholder="---"  />
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
        <CardContent sx={{ border: '1px solid #E8E8E8' , borderRadius:'10px' }}>
          <Typography variant="h6">
            Booking Suggestions
          </Typography>
          <Box sx={{my:4}}>
            <BookingList bookings={bookings} />
          </Box>
          <Typography variant="h6">
            Requirements
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src='/assets/logos/timer.svg' alt="timer" style={{ marginRight: '8px' }} />
              <span>30min duration</span>
            </Box>
            <Button 
          sx={{ 
            backgroundColor: '#0090F8', 
            color: 'white',
            '&:hover': {
              backgroundColor: '#0070D8' // Darker blue for hover
            }
          }}
          onClick={handleOpen}

        >
  Find Availability
</Button>  

</Box>
        </CardContent>
      </Card>
      </Grid>
    </Grid>
  </div>
)} 

{/* Modal component */}
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
            Showing Availability for W0_000145
          </Typography>
          <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '22px'
          }}
        >
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap:2,
            mb:2
          }}>
            <img src="/assets/Filter.svg" />
            <Typography>Edit Filters</Typography>
            <QueryField
              placeholder="Filter By Keyword"
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#B9B9B9',
                fontSize: '18px',
                fontWeight: 400,
                borderRadius: '12px',
                width: '300px'
              }}
            />
            </Box>
          </Box>
          <UserTable />
        </Box>
      </Modal>

       <CustomerDialog
        action="update"
        customer={customerStore.state.data}
        onClose={detailsDialog.handleClose}
        open={detailsDialog.open}
      /> 
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
