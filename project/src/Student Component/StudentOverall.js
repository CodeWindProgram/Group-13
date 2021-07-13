import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

export const StudentOverall = ({ sem }) => {
    const params = useParams();
    const id = params.studid;
    const [attendance, setAttendance] = useState([]);
    useEffect(attendanceInfo, [id, sem]);
    function attendanceInfo() {
        if (sem !== '') {
            fetch('http://localhost:3001/student/overallAttendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, sem }),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setAttendance(data);
                })
        }
    }
    return (<div>
        <h2 style={{ marginTop: "50px" }}>
            Attendance Report
        </h2>
        <hr />
        <table className="display-2" style={{ width: "100%", textAlign: "center", marginBottom: "50px" }}>
            <thead>
                <tr>
                    <th>Present</th>
                    <th>Total</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>

                        {attendance.present}
                    </td>
                    <td>
                        {attendance.total}
                    </td>
                    <td>
                        {attendance.percentage} %
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}
