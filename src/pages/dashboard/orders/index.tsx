import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { ordersApi } from '../../../api/orders';
import { useDialog } from '../../../hooks/use-dialog';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { useSelection } from '../../../hooks/use-selection';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { OrderCreateDialog } from '../../../sections/dashboard/orders/order-create-dialog';
import { OrdersDnd } from '../../../sections/dashboard/orders/orders-dnd';
import { OrdersSearch } from '../../../sections/dashboard/orders/orders-search';
import { OrdersTable } from '../../../sections/dashboard/orders/orders-table';
import type { Filter } from '../../../types/filter';
import type { Order } from '../../../types/order';

type SortDir = 'asc' | 'desc';

type View = 'all' | 'complete' | 'delivered' | 'processed';

interface OrdersSearchState {
  filters: Filter[];
  page: number;
  query: string;
  rowsPerPage: number;
  sortBy: string;
  sortDir: SortDir;
  view: View;
}

const useOrdersSearch = () => {
  const [state, setState] = useState<OrdersSearchState>({
    filters: [],
    page: 0,
    rowsPerPage: 5,
    query: '',
    sortBy: 'createdAt',
    sortDir: 'desc',
    view: 'all'
  });

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

  const handleQueryChange = useCallback(
    (query: string): void => {
      setState((prevState) => ({
        ...prevState,
        page: 0,
        query: query
      }));
    },
    []
  );

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

  return {
    handleViewChange,
    handleQueryChange,
    handleFiltersApply,
    handleFiltersClear,
    handlePageChange,
    handleSortChange,
    state
  };
};

interface OrdersStoreState {
  data?: {
    orders: Order[],
    ordersCount: number
  };
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
        const response = await ordersApi.getOrders({
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
              orders: response.data,
              ordersCount: response.count
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
      handleOrdersGet(searchState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    state
  };
};

const useOrderIds = (storeState: OrdersStoreState): string[] => {
  return useMemo(
    () => {
      if (!storeState.data) {
        return [];
      }

      return storeState.data.orders.map((order) => order.id);
    },
    [storeState]
  );
};

const Page: NextPage = () => {
  const ordersSearch = useOrdersSearch();
  const ordersStore = useOrdersStore(ordersSearch.state);
  const orderIds = useOrderIds(ordersStore.state);
  const ordersSelection = useSelection<string>(orderIds);
  const createDialog = useDialog();
  const [mode, setMode] = useState<'dnd' | 'table'>('dnd');

  usePageView();

  const handleModeChange = useCallback(
    (mode: 'dnd' | 'table'): void => {
      setMode(mode);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Order: List | Carpatin
        </title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ height: '100%' }}
        >
          <Stack
            spacing={4}
            sx={{ height: '100%' }}
          >
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              <div>
                <Typography variant="h4">
                  Orders
                </Typography>
              </div>
              <Button
                onClick={createDialog.handleOpen}
                size="large"
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add
              </Button>
            </Stack>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1
              }}
            >
              <OrdersSearch
                disabled={ordersStore.state.isLoading}
                filters={ordersSearch.state.filters}
                mode={mode}
                onFiltersApply={ordersSearch.handleFiltersApply}
                onFiltersClear={ordersSearch.handleFiltersClear}
                onModeChange={handleModeChange}
                onQueryChange={ordersSearch.handleQueryChange}
                onViewChange={ordersSearch.handleViewChange}
                query={ordersSearch.state.query}
                selected={ordersSelection.selected}
                view={ordersSearch.state.view}
              />
              {mode === 'dnd' && (
                <OrdersDnd
                  error={ordersStore.state.error}
                  isLoading={ordersStore.state.isLoading}
                  items={ordersStore.state.data?.orders}
                />
              )}
              {mode === 'table' && (
                <OrdersTable
                  count={ordersStore.state.data?.ordersCount}
                  error={ordersStore.state.error}
                  isLoading={ordersStore.state.isLoading}
                  items={ordersStore.state.data?.orders}
                  onDeselectAll={ordersSelection.handleDeselectAll}
                  onDeselectOne={ordersSelection.handleDeselectOne}
                  onPageChange={ordersSearch.handlePageChange}
                  onSelectAll={ordersSelection.handleSelectAll}
                  onSelectOne={ordersSelection.handleSelectOne}
                  onSortChange={ordersSearch.handleSortChange}
                  page={ordersSearch.state.page}
                  rowsPerPage={ordersSearch.state.rowsPerPage}
                  selected={ordersSelection.selected}
                  sortBy={ordersSearch.state.sortBy}
                  sortDir={ordersSearch.state.sortDir}
                />
              )}
            </Card>
          </Stack>
        </Container>
      </Box>
      <OrderCreateDialog
        onClose={createDialog.handleClose}
        open={createDialog.open}
      />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
