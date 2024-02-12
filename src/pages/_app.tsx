import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import Head from 'next/head';
import DrawersContainer from '@/components/drawer-views/container';
import WalletContextProvider from '@/components/wallet/WalletContextProvider';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import store from '../store/store';

// import 'overlayscrollbars/css/OverlayScrollbars.css';
// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>ReInsure</title>
      </Head>
      <Provider store={store}>
        <WalletContextProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="dark"
          >
            {getLayout(<Component {...pageProps} />)}
            <DrawersContainer />
          </ThemeProvider>
        </WalletContextProvider>
      </Provider>
    </>
  );
}

export default CustomApp;
