import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { DataState1 } from '../../../sections/dashboard/components/data-states/data-state-1';
import { DataState2 } from '../../../sections/dashboard/components/data-states/data-state-2';
import { DataState3 } from '../../../sections/dashboard/components/data-states/data-state-3';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Components: Data States | Carpatin
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
                Data States
              </Typography>
            </div>
            <Stack spacing={5}>
              <WidgetPreviewer
                description="Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration."
                title="Table loading state"
              >
                <DataState1 />
              </WidgetPreviewer>
              <WidgetPreviewer
                description="Display a feedback placeholder to let users know there is an empty object."
                title="Component empty state"
              >
                <DataState2 />
              </WidgetPreviewer>
              <WidgetPreviewer
                description="Display a feedback placeholder to let users know there’s an server error."
                title="Component error state"
              >
                <DataState3 />
              </WidgetPreviewer>
            </Stack>
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
