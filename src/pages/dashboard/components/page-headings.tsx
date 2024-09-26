import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { PageHeading1 } from '../../../sections/dashboard/components/page-headings/page-heading-1';
import { PageHeading2 } from '../../../sections/dashboard/components/page-headings/page-heading-2';
import { PageHeading3 } from '../../../sections/dashboard/components/page-headings/page-heading-3';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Components: Page Headings | Carpatin
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
                Page Headings
              </Typography>
            </div>
            <Stack spacing={5}>
              <WidgetPreviewer title="Simple page header with action button">
                <PageHeading1 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Page header with back button, stats and actions">
                <PageHeading2 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Page header with back button, breadcrumbs and actions">
                <PageHeading3 />
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
