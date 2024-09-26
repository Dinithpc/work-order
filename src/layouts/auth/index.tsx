import type { FC, ReactNode } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, Container, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { Logo } from '../../components/logo';
import { useAuth } from '../../hooks/use-auth';
import { paths } from '../../paths';
import { Issuer } from '../../utils/auth';

const TOP_NAV_HEIGHT: number = 64;

const issuers: Record<Issuer, string> = {
  Amplify: '/assets/logos/logo-amplify.svg',
  Auth0: '/assets/logos/logo-auth0.svg',
  Firebase: '/assets/logos/logo-firebase.svg',
  JWT: '/assets/logos/logo-jwt.svg'
};

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const { issuer: currentIssuer } = useAuth();

  return (
    <>
      <Container sx={{ width: '100%' , backgroundColor:'#F8F8F8' }} maxWidth={false}>
      {children}
            {/* <Stack
              alignItems="center"
              direction="row"
              spacing={4}
            >
              {Object.keys(issuers).map((issuer) => {
                const isCurrent = issuer === currentIssuer;
                const icon = issuers[issuer as Issuer];

                return (
                  <Tooltip
                    key={issuer}
                    title={issuer}
                  >
                    <Box
                      component="img"
                      src={icon}
                      sx={{
                        height: 30,
                        '&:not(:hover)': {
                          ...(!isCurrent && {
                            filter: 'grayscale(100%)'
                          })
                        }
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Stack> */}
        </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
