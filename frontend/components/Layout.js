import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ title, keywords, description, children }) {

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header />
      <div className='full-page'>{children}</div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: '01 Electronics',
  description: 'CRM for clients and leads',
  keywords: 'clients, leads',
}