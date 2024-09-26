import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material';
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
  email: string;
  submit: null;
}

const initialValues: Values = {
  email: '',
  submit: null
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .max(255)
    .email('Must be a valid email')
    .required('Email is required')
});

const Page: NextPage = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const auth = useAuth<AuthContextType>();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await auth.forgotPassword(values.email);

        if (isMounted()) {
          const searchParams = new URLSearchParams({ username: values.email }).toString();
          const href = paths.auth.amplify.resetPassword + `?${searchParams}`;
          router.push(href);
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
          Forgot Password | Carpatin
        </title>
      </Head>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4">
            Forgot password
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Enter the email address you used when you
            joined and we&apos;ll send you instructions to reset your password.
          </Typography>
        </Box>
        <div>
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
        </div>
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
          Send Verification Email
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
