import type { NextPage } from 'next';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Button,
  Card,
  CardContent,
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { Layout as OrganizationLayout } from '../../../layouts/organization';

const companySizeOptions: string[] = ['1', '2-10', '11-30', '31-50', '50+'];

interface Values {
  companyName: string;
  companySize: string;
  submit: null;
}

const initialValues: Values = {
  companyName: 'Devias IO',
  companySize: '2-10',
  submit: null
};

const validationSchema = Yup.object({
  companyName: Yup
    .string()
    .max(255)
    .required('Organization name is required'),
  companySize: Yup
    .string()
    .max(255)
    .oneOf(companySizeOptions)
    .required('Size is required')
});

const Page: NextPage = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Settings saved');
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

  return (
    <>
      <Head>
        <title>
          Organization: General | Carpatin
        </title>
      </Head>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={5}
            >
              <Typography variant="h6">
                Settings
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={7}
            >
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    error={!!(formik.touched.companyName && formik.errors.companyName)}
                    fullWidth
                    helperText={formik.touched.companyName && formik.errors.companyName}
                    label="Organization"
                    name="companyName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                  />
                  <TextField
                    error={!!(formik.touched.companySize && formik.errors.companySize)}
                    fullWidth
                    helperText={formik.touched.companySize && formik.errors.companySize}
                    label="Company Size"
                    name="companySize"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.companySize}
                  >
                    {companySizeOptions.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                {formik.errors.submit && (
                  <FormHelperText
                    error
                    sx={{ mt: 2 }}
                  >
                    {formik.errors.submit}
                  </FormHelperText>
                )}
                <Button
                  disabled={formik.isSubmitting}
                  size="large"
                  sx={{ mt: 4 }}
                  type="submit"
                  variant="contained"
                >
                  Save settings
                </Button>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <OrganizationLayout>
      {page}
    </OrganizationLayout>
  </DashboardLayout>
);

export default Page;
