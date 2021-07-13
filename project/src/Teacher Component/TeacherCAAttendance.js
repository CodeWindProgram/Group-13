import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TeacherCANav } from './Navs Component/TeacherCANav'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const TeacherCAAttendance = () => {
    const params = useParams();
    let tid = params.tid;
    const [students, StudentList] = useState([{}]);
    useEffect(teacherinfo, []);
    function teacherinfo() {
        fetch('http://localhost:3001/teacherCA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tid }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                StudentList(data);
            })
    }
    let tableStyle = {
        width: "100%",
        height: "700px",
    }

    for (let i = 0; i < students.length; i++) {
        students[i].present = parseFloat(students[i].present);
    }

    return (
        <div>
            <div>
                <TeacherCANav tid={tid} />
            </div>
            <div className="container" style={{ display: "block" }}>
                <h1 className="my-3 text-center">Attendance Report</h1>
                <div className="ag-theme-alpine" style={tableStyle} >
                    <AgGridReact rowData={students} defaultColDef={{ resizable: true }}>
                        <AgGridColumn headerName="Student ID" field="studid" sortable={true} width={200}></AgGridColumn>
                        <AgGridColumn headerName="Student Name" field="studname" width={230}></AgGridColumn>
                        <AgGridColumn headerName="Gender" field="gender" width={170}></AgGridColumn>
                        <AgGridColumn headerName="Current Year" field="year" width={170}></AgGridColumn>
                        <AgGridColumn headerName="Semester" field="sem" width={140}></AgGridColumn>
                        <AgGridColumn headerName="Program" field="progid" width={215}></AgGridColumn>
                        <AgGridColumn headerName="Precent Present" field="present" sortable={true} filter={true} width={150}></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
