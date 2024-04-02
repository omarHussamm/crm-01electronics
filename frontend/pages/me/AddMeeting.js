import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import styles from "../../styles/SignInUp.module.css";
import Link from 'next/link';
import axios from 'axios';

export default function AddMeeting() {

  const router = useRouter()
  
  const [clientId, setClientId] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [duration, setDuration] = useState('')
  const [type, setType] = useState('Video')
  
  const [err, setErr] = useState('')
  
  useEffect(() => {
    setClientId(router.query.id ? router.query.id : '')
  }, [router.query])

  const handleAddMeeting = (e) => {
    e.preventDefault()
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/actions/meeting`, { client_id: clientId, date_time: dateTime, duration, type },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(() => {
        router.push({
          pathname: '/me',
          query: { page: 'clients' },
        })
      }
      ).catch(error => {
        setErr(error.response.data.detail)
      }
      )

  }

  return (
    <Layout>
      <main>
        <div onSubmit={handleAddMeeting} className={styles.AuthFormContainer}>
          <form className={styles.AuthForm}>
            <div className={styles.AuthFormContent}>
              <h3 className={styles.AuthFormTitle}>Schedule Meeting</h3>
              <div className="text-center">
              </div>

              <div className="form-group mt-3">
                <label>Client ID</label>
                <input
                  type="number"
                  className="form-control mt-1"
                  placeholder="Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"))}
                  className="form-control mt-1"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Duration in Minutes</label>
                <input
                  type="number"
                  min="10"
                  max="180"
                  className="form-control mt-1"
                  placeholder="Duration in Minutes"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Meeting Type</label>
                <select class="form-select" aria-label="Default select example" value={type} onChange={e => setType(e.target.value)}>
                  <option value="Video" selected>Video Meeting</option>
                  <option value="Phone">Phone Call</option>
                </select>
              </div>
              {err && <span className='error'> {err} </span>}
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link href={"/me"} className='btn btn-danger'>Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  )
}
