import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ArrowDownOnSquareIcon from '@heroicons/react/24/outline/ArrowDownOnSquareIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';
import InboxIcon from '@heroicons/react/24/outline/InboxIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  SvgIcon,
  TextField
} from '@mui/material';
import { ActionList } from '../../../components/action-list';
import { ActionListItem } from '../../../components/action-list-item';
import { ConfirmationDialog } from '../../../components/confirmation-dialog';
import { useDialog } from '../../../hooks/use-dialog';
import { paths } from '../../../paths';
import type { Invoice } from '../../../types/invoice';
import { InvoicePdfDocument } from './invoice-pdf-document';

interface NotificationOption {
  label: string;
  value: string;
}

const notificationOptions: NotificationOption[] = [
  {
    label: 'Invoice created',
    value: 'invoiceCreated'
  },
  {
    label: 'Payment received',
    value: 'paymentConfirmation'
  }
];

interface InvoiceQuickActionsProps {
  invoice: Invoice;
}

export const InvoiceQuickActions: FC<InvoiceQuickActionsProps> = (props) => {
  const { invoice } = props;
  const router = useRouter();
  const markDialog = useDialog();
  const duplicateDialog = useDialog();
  const archiveDialog = useDialog();
  const [notification, setNotification] = useState<string>(notificationOptions[0].value);

  const handleStatusChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setNotification(event.target.value);
    },
    []
  );

  const handleSendNotification = useCallback(
    (): void => {
      toast.success('Notification sent');
    },
    []
  );

  const handleMark = useCallback(
    (): void => {
      markDialog.handleClose();
      toast.error('This action is not available on demo');
    },
    [markDialog]
  );

  const handleDuplicate = useCallback(
    (): void => {
      duplicateDialog.handleClose();
      toast.error('This action is not available on demo');
    },
    [duplicateDialog]
  );

  const handleDelete = useCallback(
    (): void => {
      archiveDialog.handleClose();
      toast.error('This action is not available on demo');
    },
    [archiveDialog]
  );

  const handlePreview = useCallback(
    (): void => {
      router.push(paths.dashboard.invoices.details.preview);
    },
    [router]
  );

  return (
    <>
      <Card>
        <CardHeader title="Quick Actions" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            onChange={handleStatusChange}
            select
            value={notification}
          >
            {notificationOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={handleSendNotification}
            startIcon={(
              <SvgIcon fontSize="small">
                <InboxIcon />
              </SvgIcon>
            )}
            sx={{ mt: 2 }}
            variant="outlined"
          >
            Send Email
          </Button>
        </CardContent>
        <Divider />
        <ActionList>
          <ActionListItem
            icon={(
              <SvgIcon fontSize="small">
                <EyeIcon />
              </SvgIcon>
            )}
            label="Preview"
            onClick={handlePreview}
          />
          <ActionListItem
            icon={(
              <SvgIcon fontSize="small">
                <CurrencyDollarIcon />
              </SvgIcon>
            )}
            label="Mark Paid"
            onClick={markDialog.handleOpen}
          />
          <ActionListItem
            icon={(
              <SvgIcon fontSize="small">
                <DocumentDuplicateIcon />
              </SvgIcon>
            )}
            label="Duplicate"
            onClick={duplicateDialog.handleOpen}
          />
          <PDFDownloadLink
            document={<InvoicePdfDocument invoice={invoice} />}
            fileName="invoice"
            style={{
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <ActionListItem
              icon={(
                <SvgIcon fontSize="small">
                  <ArrowDownOnSquareIcon />
                </SvgIcon>
              )}
              label="Download (PDF)"
            />
          </PDFDownloadLink>
          <ActionListItem
            icon={(
              <SvgIcon fontSize="small">
                <TrashIcon />
              </SvgIcon>
            )}
            label="Delete"
            onClick={archiveDialog.handleOpen}
          />
        </ActionList>
      </Card>
      <ConfirmationDialog
        message="Are you sure you want to mark this invoice as paid? This can't be undone."
        onCancel={markDialog.handleClose}
        onConfirm={handleMark}
        open={markDialog.open}
        title="Mark Invoice as paid"
        variant="info"
      />
      <ConfirmationDialog
        message="Are you sure you want to duplicate this invoice? This can't be undone."
        onCancel={duplicateDialog.handleClose}
        onConfirm={handleDuplicate}
        open={duplicateDialog.open}
        title="Duplicate Invoice"
        variant="warning"
      />
      <ConfirmationDialog
        message="Are you sure you want to delete this invoice? This can't be undone."
        onCancel={archiveDialog.handleClose}
        onConfirm={handleDelete}
        open={archiveDialog.open}
        title="Delete Invoice"
        variant="error"
      />
    </>
  );
};

InvoiceQuickActions.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};
