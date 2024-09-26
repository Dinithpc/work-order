import { FC, useCallback, useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import type { Theme } from '@mui/material';
import { Box, Button, Container, IconButton, Stack, SvgIcon, useMediaQuery } from '@mui/material';
import { Logo } from '../../components/logo';
import { useSettings } from '../../hooks/use-settings';
import { useWindowScroll } from '../../hooks/use-window-scroll';
import { paths } from '../../paths';
import { PagesPopover } from './pages-popover';
import { TopNavItem } from './top-nav-item';

const TOP_NAV_HEIGHT: number = 64;

interface TopNavProps {
  onNavOpen?: () => void;
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onNavOpen } = props;
  const settings = useSettings();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [elevate, setElevate] = useState<boolean>(false);
  const offset = 64;
  const delay = 100;

  const handleWindowScroll = useCallback(
    (): void => {
      if (window.scrollY > offset) {
        setElevate(true);
      } else {
        setElevate(false);
      }
    },
    []
  );

  useWindowScroll({
    handler: handleWindowScroll,
    delay
  });

  const handleThemeSwitch = useCallback(
    (): void => {
      settings.handleUpdate({
        paletteMode: settings.paletteMode === 'light' ? 'dark' : 'light'
      });
    },
    [settings]
  );

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'background.paper',
        left: 0,
        position: 'sticky',
        right: 0,
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        ...(elevate && {
          boxShadow: 8
        })
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: TOP_NAV_HEIGHT,
          position: 'relative'
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr'
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              height: '100%'
            }}
          >
            <Box
              component={NextLink}
              href={paths.index}
              sx={{
                display: 'inline-flex',
                flexShrink: 0,
                height: 24,
                width: 24
              }}
            >
              <Logo color="primary" />
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexGrow: 1,
              height: '100%'
            }}
          >
            {!mdDown && (
              <nav>
                <Box
                  component="ul"
                  sx={{
                    display: 'flex',
                    listStyle: 'none',
                    m: 0,
                    p: 0
                  }}
                >
                  <TopNavItem
                    popover={<PagesPopover />}
                    title="Pages"
                  />
                  <TopNavItem
                    external
                    path={paths.docs.welcome}
                    title="Documentation"
                  />
                  <IconButton
                    color="inherit"
                    onClick={handleThemeSwitch}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      {settings.paletteMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </SvgIcon>
                  </IconButton>
                </Box>
              </nav>
            )}
          </Box>
          <Stack
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            spacing={3}
          >
            {!mdDown && (
              <>
                <Button
                  color="inherit"
                  component={NextLink}
                  href={paths.dashboard.index}
                  variant="outlined"
                >
                  Live Preview
                </Button>
                <Button
                  component="a"
                  href="https://mui.com/store/items/carpatin-dashboard"
                  target="_blank"
                  variant="contained"
                >
                  Purchase
                </Button>
              </>
            )}
            {mdDown && (
              <IconButton
                color="inherit"
                onClick={onNavOpen}
              >
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
