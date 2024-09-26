import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { Layout as OrganizationLayout } from '../../../layouts/organization';
import { OrganizationInviteDialog } from '../../../sections/dashboard/organization/organization-invite-dialog';

interface Role {
  label: string;
  value: string;
}

const roles: Role[] = [
  {
    label: 'Administrator',
    value: 'administrator'
  },
  {
    label: 'Editor',
    value: 'editor'
  }
];

interface Member {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
}

const members: Member[] = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-chen-simmons.jpg',
    name: 'Chen Simmons',
    email: 'chen.simmons@devias.io',
    role: 'administrator'
  },
  {
    id: '924d48e800babe1a0d174478',
    avatar: '/assets/avatars/avatar-horia-tepar.jpg',
    name: 'Horia Tepar',
    email: 'horia.tepar@devias.io',
    role: 'editor'
  }
];

const Page: NextPage = () => {
  const [openInvite, setOpenInvite] = useState<boolean>(false);

  usePageView();

  return (
    <>
      <Head>
        <title>
          Organization: Team | Carpatin
        </title>
      </Head>
      <Card>
        <CardHeader
          action={(
            <Button
              color="inherit"
              onClick={() => setOpenInvite(true)}
              size="small"
              startIcon={(
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              )}
            >
              Invite
            </Button>
          )}
          title="Members"
        />
        <Divider />
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => {
                const role = roles.find((option) => option.value === member.role);

                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                      >
                        <Avatar src={member.avatar} />
                        <Typography variant="subtitle2">
                          {member.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {member.email}
                    </TableCell>
                    <TableCell>
                      {role?.label}
                    </TableCell>
                    <TableCell sx={{ width: 145 }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          color="primary"
                          sx={{ cursor: 'pointer' }}
                          variant="subtitle2"
                        >
                          Edit
                        </Typography>
                        {member.role !== 'administrator' && (
                          <>
                            <Divider
                              flexItem
                              orientation="vertical"
                              sx={{ mx: 2 }}
                            />
                            <Typography
                              color="primary"
                              sx={{ cursor: 'pointer' }}
                              variant="subtitle2"
                            >
                              Remove
                            </Typography>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
      <OrganizationInviteDialog
        onClose={() => setOpenInvite(false)}
        open={openInvite}
      />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <OrganizationLayout>
      {page}
    </OrganizationLayout>
  </DashboardLayout>
);

export default Page;
