import type { FilterOperator } from '../types/filter';

export const containsOperator: FilterOperator = {
  label: 'contains',
  name: 'contains',
  field: 'string'
};

export const endsWithOperator: FilterOperator = {
  label: 'ends with',
  name: 'endsWith',
  field: 'string'
};

export const equalsOperator: FilterOperator = {
  label: 'equals',
  name: 'equals',
  field: 'string'
};

export const greaterThanOperator: FilterOperator = {
  label: 'greater than',
  name: 'greaterThan',
  field: 'number'
};

export const isAfterOperator: FilterOperator = {
  label: 'is after',
  name: 'isAfter',
  field: 'date'
};

export const isBeforeOperator: FilterOperator = {
  label: 'is before',
  name: 'isBefore',
  field: 'date'
};

export const isBlankOperator: FilterOperator = {
  label: 'is blank',
  name: 'isBlank',
  field: undefined
};

export const isPresentOperator: FilterOperator = {
  label: 'is present',
  name: 'isPresent',
  field: undefined
};

export const lessThanOperator: FilterOperator = {
  label: 'less than',
  name: 'lessThan',
  field: 'number'
};

export const notContainsOperator: FilterOperator = {
  label: 'not contains',
  name: 'notContains',
  field: 'string'
};

export const notEqualOperator: FilterOperator = {
  label: 'not equal',
  name: 'notEqual',
  field: 'string'
};

export const startsWithOperator: FilterOperator = {
  label: 'starts with',
  name: 'startsWith',
  field: 'string'
};
