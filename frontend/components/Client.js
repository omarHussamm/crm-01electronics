import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Client({ client }) {
    const router = useRouter()

    const[err, setErr] = useState('')

    const handleRemoveClient = e => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/actions/removeclient`, { id: client.id },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {

                router.push({
                    pathname: '/me',
                    query: { page: "leads"},
                })
            }
            ).catch(() =>{
                setErr("You can't remove this client")
            })
    }

    const handleAddMeeting = e => {
        e.preventDefault()
        router.push({
            pathname: '/me/AddMeeting',
            query: { id: client.id },
        })

    }

    return (
        <div className="card mb-4 box-shadow">
            <div className="card-body">
                <div className="d-flex flex-md-row justify-content-between">
                    <p className="card-text">{client.name}</p>
                    <p className="card-text">ID: {client.id}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="card-text"><i className="bi bi-envelope"></i> {client.email}</p>
                    <p className="card-text"><i className="bi bi-telephone"></i> {client.phone_number}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={handleAddMeeting} type="button" className="btn btn-sm btn-primary">Schedule Meeting</button>
                    <button onClick={handleRemoveClient} type="button" className="btn btn-sm btn-danger">Remove</button>
                </div>
                {err &&<div className='text-danger mt-2'>{err}</div>}
            </div>
        </div>
    )
}
