import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';
import { Input1 } from '../../../sections/dashboard/foundation/inputs/input-1';
import { Input2 } from '../../../sections/dashboard/foundation/inputs/input-2';
import { Input3 } from '../../../sections/dashboard/foundation/inputs/input-3';
import { Input4 } from '../../../sections/dashboard/foundation/inputs/input-4';
import { Input5 } from '../../../sections/dashboard/foundation/inputs/input-5';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Foundation: Inputs | Carpatin
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
                Inputs
              </Typography>
            </div>
            <Stack spacing={5}>
              <WidgetPreviewer
                description="We use native Input"
                title="Text Field"
              >
                <Input1 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Autocomplete">
                <Input2 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Checkbox">
                <Input3 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Radio">
                <Input4 />
              </WidgetPreviewer>
              <WidgetPreviewer title="Switch">
                <Input5 />
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
