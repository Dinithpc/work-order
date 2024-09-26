import type { ChangeEvent, FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import {
  Box,
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { customersApi } from '../../api/customers';
import { ConfirmationDialog } from '../../components/confirmation-dialog';
import { ResourceError } from '../../components/resource-error';
import { ResourceUnavailable } from '../../components/resource-unavailable';
import { useDialog } from '../../hooks/use-dialog';
import { useMounted } from '../../hooks/use-mounted';
import { paths } from '../../paths';
import type { Customer } from '../../types/customer';

interface TabOption {
  label: string;
  path: string;
}

const tabOptions: TabOption[] = [
  {
    label: 'General',
    path: paths.resources.details
  },
  {
    label: 'Scheduling',
    path: ''
  },
  {
    label: 'Field Service',
    path: ''
  },
  {
    label: 'Work Hours',
    path: ''
  },
  {
    label: 'Timeline',
    path: ''
  },

];

interface CustomerStoreState {
  data?: Customer;
  error?: string;
  isLoading?: boolean;
}

interface CustomerStore {
  state: CustomerStoreState;
}

const useCustomerStore = (): CustomerStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<CustomerStoreState>({ isLoading: true });

  const handleCustomerGet = useCallback(
    async () => {
      setState({ isLoading: true });

      try {
        const response = await customersApi.getCustomer();

        if (isMounted()) {
          setState({ data: response });
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          setState({ error: 'Something went wrong' });
        }
      }
    },
    [isMounted]
  );

  useEffect(
    () => {
      handleCustomerGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    state
  };
};

type ResourcesState = 'loading' | 'error' | 'unavailable' | 'available';

const getResourcesState = (storeState: CustomerStoreState): ResourcesState => {
  if (storeState.isLoading) {
    return 'loading';
  }

  if (storeState.error) {
    return 'error';
  }

  return storeState.data ? 'available' : 'unavailable';
};

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const pathname = usePathname();
  const customerStore = useCustomerStore();
  const banDialog = useDialog();

  const handleAccountBan = useCallback(
    (): void => {
      banDialog.handleClose();
      toast.error('This action is not available on demo');
    },
    [banDialog]
  );

  const handleTabsChange = useCallback(
    (event: ChangeEvent<{}>, value: string): void => {
      router.push(value);
    },
    [router]
  );

  const currentTab = tabOptions.find((option) => option.path === pathname);

  const resourcesState = getResourcesState(customerStore.state);

  return (
    <>
    <Box
    sx={{
      bgcolor: '#ffffff',
      py: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      px: 3,
      fontWeight: 500,
      borderRadius : '12px',
      boxShadow: '0px 4px 10px 0px rgba(137, 137, 137, 0.1)' // Added slight shadow with 10% opacity
    }}
  >
    <Box sx={{ display: 'flex', gap: 4 }}>
          <Button
            color="inherit"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            )}
          >
            <Typography sx={{  fontWeight:500 , fontSize: '18px',}}>Back</Typography>
          </Button>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/icon-3.svg" alt="side nav" /> Refresh
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/icon.svg" alt="side nav" /> New
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/resources/save.png" alt="side nav" /> Save
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/resources/saveClose.png" alt="side nav" /> Save & Close
              </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/resources/deactivate.png" alt="side nav" /> Deactivate
              </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img src="/assets/resources/delete.png" alt="side nav" /> Delete
              </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 600,
              fontSize: '20px',
              width: '140px',
            }}
          >
            Share
          </Button>
        </Box>

      <Box
         sx={{
          flexGrow: 1,
          mt: 2,
          pt: 4,
          backgroundColor: '#FFFFFF',
          borderRadius : '12px',
          boxShadow: '0px 4px 10px 0px rgba(137, 137, 137, 0.1)' // Added slight shadow with 10% opacity
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ height: '100%' }}
        >
          {resourcesState === 'loading' && (
            <div>
              <Skeleton height={42} />
              <Skeleton />
              <Skeleton />
            </div>
          )}
          {resourcesState === 'error' && (
            <ResourceError message="Something went wrong" />
          )}
          {resourcesState === 'unavailable' && (
            <ResourceUnavailable message="Resources are not available" />
          )}
          {resourcesState === 'available' && (
            <Stack
              spacing={4}
              sx={{ height: '100%' , mb:4}}
            >
              <Stack spacing={2}>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Stack spacing={1}>
                    <Typography sx={{fontSize:'22px' , fontWeight: 600}}>
                        Jhon Doe
                    </Typography>
                  </Stack>            
                </Stack>
                <div>
                  <Tabs
                    onChange={handleTabsChange}
                    value={currentTab?.path}
                    variant="scrollable"
                  >
                    {tabOptions.map((option) => (
                      <Tab
                        key={option.path}
                        label={option.label}
                        value={option.path}
                        sx={{
                          fontSize: '18px',
                          fontWeight: 500,
                          lineHeight: '27px',
                          textAlign: 'left',
                        }}
                      />
                    ))}
                  </Tabs>
                  <Divider />
                </div>
              </Stack>
              {children}
            </Stack>
          )}
        </Container>
      </Box>
      <ConfirmationDialog
        message="Are you sure you want to ban this account? This can't be undone."
        onCancel={banDialog.handleClose}
        onConfirm={handleAccountBan}
        open={banDialog.open}
        title="Ban Customer"
        variant="error"
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
