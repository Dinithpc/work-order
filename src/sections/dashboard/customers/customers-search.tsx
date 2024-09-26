import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import { Box, Button, Divider, Stack, SvgIcon } from '@mui/material';
import { BulkActionsMenu } from '../../../components/bulk-actions-menu';
import { QueryField } from '../../../components/query-field';
import { FilterDialog } from '../../../components/filter-dialog';
import { useDialog } from '../../../hooks/use-dialog';
import type { Filter, FilterOperator, FilterProperty } from '../../../types/filter';
import {
  containsOperator,
  endsWithOperator,
  equalsOperator,
  greaterThanOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator,
  lessThanOperator,
  notContainsOperator,
  notEqualOperator,
  startsWithOperator
} from '../../../utils/filter-operators';

type View = 'all' | 'isReturning' | 'orderedRecently';

interface ViewOption {
  label: string;
  value: View;
}



const filterProperties: FilterProperty[] = [
  {
    label: 'Name',
    name: 'name',
    operators: [
      'contains',
      'endsWith',
      'equals',
      'notContains',
      'startsWith',
      'isBlank',
      'isPresent'
    ]
  },
  {
    label: 'Email',
    name: 'email',
    operators: [
      'contains',
      'endsWith',
      'equals',
      'notContains',
      'startsWith',
      'isBlank',
      'isPresent'
    ]
  },
  {
    label: 'Phone',
    name: 'phone',
    operators: [
      'contains',
      'endsWith',
      'equals',
      'notContains',
      'startsWith',
      'isBlank',
      'isPresent'
    ]
  },
  {
    label: 'Created',
    name: 'createdAt',
    operators: ['isAfter', 'isBefore', 'isBlank', 'isPresent']
  }
];

const filterOperators: FilterOperator[] = [
  containsOperator,
  endsWithOperator,
  equalsOperator,
  greaterThanOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator,
  lessThanOperator,
  notContainsOperator,
  notEqualOperator,
  startsWithOperator
];

interface CustomersSearchProps {
  disabled?: boolean;
  filters?: Filter[];
  onFiltersApply?: (filters: Filter[]) => void;
  onFiltersClear?: () => void;
  onQueryChange?: (query: string) => void;
  onViewChange?: (view: View) => void;
  query?: string;
  selected?: string[];
  view?: View;
}

export const CustomersSearch: FC<CustomersSearchProps> = (props) => {
  const {
    disabled = false,
    filters = [],
    onFiltersApply,
    onFiltersClear,
    onQueryChange,
    onViewChange,
    query = '',
    selected = [],
    view = 'all'
  } = props;
  const filterDialog = useDialog();

  const handleFiltersApply = useCallback(
    (filters: Filter[]) => {
      filterDialog.handleClose();
      onFiltersApply?.(filters);
    },
    [filterDialog, onFiltersApply]
  );

  const handleFiltersClear = useCallback(
    (): void => {
      filterDialog.handleClose();
      onFiltersClear?.();
    },
    [filterDialog, onFiltersClear]
  );

  const hasSelection = selected.length > 0;
  const hasFilters = filters.length > 0;

  return (
    <>
      <div>
        <Box
          sx={{
            px: {
              sm: 3
            }
          }}
        >
          
        </Box>
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={3}
          sx={{ p: 2 }}
        >
          {hasSelection && (
            <BulkActionsMenu
              disabled={disabled}
              selectedCount={selected.length}
              sx={{
                order: {
                  xs: 3,
                  sm: 1
                }
              }}
            />
          )}
          <QueryField
            disabled={disabled}
            placeholder="Search..."
            onChange={onQueryChange}
            sx={{
              flexGrow: 1,
              order: {
                xs: 1,
                sm: 2
              }
            }}
            value={query}
          />
          <Button
            disabled={disabled}
            onClick={filterDialog.handleOpen}
            size="large"
            startIcon={(
              <SvgIcon fontSize="small">
                <AdjustmentsHorizontalIcon />
              </SvgIcon>
            )}
            sx={{ order: 2 }}
            variant={hasFilters ? 'contained' : 'text'}
          >
            Filter
          </Button>
        </Stack>
      </div>
      <FilterDialog
        filters={filters}
        onApply={handleFiltersApply}
        onClear={handleFiltersClear}
        onClose={filterDialog.handleClose}
        open={filterDialog.open}
        operators={filterOperators}
        properties={filterProperties}
      />
    </>
  );
};

CustomersSearch.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.array,
  onFiltersApply: PropTypes.func,
  onFiltersClear: PropTypes.func,
  onQueryChange: PropTypes.func,
  onViewChange: PropTypes.func,
  query: PropTypes.string,
  selected: PropTypes.array,
  view: PropTypes.oneOf<View>(['all', 'isReturning', 'orderedRecently'])
};
