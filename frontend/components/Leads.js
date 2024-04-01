import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import Lead from './Lead';

export default function Leads() {

  const router = useRouter()

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllLeads()
      if (!res) {
        router.push("account/SignIn?tokenexpired=true")
      }
      setLeads(res)
    })()
  }, [])
  return (
    <>
      <div className='h1 text-center my-4'>Search for Leads</div>
      <div className="album py-5 bg-light text-center">
        <div className="container">

          <div className="row">
            {leads[0] && leads.map((leads) =>
              <div className="col-lg-4" id={leads.id}>
                <Lead lead={leads} />
              </div>
            )}
            {!leads[0] &&
              <div className='h3'>No leads for this search criteria</div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
async function getAllLeads() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actions/leads`, {
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