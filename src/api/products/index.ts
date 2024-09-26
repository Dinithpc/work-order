import { throttle } from '../../config';
import type { Filter } from '../../types/filter';
import type { Product } from '../../types/product';
import { applyFilters } from '../../utils/apply-filters';
import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { wait } from '../../utils/wait';
import { product, products } from './data';
import { deepCopy } from '../../utils/deep-copy';

type SortDir = 'asc' | 'desc';

type GetProductsRequest = {
  filters?: Filter[];
  page?: number;
  query?: string;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: SortDir;
  view?: 'all' | 'published' | 'draft' | 'archived';
};

type GetProductsResponse = Promise<{
  data: Product[];
  count: number;
}>;

type GetProductRequest = {};

type GetProductResponse = Promise<Product>;

class ProductsApi {
  async getProducts(request: GetProductsRequest = {}): GetProductsResponse {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, page, query, rowsPerPage, sortBy, sortDir, view } = request;

    let data = deepCopy(products) as Product[];

    // Notes:
    //   "Query" represents the product ID
    //   "View" represents the product status

    if (typeof query !== 'undefined') {
      data = data.filter((product) => {
        if (!product.name.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }

        return true;
      });
    }

    if (typeof view !== 'undefined' && view !== 'all') {
      data = data.filter((product) => {
        return product.status === view;
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

  async getProduct(request?: GetProductRequest): GetProductResponse {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(product);
  }
}

export const productsApi = new ProductsApi();
