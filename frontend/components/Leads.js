import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"
import Lead from './Lead';

export default function Leads() {

  const router = useRouter()

  const [leads, setLeads] = useState([]);
  const [query, setQuery] = useState('')

  useEffect(() => {
    (async () => {
      const res = await getAllLeads()
      if (!res) {
        router.push("account/SignIn?tokenexpired=true")
      }
      setLeads(res)
    })()
  }, [])

  useEffect(() => {
    if (query.trimStart()) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actions/search/leads/851568284`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(response => {
        setLeads(response.data)
      })
    } else {
      getAllLeads().then(data => setLeads(data))

    }
  }, [query])

  return (
    <>
      <div className='h1 text-center my-4'>Search for Leads</div>
      <div className="album py-5 bg-light text-center">
        <div className="container">
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

          <div className="row mt-5">
            {leads[0] && leads.map((leads) =>
              <div className="col-lg-4" key={leads.id}>
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