import React, { useState } from 'react';
import { useRouter } from "next/router"
import styles from "../../styles/SignInUp.module.css";
import Layout from '../../components/Layout';
import Link from 'next/link';
import { z } from 'zod';
import axios from 'axios';

export default function SignUp() {

  const router = useRouter();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [nameErr, setNameErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')

  const schema = z.string().min(6, { message: "Must be 6 or more characters long" })

  const handleSignUp = (e) => {
    e.preventDefault()
    const nameValidation = schema.safeParse(name)
    const passwordValidation = schema.safeParse(password)
    if (nameValidation.success) {
      setNameErr('')
    } else {
      const validationError = JSON.parse(nameValidation.error.message)
      setNameErr(validationError[0].message)
      return
    }
    if (passwordValidation.success) {
      setPasswordErr('')
    } else {
      const validationError = JSON.parse(passwordValidation.error.message)
      setPasswordErr(validationError[0].message)
      return
    }
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, { name, email: email.toLowerCase(), password },
      {
        "Content-Type": "application/json"
      }).then(() => {
        router.push({ pathname: "/account/SignIn", query: { success: true } })
      }
      ).catch(error => {
        setPasswordErr(error.response.data.detail)
      }
      )

  }
  return (
    <Layout>
      <main>
        <div className={styles.AuthFormContainer}>
          <form onSubmit={handleSignUp} className={styles.AuthForm}>
            <div className={styles.AuthFormContent}>
              <h3 className={styles.AuthFormTitle}>Sign Up</h3>
              <div className="text-center">
                Already registered?{" "}
                <Link className="link-primary" href={"/account/SignIn"}>
                  Sign In
                </Link>
              </div>
              <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              {nameErr && <span className='error'> {nameErr} </span>}
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
            </div>
          </form>
        </div>
      </main>
    </Layout>
  )
}
