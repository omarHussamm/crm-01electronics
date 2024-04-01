import React from 'react'

export default function Meeting({ meeting }) {

    const dateConverter = date_time => {
        const[date, time] = date_time.split('T')
        const timeArray = time.split(':')
        const hour = timeArray[0]%12
        const midnight = timeArray[0]>=12?'pm':'am'
        return date + ' ' + hour +":"+ timeArray[1]+ " " + midnight
    }
    return (
        <div className="card mb-4 box-shadow">
            <div className="card-body">
                <div className="d-flex flex-md-row justify-content-between">
                    <p className="card-text">{meeting.type} Meeting</p>
                    <p className="card-text">Client ID: {meeting.client_id}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="card-text"><i class="bi bi-calendar-event"></i> {dateConverter(meeting.date_time)}</p>
                    <p className="card-text"><i class="bi bi-clock"></i> {meeting.duration} minutes</p>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-sm btn-danger">Remove Meeting</button>
                </div>
            </div>
        </div>
    )
}
