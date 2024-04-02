import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { z } from 'zod'
import styles from "../../styles/SignInUp.module.css";
import Link from 'next/link';
import axios from 'axios';

export default function AddLead() {

  const router = useRouter()


  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [phoneErr, setPhoneErr] = useState('')
  const [nameErr, setNameErr] = useState('')

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

  const nameSchema = z.string().min(6, { message: "Must be 6 or more characters long" })
  const phoneSchema = z.string().regex(phoneRegex, 'Invalid Number!').min(11, "Less than 11 characters")

  const handleAddLead = (e) => {
    e.preventDefault()
    const nameValidation = nameSchema.safeParse(name)
    const phoneValidation = phoneSchema.safeParse(phone)
    if (nameValidation.success) {
      setNameErr('')
    } else {
      const validationError = JSON.parse(nameValidation.error.message)
      setNameErr(validationError[0].message)
      return
    }
    if (phoneValidation.success) {
      setPhoneErr('')
    } else {
      const validationError = JSON.parse(phoneValidation.error.message)
      setPhoneErr(validationError[0].message)
      return
    }
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/actions/lead`, { email: email.toLowerCase(), name, phone_number: phone },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(() => {

        router.push({
          pathname: '/me',
          query: { page: 'leads' },
        })
      }
      ).catch(error => {
        setPhoneErr(error.response.data.detail)
      }
      )

  }

  return (
    <Layout>
      <main>
        <div onSubmit={handleAddLead} className={styles.AuthFormContainer}>
          <form className={styles.AuthForm}>
            <div className={styles.AuthFormContent}>
              <h3 className={styles.AuthFormTitle}>Add Lead</h3>
              <div className="text-center">
              </div>

              <div className="form-group mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Lead Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Lead Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              {nameErr && <span className='error'> {nameErr} </span>}
              <div className="form-group mt-3">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Lead Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              {phoneErr && <span className='error'> {phoneErr} </span>}
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link className='btn btn-danger' href="/me">Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  )
}
