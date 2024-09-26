import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { Stats1 } from '../../../sections/dashboard/components/stats/stats-1';
import { Stats2 } from '../../../sections/dashboard/components/stats/stats-2';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Components: Data Stats | Carpatin
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
                Data Stats
              </Typography>
            </div>
            <Stack spacing={5}>
              <WidgetPreviewer title="Simple stats with icon and links">
                <Stats1 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Simple stats">
                <Stats2 />
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
