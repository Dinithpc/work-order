import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Footer } from './footer';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';

const useMobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const handlePathnameChange = useCallback(
    (): void => {
      if (open) {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  const handleOpen = useCallback(
    (): void => {
      setOpen(true);
    },
    []
  );

  const handleClose = useCallback(
    (): void => {
      setOpen(false);
    },
    []
  );

  return {
    handleClose,
    handleOpen,
    open
  };
};

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%'
}));

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mobileNav = useMobileNav();

  return (
    <LayoutRoot>
      <TopNav onNavOpen={mobileNav.handleOpen} />
      {mdDown && (
        <SideNav
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
        />
      )}
      {children}
      <Footer />
    </LayoutRoot>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
