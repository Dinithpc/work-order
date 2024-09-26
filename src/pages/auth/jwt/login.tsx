import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Button, FormHelperText, Link, TextField, Typography } from '@mui/material';
import type { AuthContextType } from '../../../contexts/auth/jwt-context';
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
  password: string;
  submit: null;
}

const initialValues: Values = {
  email: 'demo@devias.io',
  password: 'Password123!',
  submit: null
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .max(255)
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .max(255)
    .required('Password is required')
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
        await auth.signIn(values.email, values.password);

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
      <title>Login</title>
    </Head>

    <Grid container component="main" sx={{ height: '945px', p:5 ,  backgroundColor: '#F8F8F8'}}>
      <Grid
          item
          xs={12}
          sm={7}
          sx={{
            position: 'relative',
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(/assets/login-image.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
          }}
        >

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 144, 248, 0.8)',
              borderRadius: 2,
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              padding: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >

            <img src="/assets/logo-white.svg" alt="Logo" style={{ width: 50, height: 50 }} />
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                marginLeft: 1,
                fontWeight: 400,
                fontSize: '18px',
              }}
            >
              www.soaravg.com
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 10,
              left: 16,
              padding: 5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            <Typography
              sx={{
                color: 'white',
                fontWeight: 400,
                fontSize: { xs: '16px', md: '20px' },
              }}
            >
              Smart Security Monitoring System
            </Typography>

            <Typography
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '24px', md: '40px' },
              }}
            >
            Uniqueness of the <br/>Smart Security & Property Inspection            
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5}   >
            <Box
                sx={{
                my: 'auto',
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
                }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'nowrap' }}>
                <img src="/assets/blue-logo.svg" alt="Soar Studio" style={{ width: 72, flexShrink: 0 }} />
                <Box sx={{ ml: 2, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Typography
                    variant="h5"
                    sx={{ color: '#0090F8', fontSize: { xs: '20px', md: '38px' }, fontWeight: 600 }}
                  >
                    Soar Studio
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: '#222F3E', fontSize: { xs: '14px', md: '16px' }, fontWeight: 400, mt: 0 }}
                  >
                    Ultimate Security Provider
                  </Typography>
                </Box>
              </Box>

                <Typography component="h1" variant="h5" sx={{ mb: 2  , fontSize: { xs: '14px', md: '20px' } , fontWeight : 400}}>
                  Login in to your account.
                </Typography>

                <form onSubmit={formik.handleSubmit}>

                <TextField
                  margin="normal"
                  fullWidth
                  id="username"
                  label="User Name"
                  name="email"
                  autoComplete="username"
                  placeholder="User Name"
                  autoFocus
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  />

                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  
                  {formik.errors.submit && (
          <FormHelperText
            error
            sx={{ mt: 3 }}
          >
            {formik.errors.submit}
          </FormHelperText>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
          <Link href="#" variant="body2" sx={{ color: 'black' , fontSize:'16px' , fontWeight:400 }}>
              Forgot Password?
          </Link>
        </Box>

        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{backgroundColor:'#0090F8' , mt:3}}
        >
          Login
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
            <Typography variant="body2" sx={{ mt: 2 }}>
                Don’t have an account? <Link href="/signup" sx={{ color: '#000000' , fontWeight : 600 }}>Sign Up</Link>
            </Typography>
        </Box>
                  </form>
            </Box>
        </Grid>
    </Grid>
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
