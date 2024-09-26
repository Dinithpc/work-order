import type { FC } from 'react';
import { Box } from '@mui/material';
import { ResourceError } from '../../../../components/resource-error';

export const DataState3: FC = () => (
  <Box sx={{ p: 3 }}>
    <ResourceError
      message="Error loading data, please try again."
      onReload={() => {}}
    />
  </Box>
);
