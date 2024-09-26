import type { FC } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';
import type { Order } from '../../../types/order';

interface PaymentStatusOption {
  label: string;
  value: string;
}

const paymentStatusOptions: PaymentStatusOption[] = [
  {
    label: 'Paid',
    value: 'paid'
  },
  {
    label: 'Not paid',
    value: 'not-paid'
  }
];

interface PaymentMethodOption {
  label: string;
  value: string;
}

const paymentMethodOptions: PaymentMethodOption[] = [
  {
    label: 'Direct debit',
    value: 'debit'
  },
  {
    label: 'Paypal',
    value: 'paypal'
  }
];

const courierOptions: string[] = ['DHL', 'UPS', 'FedEx', 'Purolator'];

interface Values {
  paymentStatus: string;
  courier: string;
  paymentMethod: string;
  submit: null;
  trackingCode: string;
}

const getInitialValues = (order?: Order): Values => {
  return {
    paymentStatus: order?.paymentStatus || '',
    courier: order?.courier || '',
    paymentMethod: order?.paymentMethod || '',
    submit: null,
    trackingCode: order?.trackingCode || ''
  };
};

const validationSchema = Yup.object({
  paymentStatus: Yup
    .string()
    .max(255)
    .required('Payment status is required'),
  courier: Yup
    .string()
    .max(255)
    .required('Courier is required'),
  paymentMethod: Yup
    .string()
    .max(255)
    .required('Payment method is required'),
  trackingCode: Yup
    .string()
    .max(255)
    .required('Tracking is required')
});

interface OrderPaymentDialogProps {
  onClose?: () => void;
  open?: boolean;
  order?: Order;
}

export const OrderPaymentDialog: FC<OrderPaymentDialogProps> = (props) => {
  const { open = false, onClose, order } = props;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(order),
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Order updated');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        onClose?.();
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      TransitionProps={{
        onExited: () => formik.resetForm()
      }}
    >
      <DialogTitle>
        Edit order
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <TextField
            disabled
            fullWidth
            label="Stripe Payment ID"
            name="paymentId"
            value={order?.paymentId}
          />
          <TextField
            error={!!(formik.touched.paymentStatus && formik.errors.paymentStatus)}
            fullWidth
            helperText={formik.touched.paymentStatus && formik.errors.paymentStatus}
            label="Payment status"
            name="paymentStatus"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            select
            value={formik.values.paymentStatus}
          >
            {paymentStatusOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={!!(formik.touched.paymentMethod && formik.errors.paymentMethod)}
            fullWidth
            helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
            label="Payment method"
            name="paymentMethod"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            select
            value={formik.values.paymentMethod}
          >
            {paymentMethodOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={!!(formik.touched.courier && formik.errors.courier)}
            fullWidth
            helperText={formik.touched.courier && formik.errors.courier}
            label="Courier"
            name="courier"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            select
            value={formik.values.courier}
          >
            {courierOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={!!(formik.touched.trackingCode && formik.errors.trackingCode)}
            fullWidth
            helperText={formik.touched.trackingCode && formik.errors.trackingCode}
            label="Tracking"
            name="trackingCode"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.trackingCode}
          />
        </Stack>
        {formik.errors.submit && (
          <FormHelperText
            error
            sx={{ mt: 2 }}
          >
            {formik.errors.submit}
          </FormHelperText>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={() => { formik.handleSubmit(); }}
          variant="contained"
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OrderPaymentDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  order: PropTypes.object
};
