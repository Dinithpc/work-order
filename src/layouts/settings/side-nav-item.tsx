import { FC, ReactNode, useCallback, useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import { Box, ButtonBase, Collapse, SvgIcon } from '@mui/material';

interface SideNavItemProps {
  active?: boolean;
  children?: ReactNode;
  collapse?: boolean;
  depth?: number;
  external?: boolean;
  icon?: ReactNode;
  openImmediately?: boolean;
  path?: string;
  pinned?: boolean;
  title: string;
}

export const SideNavItem: FC<SideNavItemProps> = (props) => {
  const {
    active = false,
    children,
    collapse = false,
    depth = 0,
    external = false,
    icon,
    openImmediately = false,
    path,
    title
  } = props;
  const [open, setOpen] = useState<boolean>(true);

  const handleToggle = useCallback(
    (): void => {
      setOpen((prevOpen) => !prevOpen);
    },
    []
  );

  // Branch

  if (children) {
    return (
      <li>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 1,
            display: 'flex',
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: '20px',
            fontWeight: 600,
            justifyContent: 'flex-start',
            py: '12px',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            width: '100%'
          }}
        >
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
              flexGrow: 0,
              flexShrink: 0,
              height: 24,
              justifyContent: 'center',
              width: 24
            }}
          >
            {icon}
          </Box>
          <Box
            component="span"
            sx={{
              color: depth === 0 ? '##222F3E' : '#576574',
              flexGrow: 1,
              fontSize: 20,
              fontWeight : 600,
              transition: 'opacity 250ms ease-in-out',
              ...(collapse && {
                opacity: 50
              })
            }}
          >
        {collapse ? title.charAt(0) : title}
        </Box>
          <SvgIcon
            sx={{
              color: 'neutral.500',
              fontSize: 16,
              transition: 'opacity 250ms ease-in-out',
              ...(collapse && {
                opacity:0
              })
            }}
          >
          </SvgIcon>
        </Box>

          {children}
      </li>
    );
  }

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          fontFamily: (theme) => theme.typography.fontFamily,
          fontSize: 14,
          fontWeight: 500,
          px: '6px',
          py: '12px',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          width: '100%',
          backgroundColor: active ? '#000B271A' : 'inherit', // Change background color when active

        }}
        {...linkProps}
      >
        <Box
          component="span"
          sx={{
            alignItems: 'center',
            color: '#576574',
            display: 'inline-flex',
            flexGrow: 0,
            flexShrink: 0,
            height: 24,
            justifyContent: 'center',
            width: 24,
            ml: !collapse ? 3 : 0
          }}
        >
          {icon}
        </Box>

          {!collapse && (
            <Box
              component="span"
              sx={{
                color: depth === 0 ? 'text.primary' : 'text.secondary',
                flexGrow: 1,
                mx: '12px',
                fontSize:16,
                fontWeight: 400,
                transition: 'opacity 250ms ease-in-out',
                ...(active && {
                  color: '#222F3E',
                  fontWeight : 500
                })
              }}
            >
              {title}
            </Box>
          )}


        {external && (
          <SvgIcon
            sx={{
              color: 'neutral.500',
              fontSize: 18,
              display: 'flex',
              justifyContent: 'center',
              transition: 'opacity 250ms ease-in-out',
              ...(collapse && {
                opacity: 0
              })
            }}
          >
            <ArrowTopRightOnSquareIcon />
          </SvgIcon>
        )}
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  collapse: PropTypes.bool,
  depth: PropTypes.number,
  external: PropTypes.bool,
  icon: PropTypes.any,
  openImmediately: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
