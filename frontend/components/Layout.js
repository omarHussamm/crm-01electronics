import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Image from 'next/image'

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
      <div className='full-page'>{children}
        <div className='text-center'>
          <Image
            src="/bigLogo.png"
            width={500}
            height={500}
            alt="01 Electronics Logo"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: '01 Electronics',
  description: 'CRM for clients and leads',
  keywords: 'clients, leads',
}