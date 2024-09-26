import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const PaginationRoot = styled('div')(
  (({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(2)
  }))
);

interface PaginationProps {
  disabled?: boolean;
  onPageChange?: (page: number) => void;
  page?: number;
  rowsPerPage?: number;
  rowsCount?: number;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { disabled, onPageChange, page = 0, rowsCount = 0, rowsPerPage = 0, ...other } = props;
  const pagesCount = Math.ceil(rowsCount / rowsPerPage) || 1;
  const isFirstPage = page === 0;
  const isLastPage = (page + 1) === pagesCount;

  const handlePreviousPage = useCallback(
    () => {
      onPageChange?.(page - 1);
    },
    [page, onPageChange]
  );

  const handleNextPage = useCallback(
    () => {
      onPageChange?.(page + 1);
    },
    [page, onPageChange]
  );

  return (
    <PaginationRoot {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          color="text.secondary"
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
          variant="body2"
          whiteSpace="nowrap"
        >
          {' '}
          <Typography
            component="span"
            sx={{ mx: 1 }}
            variant="subtitle2"
          >
            {page + 1}
          </Typography>
          of
          {' '}
          <Typography
            component="span"
            sx={{ ml: 1 }}
            variant="subtitle2"
          >
            {pagesCount}
          </Typography>
        </Typography>
      </Box>
      <Stack
        alignItems="center"
        direction="row"
        spacing={1}
      >
      <img src="/assets/p-beginning.svg" />
        <IconButton
          disabled={isFirstPage || disabled}
          onClick={handlePreviousPage}
        >
          <img src="/assets/p-left.svg" />
        </IconButton>
        Page
        <Typography
            component="span"
            sx={{ ml: 1 }}
            variant="subtitle2"
          >
            {pagesCount}
          </Typography>
        <IconButton
          disabled={isLastPage || disabled}
          onClick={handleNextPage}
        >
          <img src="/assets/p-right.svg" />
        </IconButton>
        <img src="/assets/p-end.svg" />
      </Stack>
    </PaginationRoot>
  );
};

Pagination.propTypes = {
  disabled: PropTypes.bool,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsCount: PropTypes.number,
  rowsPerPage: PropTypes.number
};
