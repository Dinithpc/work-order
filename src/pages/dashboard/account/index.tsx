import type { NextPage } from 'next';
import Head from 'next/head';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as AccountLayout } from '../../../layouts/account';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { Account2FA } from '../../../sections/dashboard/account/account-2fa';
import { AccountPassword } from '../../../sections/dashboard/account/account-password';
import { AccountDetails } from '../../../sections/dashboard/account/account-details';
import { Stack } from '@mui/material';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Account: General | Carpatin
        </title>
      </Head>
      <Stack spacing={3}>
        <AccountDetails />
        <AccountPassword />
        <Account2FA />
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
