import type { NextPage } from 'next';
import Head from 'next/head';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as CustomerLayout } from '../../../layouts/customer';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { Box, Button, Grid, Typography } from '@mui/material';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CustomersTable } from '../../../sections/dashboard/customers/customers-table';
import { customersApi } from '../../../api/customers';
import { useDialog } from '../../../hooks/use-dialog';
import { useMounted } from '../../../hooks/use-mounted';
import { useSelection } from '../../../hooks/use-selection';
import type { Customer } from '../../../types/customer';
import type { Filter } from '../../../types/filter';

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


const Page: NextPage = () => {
  usePageView();
  const customersSearch = useCustomersSearch();
  const customersStore = useCustomersStore(customersSearch.state);
  const customersIds = useCustomersIds(customersStore.state);
  const customersSelection = useSelection<string>(customersIds);

  return (
    <>
      <Head>
        <title>
          Customer: Tasks | Carpatin
        </title>
      </Head>
      <Box padding={1}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} sm={4}>
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
            <Typography sx={{fontSize:'14px' , fontWeight:300 , color : '#576574'}} > Completed Tasks</Typography>
            <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="flex-end" 
                    height="100%" 
                    paddingBottom={2}
                    >
                    <Box display="flex" alignItems="flex-end">
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' }}>10</Typography>
                        <Typography sx={{ fontSize: '36px', fontWeight: 300, color: '#222F3E' }}>/</Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#576574' , mb:1 }}>12</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
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
            <Typography sx={{fontSize:'14px' , fontWeight:300 , color : '#576574'}} > Total Estimation Duration</Typography>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="flex-end" 
                    height="100%" 
                    paddingBottom={2}
                    >
                    <Box display="flex" alignItems="flex-end">
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' }}>01</Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#576574', marginBottom: '8px' }}>h</Typography>
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' , ml:1}}>15</Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#576574', marginBottom: '8px' }}>mins</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
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
            <Typography sx={{fontSize:'14px' , fontWeight:300 , color : '#576574'}} > Total Actual Duration</Typography>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="flex-end" 
                    height="100%" 
                    paddingBottom={2}
                    >
                    <Box display="flex" alignItems="flex-end">
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' }}>01</Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#576574', marginBottom: '8px' }}>h</Typography>
                        <Typography sx={{ fontSize: '36px', fontWeight: 600, color: '#0090F8' , ml:1}}>45</Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#576574', marginBottom: '8px' }}>mins</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
      </Grid>

      <Button
        sx={{ 
          fontWeight: 600, 
          fontSize: '20px', 
          width: '15%',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: "#0090F8",
          color: "#ffffff",
          my:4,
          marginLeft: 'auto', // This moves the button to the right
          '&:hover': {
            backgroundColor: "#0090F8", // Keep the same background color on hover
            color: "#ffffff" // Keep the same text color on hover
          }
        }}
        startIcon={<img src="/assets/productService/plus.svg" alt="plus" />}
      >
        Add Task
      </Button>

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
