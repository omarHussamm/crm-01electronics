import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Lead({ lead }) {

    const router = useRouter()

    const handleAddToClients = e => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/actions/addclient`, { id: lead.id },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {

                router.push({
                    pathname: '/me',
                })
            }
            )
    }
    return (
        <div className="card mb-4 box-shadow">
            <div className="card-body">
                <div className="d-flex flex-md-row justify-content-between">
                    <p className="card-text">{lead.name}</p>
                    <p className="card-text">ID: {lead.id}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="card-text"><i class="bi bi-envelope"></i> {lead.email}</p>
                    <p className="card-text"><i class="bi bi-telephone"></i> {lead.phone_number}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" onClick={handleAddToClients} className="btn btn-sm btn-primary">Add to clients</button>
                </div>
            </div>
        </div>
    )
}
