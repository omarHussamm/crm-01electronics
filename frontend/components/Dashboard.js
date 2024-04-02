import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import Client from './Client';
import Link from 'next/link';

export default function Dashboard({ user }) {
  const router = useRouter()

  const [clients, setClients] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getMyClients()
      if (!res) {
        router.push("account/SignIn?tokenexpired=true")
      }
      setClients(res)
    })()
  }, [])

  return (
    <div>
      <section className="jumbotron text-center mt-4">
        <div className="container">
          <h1 className="jumbotron-heading">{user.name}'s Dashboard</h1>
          <p className="lead text-muted">welcome back!</p>
          <p>
            <Link href="/me/AddClient" className="btn btn-primary m-3 mt-2">Add Client</Link>
            <Link href="/me/AddLead" className="btn btn-primary m-3 mt-2">Add Lead</Link>
            <Link href="/me/AddMeeting" className="btn btn-primary m-3 mt-2">Schedule Meeting</Link>
          </p>
        </div>
      </section>

      <div className="album py-5 bg-light text-center">
        <div className='h3 mb-4'>Your Clients</div>
        <div className="container">

          <div className="row">
            {clients[0] && clients.map((client) =>
              <div className="col-lg-4" key={client.id}>
                <Client client={client} />
              </div>
            )}
            {!clients[0] &&
              <div className='h3'>You don't have any clients</div>
            }
          </div>
        </div>
      </div>
    </div>

  )
}


async function getMyClients() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actions/myclients`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    const data = response.data;
    return data;
  } catch {
    return ''

  }
}