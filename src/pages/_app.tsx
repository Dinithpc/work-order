import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AuthConsumer, AuthProvider } from '../contexts/auth/jwt-context';
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context';
import { RTL } from '../components/rtl';
import { gtm } from '../libs/gtm';
import { gtmConfig } from '../config';
import { store } from '../store';
import { createTheme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
// Remove if nprogress is not used
import '../libs/nprogress';
// Remove if locales are not used
import '../i18n';

const clientSideEmotionCache = createEmotionCache();

const useAnalytics = () => {
  useEffect(
    () => {
      gtm.initialize(gtmConfig);
    },
    []
  );
};

const SplashScreen = () => null;

const App = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useAnalytics();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Carpatin
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <AuthConsumer>
              {(auth) => (
                <SettingsProvider>
                  <SettingsConsumer>
                    {(settings) => {
                      // Prevent theme flicker when restoring custom settings from browser storage
                      if (!settings.isInitialized) {
                        // return null;
                      }

                      const theme = createTheme({
                        colorPreset: 'blue',
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        contrast: 'high'
                      });

                      // Prevent guards from redirecting
                      const showSlashScreen = !auth.isInitialized;

                      return (
                        <ThemeProvider theme={theme}>
                          <RTL direction={settings.direction}>
                            <CssBaseline />
                            {
                              showSlashScreen
                                ? <SplashScreen />
                                : getLayout(<Component {...pageProps} />)
                            }
                            <Toaster position="top-center" />
                          </RTL>
                        </ThemeProvider>
                      );
                    }}
                  </SettingsConsumer>
                </SettingsProvider>
              )}
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
