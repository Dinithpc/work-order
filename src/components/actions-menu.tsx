import type { FC } from 'react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import PropTypes from 'prop-types';
import type { ButtonProps } from '@mui/material';
import { Box, Button, Menu, MenuItem, SvgIcon } from '@mui/material';
import { usePopover } from '../hooks/use-popover';
import { paths } from '../paths';

interface Action {
  handler?: () => void;
  label: string;
}

interface ActionsMenuProps extends ButtonProps {
  actions?: Action[];
  label?: string;
  currentPath?: string | null;
}

export const ActionsMenu: FC<ActionsMenuProps> = (props) => {
  const { actions = [], label: initialLabel = 'Services', currentPath, ...other } = props;
  const popover = usePopover<HTMLButtonElement>();

  const determineLabel = (path: string) => {
    if (path.startsWith(paths.resources.index)) {
      return 'Resources';
    } else if (path.startsWith(paths.settings.index)) {
      return 'Settings';
    }
    return 'Services';
  };

  const label = determineLabel(currentPath || initialLabel);
  return (
    <>
      <Button
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        size="large"
        variant="contained"
        sx={{
          backgroundColor: '#0090F8',
          color: '#ffffff',
          fontSize:'20px',
          fontWeight: 600,
          justifyContent: 'space-between',
          '&:hover': {
            backgroundColor: '#007acc',
          },
        }}
        endIcon={null}
        {...other}
      >
        <Box sx={{ flexGrow: 1, textAlign: 'left' }}>{label}</Box>
        <SvgIcon fontSize="small">
          <ChevronDownIcon />
        </SvgIcon>
      </Button>
      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        open={popover.open}
        onClose={popover.handleClose}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
      >
        {actions.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              popover.handleClose();
              item.handler?.();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

ActionsMenu.propTypes = {
  actions: PropTypes.array,
  label: PropTypes.string
};
