import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import type { NextPage } from 'next';
import Head from 'next/head';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';
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
import { invoicesApi } from '../../../../api/invoices';
import { ResourceError } from '../../../../components/resource-error';
import { ResourceUnavailable } from '../../../../components/resource-unavailable';
import { useMounted } from '../../../../hooks/use-mounted';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { paths } from '../../../../paths';
import { InvoiceDetails } from '../../../../sections/dashboard/invoices/invoice-details';
import { InvoiceLineItems } from '../../../../sections/dashboard/invoices/invoice-line-items';
import { InvoicePayment } from '../../../../sections/dashboard/invoices/invoice-payment';
import { InvoicePaymentHistory } from '../../../../sections/dashboard/invoices/invoice-payment-history';
import { InvoiceQuickActions } from '../../../../sections/dashboard/invoices/invoice-quick-actions';
import type { Invoice } from '../../../../types/invoice';

interface InvoiceStoreState {
  data?: Invoice;
  error?: string;
  isLoading?: boolean;
}

interface InvoiceStore {
  state: InvoiceStoreState;
}

const useInvoiceStore = (): InvoiceStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<InvoiceStoreState>({ isLoading: true });

  const handleInvoiceGet = useCallback(
    async () => {
      setState({ isLoading: true });

      try {
        const response = await invoicesApi.getInvoice();

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
      handleInvoiceGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    state
  };
};

type ResourcesState = 'loading' | 'error' | 'unavailable' | 'available';

const getResourcesState = (storeState: InvoiceStoreState): ResourcesState => {
  if (storeState.isLoading) {
    return 'loading';
  }

  if (storeState.error) {
    return 'error';
  }

  return storeState.data ? 'available' : 'unavailable';
};

const Page: NextPage = () => {
  const invoiceStore = useInvoiceStore();

  usePageView();

  const resourcesState = getResourcesState(invoiceStore.state);

  return (
    <>
      <Head>
        <title>
          Invoice: Summary | Carpatin
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
                    href={paths.dashboard.invoices.index}
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowLeftIcon />
                      </SvgIcon>
                    )}
                    variant="text"
                  >
                    Invoices
                  </Button>
                </div>
              </Stack>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Invoice
                  </Typography>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <Box
                      sx={{
                        backgroundColor: 'error.main',
                        borderRadius: '50%',
                        height: 8,
                        width: 8
                      }}
                    />
                    <Typography
                      color="error.main"
                      variant="body2"
                    >
                      Unpaid
                    </Typography>
                  </Stack>
                </Stack>
                <Button
                  component={NextLink}
                  href={paths.dashboard.invoices.details.preview}
                  size="large"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <EyeIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Preview
                </Button>
              </Stack>
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    lg={8}
                    sx={{
                      order: {
                        xs: 1,
                        md: 2
                      }
                    }}
                  >
                    <Stack spacing={3}>
                      <InvoiceDetails invoice={invoiceStore.state.data!} />
                      <InvoicePayment invoice={invoiceStore.state.data!} />
                      <InvoiceLineItems invoice={invoiceStore.state.data!} />
                    </Stack>
                  </Grid>
                  <Grid
                    xs={12}
                    lg={4}
                    sx={{
                      order: {
                        xs: 1,
                        md: 2
                      }
                    }}
                  >
                    <Stack spacing={3}>
                      <InvoiceQuickActions invoice={invoiceStore.state.data!} />
                      <InvoicePaymentHistory />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            </Stack>
          )}
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
