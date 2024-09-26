import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { CardHeading1 } from '../../../sections/dashboard/components/card-headings/card-heading-1';
import { CardHeading2 } from '../../../sections/dashboard/components/card-headings/card-heading-2';
import { CardHeading3 } from '../../../sections/dashboard/components/card-headings/card-heading-3';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Components: Card Headings | Carpatin
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
                Card Headings
              </Typography>
            </div>
            <Stack spacing={5}>
              <WidgetPreviewer title="Simple card header">
                <CardHeading1 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Simple card header with description">
                <CardHeading2 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Card header with actions">
                <CardHeading3 />
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
