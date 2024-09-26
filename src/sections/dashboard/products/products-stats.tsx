import type { FC, ReactNode } from 'react';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import { Card, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material';

interface StatsItem {
  data: string;
  icon: ReactNode;
  name: string;
}

const stats: StatsItem[] = [
  {
    icon: (
      <SvgIcon
        color="success"
        fontSize="small"
      >
        <CheckCircleIcon />
      </SvgIcon>
    ),
    data: '5,000',
    name: 'Total Stock'
  },
  {
    icon: (
      <SvgIcon
        color="warning"
        fontSize="small"
      >
        <XCircleIcon />
      </SvgIcon>
    ),
    data: '15',
    name: 'OUT OF STOCK ITEMS'
  },
  {
    icon: (
      <SvgIcon
        color="primary"
        fontSize="small"
      >
        <CurrencyDollarIcon />
      </SvgIcon>
    ),
    data: '$25,200.00',
    name: 'Retail Value'
  },
  {
    icon: (
      <SvgIcon
        color="error"
        fontSize="small"
      >
        <ShoppingCartIcon />
      </SvgIcon>
    ),
    data: '$8,250.00',
    name: 'Unrealized Profit'
  }
];

export const ProductsStats: FC = () => (
  <Card>
    <Grid container>
      {stats.map((item) => (
        <Grid
          xs={12}
          sm={6}
          md={3}
          key={item.name}
          sx={{
            borderBottom: (theme) => ({
              xs: `1px solid ${theme.palette.divider}`,
              md: 'none'
            }),
            borderRight: (theme) => ({
              md: `1px solid ${theme.palette.divider}`
            }),
            '&:nth-of-type(3)': {
              borderBottom: (theme) => ({
                xs: `1px solid ${theme.palette.divider}`,
                sm: 'none'
              })
            },
            '&:nth-of-type(4)': {
              borderBottom: 'none'
            }
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 2 }}
          >
            {item.icon}
            <div>
              <Typography
                color="text.secondary"
                variant="overline"
              >
                {item.name}
              </Typography>
              <Typography variant="h6">
                {item.data}
              </Typography>
            </div>
          </Stack>
        </Grid>
      ))}
    </Grid>
  </Card>
);
