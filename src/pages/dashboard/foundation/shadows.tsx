import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Paper, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { usePageView } from '../../../hooks/use-page-view';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Foundation: Shadows | Carpatin
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
                Shadows
              </Typography>
              <Typography>
                Carpatin uses shadows as a way to emphasize no more than one container (e.g card)
                on a crowded page. We only make use of elevation-8, elevation-16 and elevation-24.
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                {[1, 8, 16, 24].map((value) => (
                  <Grid
                    xs={12}
                    md={6}
                    key={value}
                  >
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={3}
                    >
                      <Paper
                        elevation={value}
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          minHeight: 100,
                          minWidth: 120
                        }}
                      >
                        <Typography variant="h1">
                          {value}
                        </Typography>
                      </Paper>
                      <Typography variant="subtitle1">
                        elevation-{value}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
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
