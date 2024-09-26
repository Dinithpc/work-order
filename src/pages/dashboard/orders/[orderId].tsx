import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import toast from 'react-hot-toast';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { ordersApi } from '../../../api/orders';
import { ActionsMenu } from '../../../components/actions-menu';
import { ResourceError } from '../../../components/resource-error';
import { ResourceUnavailable } from '../../../components/resource-unavailable';
import { useDialog } from '../../../hooks/use-dialog';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { OrderDetails } from '../../../sections/dashboard/orders/order-details';
import { OrderDetailsDialog } from '../../../sections/dashboard/orders/order-details-dialog';
import { OrderLineItems } from '../../../sections/dashboard/orders/order-line-items';
import { OrderPayment } from '../../../sections/dashboard/orders/order-payment';
import { OrderPaymentDialog } from '../../../sections/dashboard/orders/order-payment-dialog';
import { OrderQuickActions } from '../../../sections/dashboard/orders/order-quick-actions';
import type { Order } from '../../../types/order';

interface OrderStoreState {
  data?: Order;
  error?: string;
  isLoading?: boolean;
}

interface OrderStore {
  state: OrderStoreState;
}

const useOrderStore = (): OrderStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<OrderStoreState>({ isLoading: true });

  const handleOrderGet = useCallback(
    async () => {
      setState({ isLoading: true });

      try {
        const response = await ordersApi.getOrder();

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
      handleOrderGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    state
  };
};

type ResourcesState = 'loading' | 'error' | 'unavailable' | 'available';

const getResourcesState = (storeState: OrderStoreState): ResourcesState => {
  if (storeState.isLoading) {
    return 'loading';
  }

  if (storeState.error) {
    return 'error';
  }

  return storeState.data ? 'available' : 'unavailable';
};

const Page: NextPage = () => {
  const orderStore = useOrderStore();
  const detailsDialog = useDialog();
  const paymentDialog = useDialog();

  usePageView();

  const handleMarkDuplicate = useCallback(
    (): void => {
      toast.error('This action is not available on demo');
    },
    []
  );

  const handleCancel = useCallback(
    (): void => {
      toast.error('This action is not available on demo');
    },
    []
  );

  const handleDelete = useCallback(
    (): void => {
      toast.error('This action is not available on demo');
    },
    []
  );

  const resourcesState = getResourcesState(orderStore.state);

  return (
    <>
      <Head>
        <title>
          Order: Details | Carpatin
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
          {resourcesState === 'loading' && (
            <div>
              <Skeleton height={42} />
              <Skeleton />
              <Skeleton />
            </div>
          )}
          {resourcesState === 'error' && (
            <ResourceError message="Something went wrong" />
          )}
          {resourcesState === 'unavailable' && (
            <ResourceUnavailable message="Resources are not available" />
          )}
          {resourcesState === 'available' && (
            <Stack spacing={4}>
              <Stack spacing={2}>
                <div>
                  <Button
                    color="inherit"
                    component={NextLink}
                    href={paths.dashboard.orders.index}
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowLeftIcon />
                      </SvgIcon>
                    )}
                  >
                    Orders
                  </Button>
                </div>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <div>
                    <Typography variant="h4">
                      Order
                    </Typography>
                  </div>
                  <ActionsMenu
                    actions={[
                      {
                        label: 'Mark as Duplicate',
                        handler: handleMarkDuplicate
                      },
                      {
                        label: 'Cancel Order',
                        handler: handleCancel
                      },
                      {
                        label: 'Delete Order',
                        handler: handleDelete
                      }
                    ]}
                  />
                </Stack>
              </Stack>
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    lg={8}
                  >
                    <Stack spacing={3}>
                      <OrderDetails
                        onEdit={detailsDialog.handleOpen}
                        order={orderStore.state.data!}
                      />
                      <OrderPayment
                        onEdit={paymentDialog.handleOpen}
                        order={orderStore.state.data!}
                      />
                      <OrderLineItems order={orderStore.state.data!} />
                    </Stack>
                  </Grid>
                  <Grid
                    xs={12}
                    lg={4}
                  >
                    <OrderQuickActions order={orderStore.state.data!} />
                  </Grid>
                </Grid>
              </div>
            </Stack>
          )}
        </Container>
      </Box>
      <OrderDetailsDialog
        onClose={detailsDialog.handleClose}
        open={detailsDialog.open}
        order={orderStore.state.data}
      />
      <OrderPaymentDialog
        onClose={paymentDialog.handleClose}
        open={paymentDialog.open}
        order={orderStore.state.data}
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
