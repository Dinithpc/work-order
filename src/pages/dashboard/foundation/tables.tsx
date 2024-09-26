import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { Table1 } from '../../../sections/dashboard/foundation/tables/table-1';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Foundation: Tables | Carpatin
        </title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={6}>
            <div>
              <Typography variant="h4">
                Tables
              </Typography>
            </div>
            <div>
              <WidgetPreviewer
                description={(
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    For complex implementation of tables with Filters and Search features
                    check out
                    {' '}
                    <Link
                      component={NextLink}
                      href={paths.dashboard.customers.index}
                      underline="none"
                      variant="inherit"
                    >
                      Customers
                    </Link>
                    ,
                    {' '}
                    <Link
                      component={NextLink}
                      href={paths.dashboard.orders.index}
                      underline="none"
                      variant="inherit"
                    >
                      Orders
                    </Link>
                    ,
                    {' '}
                    <Link
                      component={NextLink}
                      href={paths.dashboard.products.index}
                      underline="none"
                      variant="inherit"
                    >
                      Products
                    </Link>
                    ,
                    {' '}
                    <Link
                      component={NextLink}
                      href={paths.dashboard.invoices.index}
                      underline="none"
                      variant="inherit"
                    >
                      Invoices
                    </Link>
                    .
                  </Typography>
                )}
                title="Complex tables"
              >
                <Table1 />
              </WidgetPreviewer>
            </div>
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
