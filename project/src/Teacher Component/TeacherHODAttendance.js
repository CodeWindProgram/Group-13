import React from 'react'
import { useState, useEffect } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { TeacherHODNav } from './Navs Component/TeacherHODNav';
import { TeacherSubjectInfo } from './TeacherSubjectInfo';

export const TeacherHODAttendance = () => {
    const [students, setStudents] = useState([]);
    const [sem, setSem] = useState('BE-SEM7-C-COMP');
    useEffect(studentInfo, [sem]);
    function studentInfo() {
        fetch('http://localhost:3001/studentsAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sem }),
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
        height: "500px",
    }
    return (
        <div>
            <div>
                <TeacherHODNav />
            </div>
            <div className="container" style={{ display: "block" }}>
                <h1 className="text-center my-3">Program Wise Attendance</h1>
                <select className="form-select my-3" name="semister" id="" onChange={(e) => { setSem(e.target.value) }}>
                    <option value="BE-SEM7-C-COMP">BE-SEM7-C-COMP</option>
                    <option value="TE-SEM5-C-COMP">TE-SEM5-C-COMP</option>
                    <option value="SE-SEM3-C-COMP">SE-SEM3-C-COMP</option>
                </select>
                <h3 className="text-center my-3">Overall Attendance of Students</h3>
                <div className="ag-theme-alpine" style={tableStyle} >
                    <AgGridReact rowData={students}>
                        <AgGridColumn headerName="Student ID" field="studid" sortable={true}></AgGridColumn>
                        <AgGridColumn headerName="Student Name" field="studname"></AgGridColumn>
                        <AgGridColumn field="gender" width={175}></AgGridColumn>
                        <AgGridColumn field="year" ></AgGridColumn>
                        <AgGridColumn headerName="Semester" field="sem" width={150} ></AgGridColumn>
                        <AgGridColumn headerName="Program Name" field="progid" ></AgGridColumn>
                        <AgGridColumn field="present" width={150} sortable={true}></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}