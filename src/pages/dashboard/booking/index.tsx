import type { NextPage } from 'next';
import Head from 'next/head';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { Button, Box, Unstable_Grid2 as Grid } from '@mui/material';
import { CustomersTable } from '../../../sections/dashboard/customers/customers-table';
import { customersApi } from '../../../api/customers';
import { useMounted } from '../../../hooks/use-mounted';
import { useSelection } from '../../../hooks/use-selection';
import type { Customer } from '../../../types/customer';
import type { Filter } from '../../../types/filter';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookingTable } from '../../../sections/dashboard/booking/BookingTable';

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
  const customersSearch = useCustomersSearch();
  const customersStore = useCustomersStore(customersSearch.state);
  const customersIds = useCustomersIds(customersStore.state);
  const customersSelection = useSelection<string>(customersIds);
  usePageView();

  return (
<>
      <Head>
        <title>
          Booking
        </title>
      </Head>

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
      borderRadius : '12px',
      boxShadow: '0px 4px 10px 0px rgba(137, 137, 137, 0.1)' // Added slight shadow with 10% opacity
    }}
  >
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' , gap: 1 }}>
        <img src="/assets/icon.svg" alt="side nav" />   New
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' , gap: 1 }}>
        <img src="/assets/icon-2.svg" alt="side nav" /> Export to Excel
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center'  , gap: 1}}>
        <img src="/assets/icon-3.svg" alt="side nav" /> Refresh
      </Box>
    </Box>
    <Button
      variant="contained"
      color="primary"
      sx={{ fontWeight: 600, fontSize: '20px' , width : '140px' }}
    >
      Share
    </Button>
  </Box>

  <Box sx={{mt:2}}>
    <BookingTable
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
    {page}
  </DashboardLayout>
);

export default Page;
