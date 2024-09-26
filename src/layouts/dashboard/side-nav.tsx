import type { FC } from 'react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import { Box, Divider, Drawer, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import type { Item } from './config';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { ActionsMenu } from '../../components/actions-menu';
import { paths } from '../../paths';

const SIDE_NAV_WIDTH: number = 307;
const SIDE_NAV_COLLAPSED_WIDTH: number = 106; // icon size + padding + border right

const renderItems = ({
  collapse = false,
  depth = 0,
  items,
  pathname
}: {
  collapse: boolean;
  depth?: number;
  items: Item[];
  pathname?: string | null;
}): JSX.Element[] => items.reduce(
  (acc: JSX.Element[], item) => reduceChildRoutes({
    acc,
    collapse,
    depth,
    item,
    pathname
  }),
  []
);

const reduceChildRoutes = ({
  acc,
  collapse,
  depth,
  item,
  pathname
}: {
  acc: JSX.Element[];
  collapse: boolean;
  depth: number;
  item: Item;
  pathname?: string | null;
}): Array<JSX.Element> => {
  const checkPath = !!(item.path && pathname);
  const partialMatch = checkPath ? pathname.includes(item.path!) : false;
  const exactMatch = checkPath ? pathname === item.path : false;

  if (item.items) {
    acc.push(
      <SideNavItem
        active={partialMatch}
        collapse={collapse}
        depth={depth}
        external={item.external}
        icon={item.icon}
        key={item.title}
        openImmediately={partialMatch}
        path={item.path}
        title={item.title}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0
          }}
        >
          {renderItems({
            collapse,
            depth: depth + 1,
            items: item.items,
            pathname
          })}
        </Stack>
      </SideNavItem>
    );
  } else {
    acc.push(
      <SideNavItem
        active={exactMatch}
        collapse={collapse}
        depth={depth}
        external={item.external}
        icon={item.icon}
        key={item.title}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

interface SideNavProps {
  onPin?: () => void;
  pinned?: boolean;
}

export const SideNav: FC<SideNavProps> = (props) => {
  const { onPin, pinned = false } = props;
  const pathname = usePathname();
  const [hovered, setHovered] = useState<boolean>(false);
  const router = useRouter();

  const collapse = !(pinned || hovered);

  return (
    <Drawer
      open
      variant="permanent"
      PaperProps={{
        onMouseEnter: () => { setHovered(true); },
        onMouseLeave: () => { setHovered(false); },
        sx: {
          backgroundColor: 'background.default',
          height: `calc(100%)`,
          overflowX: 'hidden',
          transition: 'width 250ms ease-in-out',
          width: collapse ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH,
          zIndex: (theme) => theme.zIndex.appBar - 100
        }
      }}
    >
      
      <Scrollbar
        sx={{
          height: '100%',
          overflowX: 'hidden',
          '& .simplebar-content': {
            height: '100%'
          },
          px:1,
          backgroundColor: '#ffffff'
        }}
      >
        
        <Box
          component="nav"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2  , mb:8}}>
            {collapse ? (
              
              <img src="/assets/blue-logo.svg" alt="side nav" width={SIDE_NAV_COLLAPSED_WIDTH - 50} />
            ) : (
              
              <img src="/assets/logo-nav.svg" alt="side nav" />
            )}
          </Box>
          
          {collapse ? (
              
              <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#0090F8',
                color: '#ffffff',
                borderRadius: '10px',
                p:1,
                fontSize:'20px',
                fontWeight:600,
              }}
            >
              <Typography>S</Typography>
              <SvgIcon fontSize="small">
                <ChevronDownIcon />
              </SvgIcon>
            </Box>
            ) : (
              
              <ActionsMenu
                    actions={[
                      {
                        label: 'Resources',
                        handler: () => {
                          router.push(paths.resources.index);
                        },
                      },
                      {
                        label: 'Settings',
                        handler: () => {
                          router.push(paths.settings.index);
                        },
                      },
                    ]}
                  />
            )}
          
          <Box
            component="ul"
            sx={{
              flexGrow: 1,
              listStyle: 'none',
              mt: 2,
              p: 0
            }}
          >
            {renderItems({
              collapse,
              depth: 0,
              items,
              pathname
            })}
          </Box>

          <Divider />
          <Box
            sx={{
              pt: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >            <IconButton onClick={onPin}>
              <SvgIcon fontSize="small">
                {pinned ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </SvgIcon>
            </IconButton>
          </Box>
        </Box>
      </Scrollbar>
    </Drawer>
  );
};

SideNav.propTypes = {
  onPin: PropTypes.func,
  pinned: PropTypes.bool
};
