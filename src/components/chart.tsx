import dynamic from 'next/dynamic';
import type { Props } from 'react-apexcharts';
import { styled } from '@mui/material/styles';

const ApexChart = dynamic<Props>(
  () => import('react-apexcharts'),
  {
    ssr: false,
    loading: () => null
  }
);

export const Chart = styled(ApexChart)({});
