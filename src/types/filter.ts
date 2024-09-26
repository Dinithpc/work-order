export interface FilterOperator {
  label: string;
  name: string;
  field?: 'date' | 'string' | 'number';
}

export interface FilterProperty {
  label: string;
  name: string;
  // List of operator names
  operators: string[];
}

export type FilterValue = Date | string | number | undefined;

export interface Filter {
  // Operator name
  operator?: string;
  // Property name
  property: string;
  // Matching value
  value: FilterValue;
}
