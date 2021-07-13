import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const StudentLect = ({ sem }) => {
    const params = useParams();
    const id = params.studid;
    const [attendance, setAttendance] = useState([]);
    useEffect(attendanceInfo, [id, sem]);
    function attendanceInfo() {
        if (sem !== '') {
            fetch('http://localhost:3001/student/subjectAttendance', {
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
    for (let i = 0; i < attendance.length; i++) {
        attendance[i].present = parseFloat(attendance[i].present);
    }
    let tableStyle = {
        width: "100%",
        height: "303px",
        marginBottom: "50px",
    }
    return (
        <div>
            <h2>Subject wise attendance</h2>
            <hr />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            </button>
            <div className="ag-theme-alpine" style={tableStyle} >
                <AgGridReact rowData={attendance} >
                    <AgGridColumn width={420} field="studid" sortable={true}></AgGridColumn>
                    <AgGridColumn width={470} field="subname"></AgGridColumn>
                    <AgGridColumn width={390} field="present" sortable={true}></AgGridColumn>
                </AgGridReact>
            </div>
        </div>
    )
}
