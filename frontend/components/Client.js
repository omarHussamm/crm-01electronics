import React from 'react'

export default function Client({ client }) {
    return (
        <div className="card mb-4 box-shadow">
            <div className="card-body">
                <div className="d-flex flex-md-row justify-content-between">
                    <p className="card-text">{client.name}</p>
                    <p className="card-text">ID: {client.id}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="card-text"><i class="bi bi-envelope"></i> {client.email}</p>
                    <p className="card-text"><i class="bi bi-telephone"></i> {client.phone_number}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-sm btn-primary">Schedule Meeting</button>
                    <button type="button" className="btn btn-sm btn-danger">Remove</button>
                </div>
            </div>
        </div>
    )
}
