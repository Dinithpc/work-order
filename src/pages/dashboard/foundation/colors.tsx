import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';

type Section = {
  title: string;
  description?: string;
  items: {
    label: string;
    description?: string;
    value: string;
  }[];
};

const sections: Section[] = [
  {
    title: 'Neutrals',
    description: 'The neutral colors are useful for dividing pages into sections with different backgrounds and borders, or used as text colors, for example.',
    items: [
      {
        label: 'neutral-50',
        value: 'neutral.50'
      },
      {
        label: 'neutral-100',
        value: 'neutral.100'
      },
      {
        label: 'neutral-200',
        value: 'neutral.200'
      },
      {
        label: 'neutral-300',
        value: 'neutral.300'
      },
      {
        label: 'neutral-400',
        value: 'neutral.400'
      },
      {
        label: 'neutral-500',
        value: 'neutral.500'
      },
      {
        label: 'neutral-600',
        value: 'neutral.600'
      },
      {
        label: 'neutral-700',
        value: 'neutral.700'
      },
      {
        label: 'neutral-800',
        value: 'neutral.800'
      },
      {
        label: 'neutral-900',
        value: 'neutral.900'
      }
    ]
  },
  {
    title: 'Colors',
    items: [
      {
        label: 'primary-main',
        value: 'primary.main'
      },
      {
        label: 'error-main',
        value: 'error.main'
      },
      {
        label: 'warning-main',
        value: 'warning.main'
      },
      {
        label: 'info-main',
        value: 'info.main'
      },
      {
        label: 'success-main',
        value: 'success.main'
      }
    ]
  },
  {
    title: 'Text',
    items: [
      {
        label: 'text-primary',
        value: 'text.primary'
      },
      {
        label: 'text-secondary',
        value: 'text.secondary'
      }
    ]
  }
];

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Foundation: Colors | Carpatin
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
                Neutrals
              </Typography>
            </div>
            <Stack spacing={5}>
              {sections.map((section) => (
                <WidgetPreviewer
                  key={section.title}
                  description={section.description}
                  title={section.title}
                >
                  <Box sx={{ p: 3 }}>
                    <Grid
                      container
                      spacing={2}
                    >
                      {section.items.map((item) => (
                        <Grid
                          key={item.label}
                          xs={12}
                          md={6}
                        >
                          <Box
                            sx={{
                              backgroundColor: item.value,
                              borderRadius: 1,
                              height: 64,
                              mr: 3,
                              width: 64
                            }}
                          />
                          <div>
                            <Typography variant="subtitle1">
                              {item.label}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="body2"
                            >
                              {item.description}
                            </Typography>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </WidgetPreviewer>
              ))}
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
