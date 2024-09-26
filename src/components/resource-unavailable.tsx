import type { FC } from 'react';
import PropTypes from 'prop-types';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import type { SxProps } from '@mui/system';
import { Box, Button, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResourceUnavailableRoot = styled('div')(
  ({ theme }) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.palette.neutral[900]
      : theme.palette.neutral[900],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3)
  })
);

interface ResourceUnavailableProps {
  message?: string;
  onCreate?: () => void;
  sx?: SxProps;
}

export const ResourceUnavailable: FC<ResourceUnavailableProps> = (props) => {
  const { message = '', onCreate, sx } = props;

  return (
    <ResourceUnavailableRoot sx={sx}>
      {/* <Box
        sx={{
          '& img': {
            maxWidth: '100%'
          }
        }}
      >
        <img src="/assets/illustration-not-found.svg" />
      </Box> */}
      {message && (
        <Typography
          color="black"
          fontWeight={500}
          fontSize={'18px'}
          sx={{ mt: 2 }}
          variant="body2"
        >
          {message}
        </Typography>
      )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: "#B9B9B9", fontSize: "14px" }}>
            Products and Services are items for which a client may be billed.
          </Typography>
          <Typography sx={{ color: "#0090F8", fontSize: "14px", marginLeft: "8px" , textDecoration: 'underline' }}>
            Learn More.
          </Typography>
        </Box>
      {onCreate && (
        <Button
          onClick={onCreate}
          startIcon={(
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          )}
          sx={{ mt: 2 }}
          variant="contained"
        >
          Create Resource
        </Button>
      )}
    </ResourceUnavailableRoot>
  );
};

ResourceUnavailable.propTypes = {
  message: PropTypes.string,
  onCreate: PropTypes.func,
  // @ts-ignore
  sx: PropTypes.object
};
