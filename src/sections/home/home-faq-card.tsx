import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';

interface HomeFaqCardProps {
  children: ReactNode;
  question: string;
}

export const HomeFaqCard: FC<HomeFaqCardProps> = (props) => {
  const { question, children } = props;

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.900'
          : 'neutral.50'
      }}
    >
      <Stack
        spacing={2}
        sx={{ p: 3 }}
      >
        <Typography
          align="left"
          variant="h6"
        >
          {question}
        </Typography>
        <Typography
          align="left"
          color="text.secondary"
          variant="body2"
        >
          {children}
        </Typography>
      </Stack>
    </Box>
  );
};

HomeFaqCard.propTypes = {
  children: PropTypes.node,
  question: PropTypes.string.isRequired
};
