import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import Meeting from './Meeting';

export default function Clients() {

  const router = useRouter()

  const [meeting, setMeetings] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getMyMeetings()
      if (!res) {
        router.push("account/SignIn?tokenexpired=true")
      }
      setMeetings(res)
    })()
  }, [])

  return (
    <>
      <div className="album py-5 bg-light text-center">
        <div className='h1'>Your Meetings</div>
        <div className="container">

          <div className="row">
            {meeting[0] && meeting.map((meeting) =>
              <div className="col-lg-4" id={meeting.id}>
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