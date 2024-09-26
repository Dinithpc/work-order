import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { Wizard } from '../../../sections/dashboard/components/onboarding/wizard';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Components: Onboarding | Carpatin
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={6}>
            <div>
              <Typography variant="h4">
                Onboarding
              </Typography>
            </div>
            <Stack spacing={5}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">
                  Horizontal Stepper
                </Typography>
                <Wizard orientation="horizontal" />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle1">
                  Vertical Stepper
                </Typography>
                <Wizard orientation="vertical" />
              </Stack>
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
