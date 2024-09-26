import type { FC } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { format } from 'date-fns';
import {
  Box,
  Checkbox,
  Divider,
  Link,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { Pagination } from '../../../components/pagination';
import { ResourceError } from '../../../components/resource-error';
import { ResourceUnavailable } from '../../../components/resource-unavailable';
import { Scrollbar } from '../../../components/scrollbar';
import { paths } from '../../../paths';
import type { Customer } from '../../../types/customer';
import { QueryField } from 'src/components/query-field';

type SortDir = 'asc' | 'desc';

interface Column {
  disablePadding?: boolean;
  id: string;
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  {
    id: 'Work Order No',
    disablePadding: true,
    label: 'Work Order No',
    sortable: true
  },
  {
    id: 'Primary Incident Type',
    label: 'Primary Incident Type',
    sortable: true
  },
  {
    id: 'Service Account',
    label: 'Service Account',
    sortable: true
  },
  {
    id: 'System Status',
    label: 'System Status',
    sortable: true
  },
  {
    id: 'Priority',
    label: 'Priority',
    sortable: true
  }
];

type ResourcesState = 'loading' | 'error' | 'unavailable' | 'available';

const getResourcesState = (params: { isLoading: boolean; error?: string; items: Customer[] }): ResourcesState => {
  if (params.isLoading) {
    return 'loading';
  }

  if (params.error) {
    return 'error';
  }

  return params.items.length > 0 ? 'available' : 'unavailable';
};

interface BookingTableProps {
  count?: number;
  error?: string;
  isLoading?: boolean;
  items?: Customer[];
  onDeselectAll?: () => void;
  onDeselectOne?: (customerId: string) => void;
  onPageChange?: (page: number) => void;
  onSelectAll?: () => void;
  onSelectOne?: (customerId: string) => void;
  onSortChange?: (sortBy: string) => void;
  page?: number;
  rowsPerPage?: number;
  selected?: string[];
  sortBy?: string;
  sortDir?: SortDir;
}

export const BookingTable: FC<BookingTableProps> = (props) => {
  const {
    count = 0,
    error,
    isLoading = false,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange,
    onSelectAll,
    onSelectOne,
    onSortChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    sortBy = 'createdAt',
    sortDir = 'desc'
  } = props;

  const resourcesState = getResourcesState({
    isLoading,
    error,
    items
  });

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (

<Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#ffffff',
      fontWeight: 500,
      borderRadius: '12px',
      boxShadow: '0 0px 4px rgba(0, 0, 0, 0.1)',
      minHeight: '70vh', 
      justifyContent: 'space-between' 
    }}
  >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '22px'
          }}
        >
          Active Bookable Resource Booking
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            gap:2
          }}>
            <img src="/assets/Filter.svg" />
            <Typography>Edit Filters</Typography>
            <QueryField
              placeholder="Filter By Keyword"
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#B9B9B9',
                fontSize: '18px',
                fontWeight: 400,
                borderRadius: '12px',
                width: '300px'
              }}
            />
        </Box>
      </Box>
        

      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
            <TableCell padding="checkbox"
            sx={{px:2}}>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                  sx={{
                    color: '#E8E8E8', 
                    '&.Mui-checked': {
                      color: '#0090F8', 
                    },
                  }}
                />
              </TableCell>
              
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  padding={column.disablePadding ? 'none' : 'normal'}
                >
                  {
                    column.sortable
                      ? (
                        <TableSortLabel
                          active={sortBy === column.id}
                          direction={sortBy === column.id ? sortDir : 'asc'}
                          disabled={!(resourcesState === 'available')}
                          onClick={() => onSortChange?.(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      )
                      : column.label
                  }
                </TableCell>
              ))}
              
              <TableCell />
            </TableRow>
          </TableHead>
          {resourcesState === 'available' && (
            <TableBody>
              {items.map((customer) => {
                const isSelected = !!selected.find((customerId) => customerId === customer.id);
                const createdAt = format(customer.createdAt, 'dd/MM/yyyy HH:mm');

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    
                    <TableCell padding="checkbox" sx={{px:2}}>
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                        sx={{
                          color: '#E8E8E8', 
                          '&.Mui-checked': {
                            color: '#0090F8', 
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell padding="none">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                      >
                        <Link
                          color="inherit"
                          component={NextLink}
                          href={paths.dashboard.customers.details.index}
                          underline="none"
                          variant="subtitle2"
                        >
                          {customer.workOrder}
                        </Link>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.primaryIncident}
                    </TableCell>
                    <TableCell>
                      {customer.serviceAmount}
                    </TableCell>
                    <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Box
                        sx={{
                          backgroundColor: customer.SystemStatus ? '#4CBC17' : '#FF8413',
                          borderRadius: '50%',
                          height: 10,
                          width: 10
                        }}
                      />
                      <Typography variant="body2">
                      {customer.SystemStatus ? 'Scheduled' : 'Unscheduled'} 
                      </Typography>
                    </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.Priority}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </Scrollbar>
      {resourcesState === 'available' && (
        <>
          <Divider sx={{ mt: 'auto' }} />
          <Pagination
            onPageChange={onPageChange}
            page={page}
            rowsCount={count}
            rowsPerPage={rowsPerPage}
          />
        </>
      )}
      {resourcesState === 'loading' && (
        <Box sx={{ p: 2 }}>
          <Skeleton height={42} />
          <Skeleton height={42} />
          <Skeleton height={42} />
        </Box>
      )}
      {resourcesState === 'error' && (
        <ResourceError
          message="Something went wrong"
          sx={{
            flexGrow: 1,
            m: 2
          }}
        />
      )}
      {resourcesState === 'unavailable' && (
        <ResourceUnavailable
          message="Resources are not available"
          sx={{
            flexGrow: 1,
            m: 2
          }}
        />
      )}
    </Box>
  );
};

BookingTable.propTypes = {
  count: PropTypes.number,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  onSortChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(['asc', 'desc'])
};
