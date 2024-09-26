import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { productsApi } from '../../../../api/products';
import { ResourceError } from '../../../../components/resource-error';
import { ResourceLoading } from '../../../../components/resource-loading';
import { ResourceUnavailable } from '../../../../components/resource-unavailable';
import { useDialog } from '../../../../hooks/use-dialog';
import { useMounted } from '../../../../hooks/use-mounted';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { Layout as ProductLayout } from '../../../../layouts/product';
import { ProductDetails } from '../../../../sections/dashboard/products/product-details';
import { ProductDetailsDialog } from '../../../../sections/dashboard/products/product-details-dialog';
import { ProductQuickActions } from '../../../../sections/dashboard/products/product-quick-actions';
import { ProductVariants } from '../../../../sections/dashboard/products/product-variants';
import type { Product, ProductVariant } from '../../../../types/product';

interface ProductStoreState {
  data?: Product;
  error?: string;
  isLoading?: boolean;
}

interface ProductStore {
  handleVariantCreated: (variant: ProductVariant) => void;
  handleVariantDeleted: (variantId: string) => void;
  handleVariantUpdated: (variant: ProductVariant) => void;
  state: ProductStoreState;
}

const useProductStore = (): ProductStore => {
  const isMounted = useMounted();
  const [state, setState] = useState<ProductStoreState>({ isLoading: true });

  const handleProductGet = useCallback(
    async () => {
      setState({ isLoading: true });

      try {
        const response = await productsApi.getProduct();

        if (isMounted()) {
          setState({ data: response });
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          setState({ error: 'Something went wrong' });
        }
      }
    },
    [isMounted]
  );

  const handleVariantCreated = useCallback(
    (variant: ProductVariant) => {
      setState((prevState) => {
        if (!prevState.data) {
          return prevState;
        }

        const variants = [
          ...(prevState.data.variants || []),
          variant
        ];

        return {
          ...prevState,
          data: {
            ...prevState.data,
            variants
          }
        };
      });
    },
    []
  );

  const handleVariantDeleted = useCallback(
    (variantId: string) => {
      setState((prevState) => {
        if (!prevState.data) {
          return prevState;
        }

        const variants = (prevState.data.variants || []).filter((variant) => {
          return variant.id !== variantId;
        });

        return {
          ...prevState,
          data: {
            ...prevState.data,
            variants
          }
        };
      });
    },
    []
  );

  const handleVariantUpdated = useCallback(
    (variant: ProductVariant) => {
      setState((prevState) => {
        if (!prevState.data) {
          return prevState;
        }

        const variants = (prevState.data.variants || []).map((_variant) => {
          if (_variant.id === variant.id) {
            return variant;
          }

          return _variant;
        });

        return {
          ...prevState,
          data: {
            ...prevState.data,
            variants
          }
        };
      });
    },
    []
  );

  useEffect(
    () => {
      handleProductGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    handleVariantCreated,
    handleVariantDeleted,
    handleVariantUpdated,
    state
  };
};

type ResourcesState = 'loading' | 'error' | 'unavailable' | 'available';

const getResourcesState = (storeState: ProductStoreState): ResourcesState => {
  if (storeState.isLoading) {
    return 'loading';
  }

  if (storeState.error) {
    return 'error';
  }

  return storeState.data ? 'available' : 'unavailable';
};

const Page: NextPage = () => {
  const productStore = useProductStore();
  const detailsDialog = useDialog();

  usePageView();

  const resourcesState = getResourcesState(productStore.state);

  return (
    <>
      <Head>
        <title>
          Product: Summary | Carpatin
        </title>
      </Head>
      {resourcesState === 'loading' && (
        <ResourceLoading message="Loading resources" />
      )}
      {resourcesState === 'error' && (
        <ResourceError message="Something went wrong" />
      )}
      {resourcesState === 'unavailable' && (
        <ResourceUnavailable message="Resources are not available" />
      )}
      {resourcesState === 'available' && (
        <div>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              lg={8}
              sx={{
                order: {
                  xs: 1,
                  md: 2
                }
              }}
            >
              <Stack spacing={3}>
                <ProductDetails
                  onEdit={detailsDialog.handleOpen}
                  product={productStore.state.data!}
                />
                <ProductVariants
                  onVariantCreated={productStore.handleVariantCreated}
                  onVariantDeleted={productStore.handleVariantDeleted}
                  onVariantUpdated={productStore.handleVariantUpdated}
                  variants={productStore.state.data!.variants}
                />
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={4}
              sx={{
                order: {
                  xs: 1,
                  md: 2
                }
              }}
            >
              <ProductQuickActions product={productStore.state.data!} />
            </Grid>
          </Grid>
        </div>
      )}
      <ProductDetailsDialog
        onClose={detailsDialog.handleClose}
        open={detailsDialog.open}
        product={productStore.state.data}
      />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <ProductLayout>
      {page}
    </ProductLayout>
  </DashboardLayout>
);

export default Page;
