import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Card, CardHeader, Divider, Stack } from '@mui/material';
import { PropertyList } from '../../../components/property-list';
import { PropertyListItem } from '../../../components/property-list-item';
import type { Invoice } from '../../../types/invoice';

interface InvoiceDetailsProps {
  invoice: Invoice;
}

export const InvoiceDetails: FC<InvoiceDetailsProps> = (props) => {
  const { invoice } = props;
  const issueDate = format(invoice.issueDate, 'dd MMM yyyy');
  const dueDate = format(invoice.dueDate, 'dd MMM yyyy');

  return (
    <Card>
      <CardHeader title="Invoice Details" />
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
            label="Invoice Ref"
            value={invoice.ref}
          />
          <PropertyListItem
            label="Issue Date"
            value={issueDate}
          />
          <PropertyListItem
            label="Notes"
            value={`“${invoice.note}”`}
          />
        </PropertyList>
        <PropertyList>
          <PropertyListItem
            label="Customer Name"
            value={invoice.customer?.name}
          />
          <PropertyListItem
            label="Due Date"
            value={dueDate}
          />
        </PropertyList>
      </Stack>
    </Card>
  );
};

InvoiceDetails.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};
