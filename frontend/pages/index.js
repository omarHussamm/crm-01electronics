
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>

        <main>
          <h1 className={styles.title}>
            Welcome to <span className={styles.blue}>01 Electronics</span>
          </h1>

          <div className={styles.grid}>
            <Link href="/account/SignIn" className={styles.card}>
              <h3>Sign In &rarr;</h3>
              <p>View your dashboard, clients and leads.</p>
            </Link>

            <Link href="/account/SignUp" className={styles.card}>
              <h3>Sign Up &rarr;</h3>
              <p>Create an account to interact with clients and leads.</p>
            </Link>
          </div>
        </main>

       
    </Layout>
  );
}
