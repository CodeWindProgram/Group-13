'use strict';
import React from 'react'
import { useState, useEffect } from 'react'
import 'ag-grid-enterprise';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const TableSubject = ({ time, date, sem, actDay }) => {
    const [students, setStudents] = useState([]);
    const [studentList, setStudentList] = useState([]);
    useEffect(tableInfo, [time, date, sem]);
    useEffect(getStudentsList, [time, date, sem]);
    function tableInfo() {
        if (time !== '' && time !== "null" && (actDay !== 'SUNDAY' || actDay !== 'SATURDAY')) {
            setStudentList([]);
            time = parseInt(time);
            fetch('http://localhost:3001/teacher/subject/table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, time, sem }),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setStudents(data);
                })
        }
        else {
            setStudents([]);
            setStudentList([]);
        }
    }


    function getStudentsList() {
        if (sem !== '' && time !== '' && date !== '' && students.length === 0 && (actDay !== 'SUNDAY' || actDay !== 'SATURDAY')) {
            setStudents([]);
            fetch('http://localhost:3001/teacher/subject/studentsList', {
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
                    setStudentList(data);
                })
        }
        else {
            setStudentList([]);
            setStudents([]);
        }
    }

    let bttn = '';
    let heading = ''
    let StudentInsert = []
    if (time !== '' && students.length === 0) {
        heading = <p className="" style={{ border: "3px solid green ", padding: "5px", backgroundColor: "lightgreen", borderRadius: "5px" }}>Note: No records exists.. please insert the attendance</p>
        StudentInsert = []
        for (let i = 0; i < studentList.length; i++) {
            let studname = studentList[i].studname;
            let studid = studentList[i].studid;
            let status = "P";
            let OneRow = { studid, studname, status };
            StudentInsert.push(OneRow);
        }
        bttn = <button className="btn btn-outline-success" onClick={insertAttendance}>Insert ?</button>
    }
    else if (time !== '' && students.length !== 0) {
        StudentInsert = []
        heading = <p className="m-2" style={{ border: "3px solid red ", padding: "5px", backgroundColor: "#ff8585", borderRadius: "5px" }} className="">Note: Records Exists.. Do you want to update the records ?</p>
        for (let i = 0; i < students.length; i++) {
            let studname = students[i].studname;
            let studid = students[i].studid;
            let status = students[i].status;
            let OneRow = { studid, studname, status };
            StudentInsert.push(OneRow);
        }
        bttn = <button className="btn btn-outline-danger text-center" onClick={updateAttendance}>Update ?</button>
    }



    let tableStyle = {
        width: '100%',
        height: '500px',
    }

    function insertAttendance() {
        let finalInsert = [];
        let timing = parseInt(time);
        for (let i = 0; i < StudentInsert.length; i++) {
            let status = StudentInsert[i].status;
            let studid = StudentInsert[i].studid;
            let oneRow = { studid, status, date, timing };
            finalInsert.push(oneRow);
        }
        alert("Adding Attendance");
        fetch('http://localhost:3001/insertAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sem, finalInsert }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                alert(data);
            })
        setStudentList([]);
    }

    function updateAttendance() {
        let finalInsert = []
        let timing = parseInt(time);
        for (let i = 0; i < StudentInsert.length; i++) {
            let status = StudentInsert[i].status;
            let studid = StudentInsert[i].studid;
            let oneRow = { studid, status, date, timing };
            finalInsert.push(oneRow);
        }
        alert("Updating Attendance");
        fetch('http://localhost:3001/updateAttendance', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sem, finalInsert }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                alert(data);
            })
        setStudents([]);
        setStudentList([]);
    }


    return (

        <div>
            {heading}
            <div className="text-right mb-3" style={{ display: 'flex', justifyContent: 'right', alighItems: "right" }}>
                {bttn}
            </div>
            <div className="ag-theme-alpine" style={tableStyle} >
                <AgGridReact rowData={StudentInsert} >
                    <AgGridColumn field="studid" headerName="Student ID" sortable={true} width={500}></AgGridColumn>
                    <AgGridColumn field="studname" headerName="Student Name" width={500}></AgGridColumn>
                    <AgGridColumn field="status" editable={true} width={500} cellEditor="agRichSelectCellEditor" cellEditorParams={{ cellHeight: 50, values: ['P', 'A'] }} />
                </AgGridReact>
            </div>
        </div>
    )
}
