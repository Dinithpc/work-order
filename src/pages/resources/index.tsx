import type { NextPage } from 'next';
import Head from 'next/head';
import { usePageView } from '../../hooks/use-page-view';
import { Layout as ResourcesLayout } from '../../layouts/resources';
import { Box, Card,   SvgIcon, Button, Typography , Modal , Tabs , Stack , TextField , MenuItem, CardContent,    Unstable_Grid2 as Grid,   Tab, Divider} from '@mui/material';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CustomersTable } from '../../sections/resources/resources-table';
import { customersApi } from '../../api/customers';
import { useDialog } from '../../hooks/use-dialog';
import { useMounted } from '../../hooks/use-mounted';
import { useSelection } from '../../hooks/use-selection';
import type { Customer } from '../../types/customer';
import type { Filter } from '../../types/filter';

import type { ChangeEvent} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { paths } from '../../paths';

import InputAdornment from '@mui/material/InputAdornment';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

type View = 'all' | 'isReturning' | 'orderedRecently';

interface CustomersSearchState {
  filters: Filter[];
  page: number;
  query: string;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  view: View;
}

const useCustomersSearch = () => {
  const [state, setState] = useState<CustomersSearchState>({
    filters: [],
    page: 0,
    query: '',
    rowsPerPage: 10,
    sortBy: 'createdAt',
    sortDir: 'desc',
    view: 'all'
  });

  const handleFiltersApply = useCallback(
    (filters: Filter[]): void => {
      setState((prevState) => ({
        ...prevState,
        page: 0,
        filters
      }));
    },
    []
  );

  const handleFiltersClear = useCallback(
    (): void => {
      setState((prevState) => ({
        ...prevState,
        page: 0,
        filters: []
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    (page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page
      }));
    },
    []
  );

  const handleQueryChange = useCallback(
    (query: string): void => {
      setState((prevState) => ({
        ...prevState,
        page: 0,
        query
      }));
    },
    []
  );

  const handleSortChange = useCallback(
    (sortBy: string): void => {
      setState((prevState) => {
        const sortDir = (prevState.sortBy === sortBy && prevState.sortDir === 'asc')
          ? 'desc'
          : 'asc';

        return {
          ...prevState,
          page: 0,
          sortBy,
          sortDir
        };
      });
    },
    []
  );

  const handleViewChange = useCallback(
    (view: View): void => {
      setState((prevState) => ({
        ...prevState,
        page: 0,
        view
      }));
    },
    []
  );

  return {
    handleFiltersApply,
    handleFiltersClear,
    handlePageChange,
    handleQueryChange,
    handleSortChange,
    handleViewChange,
    state
  };
};

interface CustomersStoreState {
  data?: {
    customers: Customer[];
    customersCount: number;
  };
  error?: string;
  isLoading?: boolean;
}

interface CustomersStore {
  state: CustomersStoreState;
}

const useCustomersStore = (searchState: CustomersSearchState): CustomersStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<CustomersStoreState>({ isLoading: true });

  const handleCustomersGet = useCallback(
    async (searchState: CustomersSearchState) => {
      setState({ isLoading: true });

      try {
        const response = await customersApi.getCustomers({
          filters: searchState.filters,
          page: searchState.page,
          query: searchState.query,
          rowsPerPage: searchState.rowsPerPage,
          sortBy: searchState.sortBy,
          sortDir: searchState.sortDir,
          view: searchState.view
        });

        if (isMounted()) {
          setState({
            data: {
              customers: response.data,
              customersCount: response.count
            }
          });
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
      handleCustomersGet(searchState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    state
  };
};

const useCustomersIds = (storeState: CustomersStoreState): string[] => {
  return useMemo(
    () => {
      if (!storeState.data) {
        return [];
      }

      return storeState.data.customers.map((customer) => customer.id);
    },
    [storeState]
  );
};

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


const Page: NextPage = () => {
  const customersSearch = useCustomersSearch();
  const customersStore = useCustomersStore(customersSearch.state);
  const customersIds = useCustomersIds(customersStore.state);
  const customersSelection = useSelection<string>(customersIds);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleTabsChange = useCallback(
    (event: ChangeEvent<{}>, value: string): void => {
      router.push(value);
    },
    [router]
  );

  const currentTab = tabOptions.find((option) => option.path === pathname);

  usePageView();

  return (
    <>
      <Box sx={{ bgcolor: '#F8F8F8' }}>
        <Box
          sx={{
            bgcolor: '#ffffff',
            py: 3,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            fontWeight: 500,
            borderRadius: '12px',
            boxShadow: '0px 4px 10px 0px rgba(137, 137, 137, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 4 }}>
          <Button
            color="inherit"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            )}
          >
            <Typography sx={{  fontWeight:500 , fontSize: '18px',}}>Back</Typography>
          </Button>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/icon-3.svg" alt="side nav" /> Refresh
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
              onClick={handleOpen}
            >
              <img src="/assets/icon.svg" alt="side nav" /> New
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/resources/save.png" alt="side nav" /> Save
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/resources/saveClose.png" alt="side nav" /> Save & Close
              </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/resources/deactivate.png" alt="side nav" /> Deactivate
              </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/resources/delete.png" alt="side nav" /> Delete
              </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 600,
              fontSize: '20px',
              width: '140px',
            }}
          >
            Share
          </Button>
        </Box>
        <Box sx={{mt:2}}>
    <CustomersTable
        count={customersStore.state.data?.customersCount}
        error={customersStore.state.error}
        isLoading={customersStore.state.isLoading}
        items={customersStore.state.data?.customers}
        onDeselectAll={customersSelection.handleDeselectAll}
        onDeselectOne={customersSelection.handleDeselectOne}
        onPageChange={customersSearch.handlePageChange}
        onSelectAll={customersSelection.handleSelectAll}
        onSelectOne={customersSelection.handleSelectOne}
        onSortChange={customersSearch.handleSortChange}
        page={customersSearch.state.page}
        rowsPerPage={customersSearch.state.rowsPerPage}
        selected={customersSelection.selected}
        sortBy={customersSearch.state.sortBy}
        sortDir={customersSearch.state.sortDir}
        />
  </Box>
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
            Add New Resource
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

                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ my: 2 }}>
                        <Typography sx={{ color: '#576574' , fontWeight : 400 , fontSize: '18px' }}>Name</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="Name"
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ my: 2 }}>
                        <Typography sx={{ color: '#576574' , fontWeight : 400 , fontSize: '18px' }}>Resource Type</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="Name"
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ my: 2 }}>
                        <Typography sx={{ color: '#576574' , fontWeight : 400 , fontSize: '18px' }}>User Name</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="Name"
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ my: 2 }}>
                        <Typography sx={{ color: '#576574' , fontWeight : 400 , fontSize: '18px' }}>Email (Primary)</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="Name"
                        />
                      </Stack>  
                      <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ my: 2 }}>
                        <Typography sx={{ color: '#576574' , fontWeight : 400 , fontSize: '18px' }}>Contact (Primary)</Typography>
                        <TextField sx={{ 
                            flex: '1 1 20%', 
                            minWidth: '150px', 
                            maxWidth: '300px' 
                            }} name="Name"
                        />
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
            Profile Image
            </Typography>
              <Stack direction="column" justifyContent="space-between"  spacing={2} sx={{ mb: 2 }}>
                <img src="/assets/resources/default.png" alt="side nav" /> Save & Close
              </Stack> 

              <Stack direction="column" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
              test 2
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
  <ResourcesLayout>
    {page}
  </ResourcesLayout>
);

export default Page;
