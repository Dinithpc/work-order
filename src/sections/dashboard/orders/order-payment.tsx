import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardHeader, Divider, Stack } from '@mui/material';
import { PropertyList } from '../../../components/property-list';
import { PropertyListItem } from '../../../components/property-list-item';
import type { Order, OrderPaymentMethod, OrderPaymentStatus } from '../../../types/order';

const paymentStatusMap: Record<OrderPaymentStatus, string> = {
  paid: 'Paid',
  pending: 'Pending'
};

const paymentMethodMap: Record<OrderPaymentMethod, string> = {
  creditCard: 'Credit Card',
  debit: 'Direct Debit',
  paypal: 'Paypal',
  stripe: 'Stripe'
};

interface OrderPaymentProps {
  onEdit?: () => void;
  order: Order;
}

export const OrderPayment: FC<OrderPaymentProps> = (props) => {
  const { onEdit, order, ...other } = props;

  const paymentStatus = order.paymentStatus ? paymentStatusMap[order.paymentStatus] : 'Not Paid';
  const paymentMethod = order.paymentMethod ? paymentMethodMap[order.paymentMethod] : '';

  return (
    <Card {...other}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
        title="Payment &amp; Courier Details"
      />
      <Divider />
      <Stack
        direction={{
          xs: 'column',
          md: 'row'
        }}
        sx={{
          '& > *': {
            width: {
              md: '50%'
            }
          }
        }}
      >
        <PropertyList>
          <PropertyListItem
            label="Stripe Payment ID"
            value={order.paymentId}
          />
          <PropertyListItem
            label="Payment Status"
            value={paymentStatus}
          />
          <PropertyListItem
            label="Payment Method"
            value={paymentMethod}
          />
        </PropertyList>
        <PropertyList>
          <PropertyListItem
            label="Courier"
            value={order.courier}
          />
          <PropertyListItem
            label="Tracking ID"
            value={order.trackingCode}
          />
        </PropertyList>
      </Stack>
    </Card>
  );
};

OrderPayment.propTypes = {
  onEdit: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object.isRequired
};
