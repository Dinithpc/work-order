import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { Box, Button, Card, Container, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { invoicesApi } from '../../../api/invoices';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { useSelection } from '../../../hooks/use-selection';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { InvoicesSearch } from '../../../sections/dashboard/invoices/invoices-search';
import { InvoicesStats } from '../../../sections/dashboard/invoices/invoices-stats';
import { InvoicesTable } from '../../../sections/dashboard/invoices/invoices-table';
import type { Filter } from '../../../types/filter';
import type { Invoice } from '../../../types/invoice';

type View = 'all' | 'ongoing' | 'paid' | 'overdue';

interface InvoicesSearchState {
  filters: Filter[];
  page: number;
  query: string;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  view: View;
}

const useInvoicesSearch = () => {
  const [state, setState] = useState<InvoicesSearchState>({
    filters: [],
    page: 0,
    query: '',
    rowsPerPage: 5,
    sortBy: 'issueDate',
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

interface InvoicesStoreState {
  data?: {
    invoices: Invoice[];
    invoicesCount: number;
  };
  error?: string;
  isLoading?: boolean;
}

interface InvoicesStore {
  state: InvoicesStoreState;
}

const useInvoicesStore = (searchState: InvoicesSearchState): InvoicesStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<InvoicesStoreState>({ isLoading: true });

  const handleInvoicesGet = useCallback(
    async (searchState: InvoicesSearchState) => {
      setState({ isLoading: true });

      try {
        const response = await invoicesApi.getInvoices({
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
              invoices: response.data,
              invoicesCount: response.count
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
      handleInvoicesGet(searchState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    state
  };
};

const useInvoicesIds = (storeState: InvoicesStoreState): string[] => {
  return useMemo(
    () => {
      if (!storeState.data) {
        return [];
      }

      return storeState.data.invoices.map((invoice) => invoice.id);
    },
    [storeState]
  );
};

const Page: NextPage = () => {
  const invoicesSearch = useInvoicesSearch();
  const invoicesStore = useInvoicesStore(invoicesSearch.state);
  const invoiceIds = useInvoicesIds(invoicesStore.state);
  const invoiceSelection = useSelection<string>(invoiceIds);

  usePageView();

  return (
    <>
      <Head>
        <title>
          Invoice: List | Carpatin
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
                  Invoices
                </Typography>
              </div>
              <Button
                component={NextLink}
                href={paths.dashboard.invoices.create}
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
            <InvoicesStats
              chartSeries={[121, 21, 10]}
              labels={['Ongoing', 'Paid', 'Overdue']}
            />
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1
              }}
            >
              <InvoicesSearch
                disabled={invoicesStore.state.isLoading}
                filters={invoicesSearch.state.filters}
                onFiltersApply={invoicesSearch.handleFiltersApply}
                onFiltersClear={invoicesSearch.handleFiltersClear}
                onQueryChange={invoicesSearch.handleQueryChange}
                onViewChange={invoicesSearch.handleViewChange}
                query={invoicesSearch.state.query}
                selected={invoiceSelection.selected}
                view={invoicesSearch.state.view}
              />
              <Divider />
              <InvoicesTable
                count={invoicesStore.state.data?.invoicesCount}
                error={invoicesStore.state.error}
                isLoading={invoicesStore.state.isLoading}
                items={invoicesStore.state.data?.invoices}
                onDeselectAll={invoiceSelection.handleDeselectAll}
                onDeselectOne={invoiceSelection.handleDeselectOne}
                onPageChange={invoicesSearch.handlePageChange}
                onSelectAll={invoiceSelection.handleSelectAll}
                onSelectOne={invoiceSelection.handleSelectOne}
                onSortChange={invoicesSearch.handleSortChange}
                page={invoicesSearch.state.page}
                rowsPerPage={invoicesSearch.state.rowsPerPage}
                selected={invoiceSelection.selected}
                sortBy={invoicesSearch.state.sortBy}
                sortDir={invoicesSearch.state.sortDir}
              />
            </Card>
          </Stack>
        </Container>
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
