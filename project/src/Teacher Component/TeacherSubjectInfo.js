import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const TeacherSubjectInfo = () => {
    const params = useParams();
    let tid = params.tid;
    const [sem, setSem] = useState('BE-SEM7-C-COMP');
    const [students, setStudents] = useState([])
    useEffect(lectinfo, [sem]);
    function lectinfo() {
        fetch('http://localhost:3001/subAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tid, sem }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setStudents(data);
            })
    }

    for (let i = 0; i < students.length; i++) {
        students[i].present = parseFloat(students[i].present);
    }


    let tableStyle = {
        width: "100%",
        height: "683px",
    }

    return (
        <div className="container" style={{ display: "block" }}>
            <select className="form-select my-3" name="semister" onChange={(e) => { setSem(e.target.value) }}>
                <option value="BE-SEM7-C-COMP">BE-SEM7-C-COMP</option>
                <option value="TE-SEM5-C-COMP">TE-SEM5-C-COMP</option>
                <option value="SE-SEM3-C-COMP">SE-SEM3-C-COMP</option>
            </select>
            <div className="my-3 text-center">
                <h1>This is the subject wise Attendance.</h1>
            </div>
            <div className="ag-theme-alpine" style={tableStyle} >
                <AgGridReact rowData={students}>
                    <AgGridColumn headerName="Student ID" field="studid" width={240} sortable={true}></AgGridColumn>
                    <AgGridColumn headerName="Student Name" field="studname" width={250}></AgGridColumn>
                    <AgGridColumn field="gender" width={180}></AgGridColumn>
                    <AgGridColumn headerName="Subject Name" field="subname" width={370} filter={true}></AgGridColumn>
                    <AgGridColumn headerName="Percentage Attendance" field="present" width={230} sortable={true}></AgGridColumn>
                </AgGridReact>
            </div>
        </div>
    )
}
