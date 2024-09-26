import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Card,
  Container,
  Link,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { usePageView } from '../../../hooks/use-page-view';

interface Item {
  description: string;
  fontSize: string;
  lineHeight: string;
  value: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
}

const items: Item[] = [
  {
    description: 'Heading text',
    fontSize: '48px',
    lineHeight: '1.5',
    value: 'h1'
  },
  {
    description: 'Heading text',
    fontSize: '36px',
    lineHeight: '1.5',
    value: 'h2'
  },
  {
    description: 'Heading text',
    fontSize: '32px',
    lineHeight: '1.5',
    value: 'h3'
  },
  {
    description: 'Page Headings',
    fontSize: '24px',
    lineHeight: '1.5',
    value: 'h4'
  },
  {
    description: 'Section headings',
    fontSize: '18px',
    lineHeight: '1.5',
    value: 'h5'
  },
  {
    description: 'Card Headings',
    fontSize: '16px',
    lineHeight: '1.5',
    value: 'h6'
  },
  {
    description: 'Components and section headings',
    fontSize: '16px',
    lineHeight: '1.5',
    value: 'body1'
  },
  {
    description: 'Heavily used in most components',
    fontSize: '14px',
    lineHeight: '1.6',
    value: 'body2'
  },
  {
    description: 'Components',
    fontSize: '16px',
    lineHeight: '1.75',
    value: 'subtitle1'
  },
  {
    description: 'Labels',
    fontSize: '14px',
    lineHeight: '1.75',
    value: 'subtitle2'
  },
  {
    description: 'Helper text',
    fontSize: '12px',
    lineHeight: '1.6',
    value: 'caption'
  },
  {
    description: 'Subtitles',
    fontSize: '12px',
    lineHeight: '2.46',
    value: 'overline'
  }
];

const Page: NextPage = () => {
  const theme = useTheme();

  usePageView();

  return (
    <>
      <Head>
        <title>
          Foundation: Typography | Carpatin
        </title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Typography
            sx={{ mb: 6 }}
            variant="h4"
          >
            Typography
          </Typography>
          <Stack spacing={5}>
            <WidgetPreviewer
              title={(
                <Typography>
                  Carpatin uses
                  {' '}
                  <Link
                    href="https://fonts.google.com/specimen/Inter"
                    target="_blank"
                    variant="inherit"
                  >
                    Inter
                  </Link>
                  {' '}
                  for text and display instances.
                </Typography>
              )}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Card
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: 100,
                    minWidth: 120
                  }}
                >
                  <Typography variant="h3">
                    Abc
                  </Typography>
                </Card>
                <div>
                  <Typography variant="subtitle1">
                    Main font
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    Components, headings, body and UI text
                  </Typography>
                </div>
              </Stack>
            </WidgetPreviewer>
            <WidgetPreviewer title="Text sizes">
              <Grid
                container
                spacing={3}
              >
                {items.map((item) => (
                  <Grid
                    key={item.value}
                    xs={12}
                    md={6}
                  >
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={3}
                    >
                      <Card
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          minHeight: 100,
                          minWidth: 120
                        }}
                      >
                        <Typography variant={item.value}>
                          Abc
                        </Typography>
                      </Card>
                      <Stack
                        alignItems="center"
                        direction="row"
                        flexWrap="wrap"
                        justifyContent="space-between"
                        spacing={3}
                        sx={{ flexGrow: 1 }}
                      >
                        <div>
                          <Typography
                            sx={{ textTransform: 'capitalize' }}
                            variant="subtitle1"
                          >
                            {item.value}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                            {item.description}
                          </Typography>
                        </div>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                          whiteSpace="nowrap"
                        >
                          {item.fontSize} / {item.lineHeight}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </WidgetPreviewer>
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
