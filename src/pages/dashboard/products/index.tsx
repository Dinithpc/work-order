import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { Box, Button, Card, Container, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { productsApi } from '../../../api/products';
import { useDialog } from '../../../hooks/use-dialog';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { useSelection } from '../../../hooks/use-selection';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { ProductCreateDialog } from '../../../sections/dashboard/products/product-create-dialog';
import { ProductsSearch } from '../../../sections/dashboard/products/products-search';
import { ProductsStats } from '../../../sections/dashboard/products/products-stats';
import { ProductsTable } from '../../../sections/dashboard/products/products-table';
import type { Filter } from '../../../types/filter';
import type { Product } from '../../../types/product';

type View = 'all' | 'published' | 'draft' | 'archived';

interface ProductsSearchState {
  filters: Filter[];
  page: number;
  query: string;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  view: View;
}

const useProductsSearch = () => {
  const [state, setState] = useState<ProductsSearchState>({
    filters: [],
    page: 0,
    query: '',
    rowsPerPage: 5,
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

interface ProductsStoreState {
  data?: {
    products: Product[];
    productsCount: number;
  };
  error?: string;
  isLoading?: boolean;
}

interface ProductsStore {
  state: ProductsStoreState;
}

const useProductsStore = (searchState: ProductsSearchState): ProductsStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<ProductsStoreState>({ isLoading: true });

  const handleProductsGet = useCallback(
    async (searchState: ProductsSearchState) => {
      setState({ isLoading: true });

      try {
        const response = await productsApi.getProducts({
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
              products: response.data,
              productsCount: response.count
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
      handleProductsGet(searchState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    state
  };
};

const useProductsIds = (storeState: ProductsStoreState): string[] => {
  return useMemo(
    () => {
      if (!storeState.data) {
        return [];
      }

      return storeState.data.products.map((product) => product.id);
    },
    [storeState]
  );
};

const Page: NextPage = () => {
  const productsSearch = useProductsSearch();
  const productsStore = useProductsStore(productsSearch.state);
  const productsIds = useProductsIds(productsStore.state);
  const productsSelection = useSelection<string>(productsIds);
  const createDialog = useDialog();

  usePageView();

  return (
    <>
      <Head>
        <title>
          Product: List | Carpatin
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
                  Products
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
            <ProductsStats />
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1
              }}
            >
              <ProductsSearch
                disabled={productsStore.state.isLoading}
                filters={productsSearch.state.filters}
                onFiltersApply={productsSearch.handleFiltersApply}
                onFiltersClear={productsSearch.handleFiltersClear}
                onQueryChange={productsSearch.handleQueryChange}
                onViewChange={productsSearch.handleViewChange}
                query={productsSearch.state.query}
                selected={productsSelection.selected}
                view={productsSearch.state.view}
              />
              <Divider />
              <ProductsTable
                count={productsStore.state.data?.productsCount}
                error={productsStore.state.error}
                isLoading={productsStore.state.isLoading}
                items={productsStore.state.data?.products}
                onDeselectAll={productsSelection.handleDeselectAll}
                onDeselectOne={productsSelection.handleDeselectOne}
                onPageChange={productsSearch.handlePageChange}
                onSelectAll={productsSelection.handleSelectAll}
                onSelectOne={productsSelection.handleSelectOne}
                onSortChange={productsSearch.handleSortChange}
                page={productsSearch.state.page}
                rowsPerPage={productsSearch.state.rowsPerPage}
                selected={productsSelection.selected}
                sortBy={productsSearch.state.sortBy}
                sortDir={productsSearch.state.sortDir}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      <ProductCreateDialog
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
