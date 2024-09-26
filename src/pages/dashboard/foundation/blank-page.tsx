import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Foundation: Blank Page | Carpatin
        </title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ height: '100%' }}
        >
          <Stack
            spacing={4}
            sx={{ height: '100%' }}
          >
            <Stack spacing={2}>
              <div>
                <Button
                  color="inherit"
                  component={NextLink}
                  href="#"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowLeftIcon />
                    </SvgIcon>
                  )}
                >
                  Back
                </Button>
              </div>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <div>
                  <Typography variant="h4">
                    Blank Page
                  </Typography>
                </div>
                <Button
                  endIcon={(
                    <SvgIcon fontSize="small">
                      <ChevronDownIcon />
                    </SvgIcon>
                  )}
                  size="large"
                  variant="contained"
                >
                  Actions
                </Button>
              </Stack>
            </Stack>
            <div>
              <Tabs
                value={0}
                variant="scrollable"
              >
                <Tab label="Tab 1" />
                <Tab label="Tab 2" />
                <Tab label="Tab 3" />
              </Tabs>
              <Divider />
            </div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={3}
                sx={{ height: '100%' }}
              >
                <Grid
                  xs={12}
                  md={8}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography>
                        Main content
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography>
                        Secondary content
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
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
