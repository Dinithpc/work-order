import { useCallback } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import numeral from 'numeral';
import toast from 'react-hot-toast';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';

interface Values {
  customerEmail: string;
  customerName: string;
  dueDate: Date | null;
  isTaxable: boolean;
  issueDate: Date | null;
  items: {
    description: string;
    price: number;
    quantity: number;
  }[];
  note: string;
  ref: string;
  subject: string;
  submit: null;
}

const initialValues: Values = {
  customerEmail: '',
  customerName: '',
  dueDate: new Date(),
  isTaxable: false,
  issueDate: new Date(),
  items: [
    {
      description: '',
      price: 0,
      quantity: 1
    }
  ],
  ref: 'DEV5438',
  note: '',
  subject: '',
  submit: null
};

const validationSchema = Yup.object({
  customerEmail: Yup
    .string()
    .max(255)
    .email('Must be a valid email')
    .required('Email is required'),
  customerName: Yup
    .string()
    .max(255)
    .required('Name is required'),
  dueDate: Yup
    .date()
    .required('Due date is required'),
  issueDate: Yup
    .date()
    .required('Issued date is required'),
  isTaxable: Yup
    .boolean()
    .required('Taxable is required'),
  items: Yup.array().of(
    Yup.object({
      description: Yup
        .string()
        .max(255)
        .required('Description is required'),
      quantity: Yup
        .number()
        .min(1)
        .required('Quantity is required'),
      price: Yup
        .number()
        .min(0)
        .required('Price is required')
    })
  ),
  note: Yup
    .string()
    .max(1024),
  subject: Yup
    .string()
    .max(255)
    .required('Subject is required')
});

const Page: NextPage = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Invoice created');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  usePageView();

  const handleItemAdd = useCallback(
    (): void => {
      formik.setFieldValue(
        'items',
        [
          ...formik.values.items,
          {
            description: '',
            price: 0,
            quantity: 1
          }
        ]
      );
    },
    [formik]
  );

  const handleItemDelete = useCallback(
    (index: number): void => {
      if (formik.values.items.length > 1) {
        formik.setFieldValue(
          'items',
          formik.values.items.filter((item, _index) => _index !== index)
        );
      }
    },
    [formik]
  );

  const getItemFieldError = useCallback(
    (index: number, field: string): string | undefined => {
      if (!!formik.touched.items?.[index] && !!formik.errors.items?.[index]) {
        // @ts-ignore
        return formik.errors.items[index][field];
      }
    },
    [formik]
  );

  const totalPrice = formik.values.items.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );
  const formattedTotalPrice = numeral(totalPrice).format('$0,0.00');

  return (
    <>
      <Head>
        <title>
          Invoice: Create | Carpatin
        </title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={2}>
              <div>
                <Button
                  color="inherit"
                  component={NextLink}
                  href={paths.dashboard.invoices.index}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowLeftIcon />
                    </SvgIcon>
                  )}
                >
                  Invoices
                </Button>
              </div>
              <div>
                <Typography variant="h4">
                  Create Invoice
                </Typography>
              </div>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
              <Card>
                <CardContent>
                  <div>
                    <Grid
                      container
                      spacing={2}
                    >
                      <Grid
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={!!(formik.touched.subject && formik.errors.subject)}
                          fullWidth
                          helperText={formik.touched.subject && formik.errors.subject}
                          label="Subject"
                          name="subject"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.subject}
                        />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                      >
                        <TextField
                          disabled
                          fullWidth
                          label="Invoice #"
                          name="ref"
                          value={formik.values.ref}
                        />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={!!(formik.touched.customerName && formik.errors.customerName)}
                          fullWidth
                          helperText={formik.touched.customerName && formik.errors.customerName}
                          label="Customer Name"
                          name="customerName"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          placeholder="Dinesh Chugtai"
                          value={formik.values.customerName}
                        />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={!!(formik.touched.customerEmail && formik.errors.customerEmail)}
                          fullWidth
                          helperText={formik.touched.customerEmail && formik.errors.customerEmail}
                          label="Customer Email"
                          name="customerEmail"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="email"
                          placeholder="dinesh@pipedpiper.com"
                          value={formik.values.customerEmail}
                        />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                      >
                        <DatePicker
                          label="Issued Date"
                          onChange={(date: Date | null) => formik.setFieldValue('issueDate', date)}
                          renderInput={(inputProps) => (
                            <TextField
                              error={!!(formik.touched.issueDate && formik.errors.issueDate)}
                              fullWidth
                              helperText={
                                formik.touched.issueDate && formik.errors.issueDate as string
                              }
                              name="issueDate"
                              {...inputProps}
                            />
                          )}
                          value={formik.values.issueDate}
                        />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                      >
                        <DatePicker
                          label="Due Date"
                          onChange={(date) => formik.setFieldValue('dueDate', date)}
                          renderInput={(inputProps) => (
                            <TextField
                              error={!!(formik.touched.dueDate && formik.errors.dueDate)}
                              fullWidth
                              helperText={
                                formik.touched.dueDate && formik.errors.dueDate as string
                              }
                              name="dueDate"
                              {...inputProps}
                            />
                          )}
                          value={formik.values.dueDate}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <Box sx={{ my: 2 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={2}>
                      {formik.values.items.map((item, index) => {
                        const descriptionError = getItemFieldError(index, 'description');
                        const quantityError = getItemFieldError(index, 'quantity');
                        const priceError = getItemFieldError(index, 'price');

                        return (
                          <Stack
                            direction="row"
                            flexWrap="wrap"
                            key={index}
                            gap={2}
                          >
                            <TextField
                              error={!!(descriptionError)}
                              helperText={descriptionError}
                              label="Item"
                              name={`items[${index}].description`}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              placeholder="Service description"
                              sx={{
                                width: {
                                  xs: '100%',
                                  md: '50%'
                                }
                              }}
                              value={item.description}
                            />
                            <TextField
                              error={!!(quantityError)}
                              helperText={quantityError}
                              label="Qty"
                              name={`items[${index}].quantity`}
                              onBlur={formik.handleBlur}
                              onChange={(event) => {
                                if (isNaN(+event.target.value)) {
                                  return;
                                }

                                formik.handleChange(event);
                              }}
                              sx={{ width: 100 }}
                              value={item.quantity}
                            />
                            <TextField
                              error={!!priceError}
                              helperText={priceError}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                )
                              }}
                              label="Price"
                              name={`items[${index}].price`}
                              onBlur={formik.handleBlur}
                              onChange={(event) => {
                                if (isNaN(+event.target.value)) {
                                  return;
                                }

                                formik.handleChange(event);
                              }}
                              sx={{ width: 100 }}
                              value={item.price}
                            />
                            <TextField
                              disabled
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                )
                              }}
                              label="Total"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              sx={{ width: 100 }}
                              value={item.price * item.quantity}
                            />
                            <Box sx={{ pt: '24px' }}>
                              <IconButton
                                onClick={() => handleItemDelete(index)}
                                type="button"
                              >
                                <SvgIcon fontSize="small">
                                  <TrashIcon />
                                </SvgIcon>
                              </IconButton>
                            </Box>
                          </Stack>
                        );
                      })}
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                    >
                      <Button
                        onClick={handleItemAdd}
                        startIcon={(
                          <SvgIcon fontSize="small">
                            <PlusIcon />
                          </SvgIcon>
                        )}
                      >
                        Add Item
                      </Button>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                        >
                          Total
                        </Typography>
                        <Typography variant="h6">
                          {formattedTotalPrice}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ my: 2 }}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={formik.values.isTaxable}
                          onChange={(event) => formik.setFieldValue(
                            'isTaxable',
                            event.target.checked
                          )}
                        />
                      )}
                      label="Taxable (VAT 19%)"
                    />
                  </Box>
                  <TextField
                    error={!!(formik.touched.note && formik.errors.note)}
                    fullWidth
                    helperText={formik.touched.note && formik.errors.note}
                    label="Additional Notes"
                    multiline
                    name="note"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Client notes"
                    rows={4}
                    value={formik.values.note}
                  />
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Create Invoice
                  </Button>
                </CardActions>
              </Card>
            </form>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
