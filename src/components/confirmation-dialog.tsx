import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';

type Variant = 'error' | 'warning' | 'info';

const iconMap: Record<Variant, ReactNode> = {
  error: (
    <SvgIcon
      color="error"
      fontSize="large"
    >
      <ExclamationCircleIcon />
    </SvgIcon>
  ),
  warning: (
    <SvgIcon
      color="warning"
      fontSize="large"
    >
      <ExclamationTriangleIcon />
    </SvgIcon>
  ),
  info: (
    <SvgIcon
      color="info"
      fontSize="large"
    >
      <ExclamationCircleIcon />
    </SvgIcon>
  )
};

interface ConfirmationDialogProps {
  message?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  open?: boolean;
  title?: string;
  variant?: Variant;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = (props) => {
  const {
    message = '',
    onCancel,
    onConfirm,
    open = false,
    title,
    variant = 'info',
    ...other
  } = props;

  const icon = iconMap[variant];

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      onClose={onCancel}
      open={open}
      {...other}
    >
      <DialogTitle>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          {icon}
          <Typography variant="inherit">
            {title}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  message: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  variant: PropTypes.oneOf<Variant>(['error', 'warning', 'info'])
};
