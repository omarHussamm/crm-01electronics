import React, { useState } from 'react';
import { useRouter } from "next/router"
import styles from "../../styles/SignInUp.module.css";
import Layout from '../../components/Layout';
import Link from 'next/link';
import { z } from "zod";
import axios from 'axios';


export default function SignIn() {

  const router = useRouter()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState('')

  const schema = z.object({
    email: z.string(),
    password: z.string().min(6, { message: "Must be 6 or more characters long" }),
  });


  const handleSignIn = (e) => {
    e.preventDefault()
    const validation = schema.safeParse({ email, password })
    if (validation.success) {
      setPasswordErr('')

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, { email, password },
        {
          "Content-Type": "application/json"
        }).then(response => {
          localStorage.setItem("token", response.data.token)
          router.push("/me")
        }
        ).catch(error => {
          setPasswordErr(error.response.data.detail)
        }
        )


    } else {
      const validationError = JSON.parse(validation.error.message)
      setPasswordErr(validationError[0].message)
    }
  }

  return (
    <Layout>
      <main>
        <div onSubmit={handleSignIn} className={styles.AuthFormContainer}>
          <form className={styles.AuthForm}>
            <div className={styles.AuthFormContent}>
              <h3 className={styles.AuthFormTitle}>Sign In</h3>
              <div className="text-center">
                {!router.query.success && 
                  <>
                    Not registered yet?{" "}
                    <Link className="link-primary" href={"/account/SignUp"}>
                      Sign Up
                    </Link>
                  </>
                }
                {router.query.success && <span className='text-success'>You created an account successfully</span>}
                {router.query.tokenexpired && <div className='text-danger'>Token Expired</div>}
              </div>

              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {passwordErr && <span className='error'> {passwordErr} </span>}
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Forgot <Link href={"/account/ForgotPassword"}>password?</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  )
}
