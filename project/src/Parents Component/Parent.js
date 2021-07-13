import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import 'ag-grid-enterprise';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const Parent = () => {
    const params = useParams();
    const id = params.pid;
    const [student, setStudent] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [master, setMasterDetails] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/parent/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setIsLoad(false);
                setStudent(data);
            })
    }, [id])
    console.log(student, "this is student");
    useEffect(() => {
        async function processSingleStudent() {
            if (!isLoad && student.length) {
                const promises = student.map(async student => {
                    let sem = student.progid;
                    let id = student.studid;
                    const response = await fetch('http://localhost:3001/parent/student', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id, sem }),
                    })
                    const data = await response.json()
                    const studentData = { ...data, percentage: parseFloat(data.percentage) }
                    return studentData
                })
                const promiseResult = await Promise.all(promises);
                setStudentList(promiseResult);
            }
        }
        processSingleStudent();
    }, [student, isLoad]);
    async function fetchMasterDetails() {
        if (!isLoad && student.length) {
            const promises = student.map(async student => {
                let sem = student.progid;
                let id = student.studid;
                const response = await fetch('http://localhost:3001/student/subjectAttendance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, sem }),
                })
                const data = await response.json()
                // const masterData = { ...data, present: parseFloat(data.present) }
                console.log(data);
                return data
            })
            const promiseResult = await Promise.all(promises);
            setMasterDetails(promiseResult);
        }
    }
    let tableStyle = {
        width: "100%",
        height: "500px",
    }
    return (
        <div>
            <div className="container" style={{ display: "block" }}>
                <h1 className="text-center my-5">Welcome Parent</h1>
                <div className="ag-theme-alpine" style={tableStyle} >
                    <AgGridReact rowData={studentList} masterDetail={true} detailRowHeight={450}
                        defaultColDef={{ flex: 1 }}
                        detailCellRendererParams={{
                            detailGridOptions: {
                                rowSelection: 'multiple',
                                suppressRowClickSelection: true,
                                enableRangeSelection: true,
                                pagination: true,
                                paginationAutoPageSize: true,
                                columnDefs: [
                                    { field: "studid" },
                                    { field: "subname" },
                                    { field: "present" }
                                ],
                                defaultColDef: {
                                    sortable: true,
                                    flex: 1,
                                }
                            },
                            getDetailRowData: async function (params) {
                                let id = params.data.studid;
                                let sem = params.data.progid;
                                const response = await fetch('http://localhost:3001/student/subjectAttendance', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ id, sem }),
                                })
                                const data = await response.json();
                                params.successCallback(data);
                            }
                        }}>
                        <AgGridColumn field="studid" cellRenderer="agGroupCellRenderer" sortable={true}></AgGridColumn>
                        <AgGridColumn field="studname"></AgGridColumn>
                        <AgGridColumn field="gender"></AgGridColumn>
                        <AgGridColumn field="year" ></AgGridColumn>
                        <AgGridColumn field="progid" ></AgGridColumn>
                        <AgGridColumn field="percentage" sortable={true}></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
