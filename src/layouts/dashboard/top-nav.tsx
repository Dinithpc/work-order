import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { QueryField } from 'src/components/query-field';
import { useAuth } from '../../hooks/use-auth';
import { usePopover } from '../../hooks/use-popover';
import { paths } from '../../paths';
import { Issuer } from '../../utils/auth';
import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Box,
  Stack,
  Typography,
} from '@mui/material';



interface Organization {
  id: string;
  name: string;
}

interface TopNavProps {
  onNavOpen?: () => void;
  openNav?: boolean;
  sideNavWidth: number;

}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onNavOpen, sideNavWidth } = props;

  const router = useRouter();
  const auth = useAuth();
  const popover = usePopover<HTMLButtonElement>();

// const handleLogout = useCallback(
//   async (): Promise<void> => {
//     try {
//       popover.handleClose();

//       switch (auth.issuer) {
//         case Issuer.Amplify: {
//           await auth.signOut();
//           break;
//         }

//         case Issuer.Auth0: {
//           await auth.logout();
//           break;
//         }

//         case Issuer.Firebase: {
//           await auth.signOut();
//           break;
//         }

//         case Issuer.JWT: {
//           await auth.signOut();
//           break;
//         }

//         default: {
//           console.warn('Using an unknown Auth Issuer, did not log out');
//         }
//       }

//       router.push(paths.index);
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong');
//     }
//   },
//   [auth, router, popover]
// );


  return (
      <Box
        component="header"
        sx={{
          backgroundColor: '#F8F8F8',
          color: '#222F3E',
          position: 'fixed',
          width: `calc(100% - ${sideNavWidth}px - 60px)`, 
          left: sideNavWidth,
          zIndex: (theme) => theme.zIndex.appBar,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          pt: 3,
          pb:2
        }}
      >

<Stack direction="row" alignItems="center" spacing={10} >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '26px',
            color: '#222F3E',
          }}
        >
          Services
        </Typography>
      </Stack>

      <Box
        sx={{
          flex: 1, 
          display: 'flex',
          justifyContent: 'center', // Center horizontally
        }}
      >
        <QueryField
          placeholder="Filter By Keyword"
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#B9B9B9',
            fontSize: '18px',
            fontWeight: 400,
            borderRadius: '12px',
            width: '620px',
          }}
        />
      </Box>
      <Stack direction="row" alignItems="center" spacing={2} 
      sx={{
        position: 'absolute',
        right: 0,
        marginRight: 2, 
      }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: '#0090F8',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 20,
            color: 'white',
          }}
        >
          JD
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 20,
              lineHeight: '24px',
            }}
          >
            John Doe
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '16px',
            }}
          >
            Area Manager
          </Typography>
        </Box>
      </Stack>
      {/* <List>
        <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List> */}
      </Box>
  );
};


TopNav.propTypes = {
  onNavOpen: PropTypes.func,
  openNav: PropTypes.bool,
  sideNavWidth: PropTypes.number.isRequired,

};
