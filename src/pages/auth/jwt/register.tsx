import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FormHelperText, Link, Stack, TextField, Typography } from '@mui/material';
import type { AuthContextType } from '../../../contexts/auth/jwt-context';
import { GuestGuard } from '../../../guards/guest-guard';
import { IssuerGuard } from '../../../guards/issuer-guard';
import { useAuth } from '../../../hooks/use-auth';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as AuthLayout } from '../../../layouts/auth';
import { paths } from '../../../paths';
import { Issuer } from '../../../utils/auth';
import NextLink from 'next/link';

interface Values {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  submit: null;
}

const initialValues: Values = {
  email: '',
  name: '',
  password: '',
  passwordConfirm: '',
  submit: null
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .max(255)
    .email('Must be a valid email')
    .required('Email is required'),
  name: Yup
    .string()
    .max(255)
    .required('Name is required'),
  password: Yup
    .string()
    .min(7)
    .max(255)
    .required('Password is required'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required')
});

const Page: NextPage = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || undefined;
  const auth = useAuth() as AuthContextType;
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await auth.signUp(values.email, values.name, values.password);

        if (isMounted()) {
          router.push(returnTo || paths.dashboard.index);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  usePageView();

  return (
    <>
      <Head>
        <title>
          Register | Carpatin
        </title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 3 }}
        >
          <Typography variant="h4">
            Register
          </Typography>
          <Button
            component={NextLink}
            href={paths.auth.jwt.login}
          >
            Sign In
          </Button>
        </Stack>
        <Stack spacing={2}>
          <TextField
            autoFocus
            error={!!(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <TextField
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
          <TextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          />
          <TextField
            error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
            fullWidth
            helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            label="Re-type Password"
            name="passwordConfirm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.passwordConfirm}
          />
        </Stack>
        <Typography
          align="center"
          sx={{ mt: 3 }}
          variant="body2"
        >
          By clicking any the Register button, I agree to the
          &nbsp;
          <Link
            href="#"
            variant="inherit"
          >
            terms of service
          </Link>
        </Typography>
        {formik.errors.submit && (
          <FormHelperText
            error
            sx={{ mt: 3 }}
          >
            {formik.errors.submit}
          </FormHelperText>
        )}
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
        >
          Register
        </Button>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>
      <AuthLayout>
        {page}
      </AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
