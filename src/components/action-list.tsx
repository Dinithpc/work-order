import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { List } from '@mui/material';

interface ActionListProps {
  children: ReactNode;
}

export const ActionList: FC<ActionListProps> = (props) => {
  const { children } = props;

  return (
    <List
      dense
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.900'
          : 'neutral.50'
      }}
    >
      {children}
    </List>
  );
};

ActionList.propTypes = {
  children: PropTypes.node
};
