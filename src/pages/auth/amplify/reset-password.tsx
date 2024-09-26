import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import type { AuthContextType } from '../../../contexts/auth/amplify-context';
import { GuestGuard } from '../../../guards/guest-guard';
import { IssuerGuard } from '../../../guards/issuer-guard';
import { useAuth } from '../../../hooks/use-auth';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as AuthLayout } from '../../../layouts/auth';
import { paths } from '../../../paths';
import { Issuer } from '../../../utils/auth';

interface Values {
  code: string;
  email: string;
  password: string;
  passwordConfirm: string;
  submit: null;
}

const getInitialValues = (username?: string): Values => ({
  code: '',
  email: username || '',
  password: '',
  passwordConfirm: '',
  submit: null
});

const validationSchema = Yup.object({
  code: Yup
    .string()
    .required('Code is required'),
  email: Yup
    .string()
    .max(255)
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .min(7, 'Must be at least 7 characters')
    .max(255)
    .required('Required'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required')
});

const Page: NextPage = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || undefined;
  const auth = useAuth<AuthContextType>();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(username),
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await auth.forgotPasswordSubmit(values.email, values.code, values.password);

        if (isMounted()) {
          router.push(paths.auth.amplify.login);
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
          Reset Password | Carpatin
        </title>
      </Head>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            mb: 3
          }}
        >
          <Typography variant="h4">
            Reset Password
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            component={NextLink}
            href={paths.auth.amplify.login}
          >
            Sign in
          </Button>
        </Box>
        <Stack spacing={2}>
          <TextField
            autoFocus
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
            error={!!(formik.touched.code && formik.errors.code)}
            fullWidth
            helperText={formik.touched.code && formik.errors.code}
            label="Code"
            name="code"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.code}
          />
          <TextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="New Password"
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
            label="Re-type New Password"
            name="passwordConfirm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.passwordConfirm}
          />
        </Stack>
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
          Reset password
        </Button>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Amplify}>
    <GuestGuard>
      <AuthLayout>
        {page}
      </AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
