import type { FC } from 'react';
import { Card, CardHeader } from '@mui/material';

export const CardHeading2: FC = () => (
  <Card>
    <CardHeader
      subheader="List of the latest orders"
      title="Orders"
    />
  </Card>
);
