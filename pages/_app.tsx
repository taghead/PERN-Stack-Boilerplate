/*
  This file persists content across every page.
*/

import '../styles/global.css'
import Layout from '../components/Layout/'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp