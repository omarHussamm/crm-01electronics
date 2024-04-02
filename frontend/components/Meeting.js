import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

export default function Meeting({ meeting }) {

    const router = useRouter()

    const handleRemoveMeeting = e => {
        e.preventDefault()

        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/actions/meeting/${meeting.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {

                router.reload()
            }
            )

    }

    const dateConverter = date_time => {
        const [date, time] = date_time.split('T')
        const timeArray = time.split(':')
        const hour = timeArray[0] % 12
        const midnight = timeArray[0] >= 12 ? 'pm' : 'am'
        return date + ' ' + hour + ":" + timeArray[1] + " " + midnight
    }
    return (
        <div className="card mb-4 box-shadow">
            <div className="card-body">
                <div className="d-flex flex-md-row justify-content-between">
                    <p className="card-text">{meeting.type} Meeting</p>
                    <p className="card-text">Client ID: {meeting.client_id}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="card-text"><i className="bi bi-calendar-event"></i> {dateConverter(meeting.date_time)}</p>
                    <p className="card-text"><i className="bi bi-clock"></i> {meeting.duration} minutes</p>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" onClick={handleRemoveMeeting} className="btn btn-sm btn-danger">Remove Meeting</button>
                </div>
            </div>
        </div>
    )
}
