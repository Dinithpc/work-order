import React, { FC, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { format } from 'date-fns';
import {
  TextField,
  MenuItem,
  Button,
  Modal,
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
import { Pagination } from '../../components/pagination';
import { ResourceError } from '../../components/resource-error';
import { ResourceUnavailable } from '../../components/resource-unavailable';
import { Scrollbar } from '../../components/scrollbar';
import { paths } from '../../paths';
import type { Customer } from '../../types/customer';
import { QueryField } from 'src/components/query-field';

type SortDir = 'asc' | 'desc';

interface Column {
  disablePadding?: boolean;
  id: string;
  label: string;
  sortable?: boolean;
}
const priorityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];
const columns: Column[] = [
  {
    id: 'Name',
    disablePadding: true,
    label: 'Name',
    sortable: true
  },
  {
    id: 'Incident Required',
    label: 'Incident',
    sortable: false
  },
  {
    id: 'CreatedOn',
    label: 'created On',
    sortable: false
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

interface CustomersTableProps {
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

export const CustomersTable: FC<CustomersTableProps> = (props) => {
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

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonPosition = buttonRef.current?.getBoundingClientRect();

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
          Inspection Template Versions
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
              <Button ref={buttonRef} onClick={handleOpen}>
            <img src="/assets/Filter.svg" alt="Filter" />
            <Typography sx={{ml:2 , color: '#000000' }}>
            Filter
          </Typography>
          </Button>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: buttonPosition ? buttonPosition.bottom + 10 : '50%',
            left: buttonPosition ? buttonPosition.left : '50%',
            transform: buttonPosition ? 'none' : 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Filters
          </Typography>

          <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
            <Typography sx={{ color: '#576574' }}>Name</Typography>
            <TextField sx={{ 
                flex: '1 1 20%', 
                minWidth: '150px', 
                maxWidth: '200px' 
                }}
                  name="priority" select value={priorityOptions[0].value}>
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
            <Typography sx={{ color: '#576574' }}>Operator</Typography>
            <TextField sx={{ 
                flex: '1 1 20%', 
                minWidth: '150px', 
                maxWidth: '200px' 
                }}
                  name="priority" select value={priorityOptions[0].value}>
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center"  spacing={2} sx={{ mb: 2 }}>
            <Typography sx={{ color: '#576574' }}>Value</Typography>
            <TextField sx={{ 
                flex: '1 1 20%', 
                minWidth: '150px', 
                maxWidth: '200px' 
                }}
                  name="priority" select value={priorityOptions[0].value}>
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Box>
      </Modal>


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

CustomersTable.propTypes = {
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
