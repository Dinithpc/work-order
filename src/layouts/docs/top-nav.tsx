import type { FC } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import type { Theme } from '@mui/material';
import { Box, Chip, IconButton, Stack, SvgIcon, useMediaQuery } from '@mui/material';
import { Logo } from '../../components/logo';
import { paths } from '../../paths';

const TOP_NAV_HEIGHT: number = 64;

interface TopNavProps {
  onMobileNavOpen?: () => void;
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNavOpen, ...other } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'background.paper',
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        color: 'text.secondary',
        left: 0,
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar
      }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <Box
            component={NextLink}
            href={paths.index}
            sx={{
              display: 'inline-flex',
              height: 24,
              width: 24
            }}
          >
            <Logo />
          </Box>
          <Chip
            label="v3.0.0"
            size="small"
          />
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          {!lgUp && (
            <IconButton
              color="inherit"
              onClick={onMobileNavOpen}
            >
              <SvgIcon>
                <Bars3Icon />
              </SvgIcon>
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func
};
