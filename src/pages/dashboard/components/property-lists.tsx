import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { List1 } from '../../../sections/dashboard/components/lists/list-1';
import { List2 } from '../../../sections/dashboard/components/lists/list-2';
import { List3 } from '../../../sections/dashboard/components/lists/list-3';
import { List4 } from '../../../sections/dashboard/components/lists/list-4';
import { List5 } from '../../../sections/dashboard/components/lists/list-5';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Components: Lists | Carpatin
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
                Lists
              </Typography>
            </div>
            <Stack spacing={5}>
              <WidgetPreviewer title="Actionable list">
                <List1 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Icon list with right action">
                <List2 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Expanding list with date">
                <List3 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Property lists with value below the label">
                <List4 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Property lists with value opposing the label">
                <List5 />
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
