import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Card,
  CardHeader,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as AccountLayout } from '../../../layouts/account';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';

interface Notification {
  checked: boolean;
  label: string;
  name: string;
}

const notifications: Notification[] = [
  {
    label: 'Product Update',
    name: 'productUpdate',
    checked: true
  },
  {
    label: 'Weekly News',
    name: 'weeklyNews',
    checked: true
  },
  {
    label: 'Webhooks Alerts',
    name: 'webhooksAlerts',
    checked: false
  }
];

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Account: Notifications | Carpatin
        </title>
      </Head>
      <Stack spacing={3}>
        <Card>
          <CardHeader
            subheader="Manage your alert notifications"
            title="Email Notifications"
          />
          <Divider />
          <List>
            {notifications.map((notification, index) => {
              const hasDivider = notifications.length > index + 1;

              return (
                <ListItem
                  divider={hasDivider}
                  key={notification.name}
                >
                  <ListItemText primary={notification.label} />
                  <ListItemSecondaryAction>
                    <Switch
                      defaultChecked={notification.checked}
                      name={notification.name}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </Stack>
      <Stack
        alignItems={{
          xs: 'flex-start',
          sm: 'center'
        }}
        direction={{
          xs: 'column',
          sm: 'row'
        }}
        justifyContent="space-between"
        spacing={3}
      >
        <Stack spacing={1}>
          <Typography variant="h6">
            Unsubscribe Notifications
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Keep in mind that security notifications cannot be turned off
          </Typography>
        </Stack>
        <FormControlLabel
          control={(
            <Switch
              defaultChecked
              name="unsubscribeAll"
            />
          )}
          label="Unsubscribe"
        />
      </Stack>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <AccountLayout>
      {page}
    </AccountLayout>
  </DashboardLayout>
);

export default Page;
