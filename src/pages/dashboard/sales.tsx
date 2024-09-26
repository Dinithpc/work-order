import type { NextPage } from 'next';
import Head from 'next/head';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import NoSymbolIcon from '@heroicons/react/24/outline/NoSymbolIcon';
import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { Card, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { usePageView } from '../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { Layout as ReportsLayout } from '../../layouts/reports';
import { SalesKpi } from '../../sections/dashboard/sales/sales-kpi';
import { SalesBreakdown } from '../../sections/dashboard/sales/sales-breakdown';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Reports: Sales | Carpatin
        </title>
      </Head>
      <div>
        <Grid
          container
          spacing={3}
        >
          <Grid xs={12}>
            <SalesKpi
              chartSeries={[
                {
                  data: [0, 20, 40, 30, 30, 44, 90],
                  name: 'Revenue'
                }
              ]}
              stats={[
                {
                  label: 'Revenue',
                  value: '$4,800.00'
                },
                {
                  label: 'NET',
                  value: '$4,900,24'
                },
                {
                  label: 'Pending orders',
                  value: '$1,600.50'
                },
                {
                  label: 'Due',
                  value: '$6,900.10'
                },
                {
                  label: 'Overdue',
                  value: '$6,500.80'
                }
              ]}
            />
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Stack spacing={3}>
              {[
                {
                  icon: (
                    <SvgIcon
                      color="error"
                      fontSize="small"
                    >
                      <NoSymbolIcon />
                    </SvgIcon>
                  ),
                  label: 'Unsold Products',
                  value: '$3,421.00'
                },
                {
                  icon: (
                    <SvgIcon
                      color="success"
                      fontSize="small"
                    >
                      <CurrencyDollarIcon />
                    </SvgIcon>
                  ),
                  label: 'Market Price Value',
                  value: '$36,650.10'
                },
                {
                  icon: (
                    <SvgIcon
                      color="warning"
                      fontSize="small"
                    >
                      <ShoppingBagIcon />
                    </SvgIcon>
                  ),
                  label: 'Retail Value',
                  value: '$49,455.50'
                },
                {
                  icon: (
                    <SvgIcon
                      color="info"
                      fontSize="small"
                    >
                      <XMarkIcon />
                    </SvgIcon>
                  ),
                  label: 'Unrealized Profit',
                  value: '$33,500.00'
                }
              ].map((item) => (
                <Card key={item.label}>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                    sx={{ p: 2 }}
                  >
                    {item.icon}
                    <div>
                      <Typography
                        color="text.secondary"
                        variant="overline"
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="h6">
                        {item.value}
                      </Typography>
                    </div>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={8}
          >
            <SalesBreakdown
              categories={['Analog', 'Automatic', 'Chronograph', 'Diving', 'Smart']}
              chartSeries={[{ data: [65, 55, 10, 5, 3] }]}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <ReportsLayout>
      {page}
    </ReportsLayout>
  </DashboardLayout>
);

export default Page;
