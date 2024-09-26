import { throttle } from '../../config';
import type { Customer, CustomerLogs, CustomerNote, CustomerOrder } from '../../types/customer';
import type { Filter } from '../../types/filter';
import { applyFilters } from '../../utils/apply-filters';
import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { deepCopy } from '../../utils/deep-copy';
import { wait } from '../../utils/wait';
import { customer, customerLogs, customerNotes, customerOrders, customers } from './data';

type SortDir = 'asc' | 'desc';

type GetCustomersRequest = {
  filters?: Filter[];
  page?: number;
  query?: string;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: SortDir;
  view?: 'all' | 'isReturning' | 'orderedRecently';
}

type GetCustomersResponse = Promise<{
  data: Customer[];
  count: number;
}>;

type GetCustomerRequest = {};

type GetCustomerResponse = Promise<Customer>;

type GetCustomerOrdersRequest = {
  sortBy?: string;
  sortDir?: SortDir;
};

type GetCustomerOrdersResponse = Promise<CustomerOrder[]>;

type GetCustomerNotesRequest = {};

type GetCustomerNotesResponse = Promise<CustomerNote[]>;

type GetCustomerLogsRequest = {};

type GetCustomerLogsResponse = Promise<CustomerLogs[]>;

class CustomersApi {
  async getCustomers(request: GetCustomersRequest = {}): GetCustomersResponse {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, page, query, rowsPerPage, sortDir, sortBy, view } = request;

    let data = deepCopy(customers) as Customer[];

    // Notes:
    //   "Query" represents the customer name
    //   "View" represents a specific or a group of pre-defined attributes

    if (typeof query !== 'undefined') {
      data = data.filter((customer) => {
        if (!customer.name?.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }

        return true;
      });
    }

    if (typeof view !== 'undefined' && view !== 'all') {
      data = data.filter((customer) => {
        if (view === 'isReturning' && !customer.isReturning) {
          return false;
        }

        if (view === 'orderedRecently' && !customer.orderedRecently) {
          return false;
        }

        return true;
      });
    }

    if (typeof filters !== 'undefined') {
      data = applyFilters(data, filters);
    }

    const count = data.length;

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }

  async getCustomer(request?: GetCustomerRequest): GetCustomerResponse {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customer);
  }

  async getCustomerOrders(request: GetCustomerOrdersRequest = {}): GetCustomerOrdersResponse {
    if (throttle) {
      await wait(throttle);
    }

    const { sortBy, sortDir } = request;

    let data = deepCopy(customerOrders) as CustomerOrder[];

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    return Promise.resolve(data);
  }

  async getCustomerNotes(request: GetCustomerNotesRequest = {}): GetCustomerNotesResponse {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customerNotes);
  }

  async getCustomerLogs(request: GetCustomerLogsRequest = {}): GetCustomerLogsResponse {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customerLogs);
  }
}

export const customersApi = new CustomersApi();
