import type { NextPage } from 'next';
import Head from 'next/head';
import { Card, CardContent, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { Layout as ProductLayout } from '../../../../layouts/product';
import { ProductInsightsChannel } from '../../../../sections/dashboard/products/product-insights-channel';
import { ProductInsightsRate } from '../../../../sections/dashboard/products/product-insights-rate';
import { ProductInsightsReviews } from '../../../../sections/dashboard/products/product-Insights-reviews';
import { ProductInsightsSales } from '../../../../sections/dashboard/products/product-Insights-sales';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Product: Analytics | Carpatin
        </title>
      </Head>
      <div>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={4}
          >
            <Stack spacing={3}>
              <div>
                <Typography variant="h6">
                  All time
                </Typography>
              </div>
              <Card>
                <CardContent>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    Monthly Recurring Revenue
                  </Typography>
                  <Typography variant="h4">
                    $3,200.00
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    Order count for this product
                  </Typography>
                  <Typography variant="h4">
                    356
                  </Typography>
                </CardContent>
              </Card>
              <ProductInsightsReviews />
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={8}
          >
            <Stack spacing={3}>
              <div>
                <Typography variant="h6">
                  Last 30 days
                </Typography>
              </div>
              <ProductInsightsSales
                chartSeries={[
                  {
                    data: [0, 20, 40, 30, 30, 44, 90],
                    name: 'Revenue'
                  }
                ]}
              />
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  '& > *': {
                    width: {
                      md: '50%'
                    }
                  }
                }}
              >
                <ProductInsightsChannel
                  chartSeries={[12, 10, 5]}
                  labels={['Physical store', 'Online store', 'Phone']}
                />
                <ProductInsightsRate
                  chartSeries={[121, 21, 10]}
                  labels={['Complete', 'Refunded', 'Cancelled']}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <ProductLayout>
      {page}
    </ProductLayout>
  </DashboardLayout>
);

export default Page;
