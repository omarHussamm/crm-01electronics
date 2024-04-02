import React, { useState } from 'react'
import styles from "../../styles/SignInUp.module.css";
import Layout from '../../components/Layout';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ForgotPassword() {

    const router = useRouter()

    const [email, setEmail] = useState('')

    const handleForgotPassword = (e) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgotpassword`, { email: [email] }).then(() => {
            router.push({ pathname: "/account/SignIn", query: { passwordreset: true } })
        })
    }

    return (
        <Layout>
            <main>
                <div className={styles.AuthFormContainer}>
                    <form onSubmit={handleForgotPassword} className={styles.AuthForm}>
                        <div className={styles.AuthFormContent}>
                            <h3 className={styles.AuthFormTitle}>Forgot Password</h3>
                            <div className="text-center">
                                Not registered yet?{" "}
                                <Link className="link-primary" href={"/account/SignUp"}>
                                    Sign Up
                                </Link>
                            </div>
                            <div className="text-center">
                                Already registered?{" "}
                                <Link className="link-primary" href={"/account/SignIn"}>
                                    Sign In
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
