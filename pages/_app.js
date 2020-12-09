import '../styles/globals.css'
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head'
import { useStore } from '../store'
import NavigationComponent from '../components/NavigationComponent';
import FooterComponent from '../components/FooterComponent';

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState)
  
  return (
    <Fragment>
      <Head>
        <title>Health Explore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <div className="container mx-auto">
          <NavigationComponent />
          <Component {...pageProps} />
          <FooterComponent />
        </div>
      </Provider>
    </Fragment>
  )
}

export default MyApp