import type { FC } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';
import { paths } from '../../../paths';
import type { ProductService } from '../../../types/customer';
// import { CustomerOrderMenu } from './customer-order-menu';

type SortDir = 'asc' | 'desc';

const statusMap: Record<string, { color: string; label: string; }> = {
  placed: {
    color: 'info.main',
    label: 'Placed'
  },
  processed: {
    color: 'error.main',
    label: 'Processed'
  },
  complete: {
    color: 'success.main',
    label: 'Complete'
  },
  delivered: {
    color: 'success.main',
    label: 'Delivered'
  }
};

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  {
    id: 'id',
    label: 'Name',
    sortable: true
  },
  {
    id: 'estimateDuration',
    label: 'Estimate Duration',
    sortable: true
  },
  {
    id: 'duration',
    label: 'Duration',
    sortable: true
  },
  {
    id: 'estimatedTotalPrice',
    label: 'Estimated Total Price',
    sortable: true
  },
  {
    id: 'totalPrice',
    label: 'Total Price',
    sortable: true
  },
  {
    id: 'priority',
    label: 'Priority',
    sortable: true
  }
];

interface ProductServiceTableProps {
  isLoading?: boolean;
  items?: ProductService[];
  onSortChange?: (sortBy: string) => void;
  sortBy?: string;
  sortDir?: SortDir;
}

export const ProductServiceTable: FC<ProductServiceTableProps> = (props) => {
  const { isLoading = false, items = [], onSortChange, sortBy, sortDir } = props;

  return (
    <Scrollbar>
      <Table sx={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {
                  column.sortable
                    ? (
                      <TableSortLabel
                        active={sortBy === column.id}
                        direction={sortBy === column.id ? sortDir : 'asc'}
                        disabled={isLoading}
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
        <TableBody>
          {items.map((order) => {
            const priority = statusMap[order.priority];
            const name = [order.name];
            const estimationDuration = [order.estimationDuration];
            const duration = [order.duration];
            const estimatedTotalPrice = [order.estimatedTotalPrice];
            const totalPrice = [order.totalPrice];

            return (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    color="inherit"
                    component={NextLink}
                    href={paths.dashboard.orders.details}
                    underline="none"
                    variant="subtitle2"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>
                  {estimationDuration}
                </TableCell>
                <TableCell>
                  {duration}
                </TableCell>
                <TableCell>
                  {estimatedTotalPrice}
                </TableCell>
                <TableCell>
                  {totalPrice}
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Scrollbar>
  );
};

ProductServiceTable.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(['asc', 'desc'])
};
