import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { ImagesUploader } from '../../../sections/dashboard/components/images-uploader';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Components: Image Uploader| Carpatin
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
                Image Uploader
              </Typography>
            </div>
            <Stack spacing={2}>
              <Typography>
                Multiple image selector. Click the Browse button below.
              </Typography>
              <ImagesUploader />
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
