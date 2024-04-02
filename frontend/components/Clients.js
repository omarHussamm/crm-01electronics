import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import Meeting from './Meeting';
import Client from './Client';

export default function Clients() {

  const router = useRouter()

  const [meeting, setMeetings] = useState([]);
  const [query, setQuery] = useState('')
  const [clients, setClients] = useState([])

  useEffect(() => {
    (async () => {
      const res = await getMyMeetings()
      if (!res) {
        router.push("account/SignIn?tokenexpired=true")
      }
      setMeetings(res)
    })()
  }, [])

  useEffect(() => {
    if (query.trimStart()) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actions/search/clients/${query}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(response => {
        setClients(response.data)
      })
    } else {
      setClients([])
    }
  }, [query])

  return (
    <>
      <div className="album py-5 bg-light text-center">
        <div className='h1'>Your Meetings</div>
        <div className="container">

          <div className="row">
            {meeting[0] && meeting.map((meeting) =>
              <div className="col-lg-4" key={meeting.id}>
                <Meeting meeting={meeting} />
              </div>
            )}
            {!meeting[0] &&
              <div className='h3'>You don't have any Meetings</div>
            }
          </div>
        </div>
      </div>
      <section className="jumbotron text-center mt-4">
        <div className="container">
          <h1 className="jumbotron-heading">Search All Clients</h1>
          <div className="album py-5 container bg-light">

            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Search by Client Id or Name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>

            <div className="row my-4">
              {clients[0] && clients.map((client) =>
                <div className="col-lg-4" key={client.id}>
                  <Client client={client} />
                </div>
              )}
              {!clients[0] &&
                <div className='h3'>No Clients for this search criteria</div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

async function getMyMeetings() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actions/mymeetings`, {
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