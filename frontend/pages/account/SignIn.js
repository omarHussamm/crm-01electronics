import React, { useState } from 'react';
import styles from "../../styles/SignInUp.module.css";
import Layout from '../../components/Layout';
import Link from 'next/link';
import { z } from "zod";

export default function SignIn() {
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
    if(validation.success){
      setPasswordErr('')
      console.log(validation.data)
    }else{
      const validationError = JSON.parse(validation.error.message)
      setPasswordErr(validationError[0].message)
    }
  }

  return (
    <Layout>
      <div onSubmit={handleSignIn} className={styles.AuthFormContainer}>
        <form className={styles.AuthForm}>
          <div className={styles.AuthFormContent}>
            <h3 className={styles.AuthFormTitle}>Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <Link className="link-primary" href={"/account/SignUp"}>
                Sign Up
              </Link>
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
    </Layout>
  )
}
