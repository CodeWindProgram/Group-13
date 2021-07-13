import React from 'react'
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const Admin = () => {
    const [sem, setSem] = useState('BE-SEM7-C-COMP');
    const [subjectData, setSubjectData] = useState();
    const [Load, setLoad] = useState(true);
    const [teachers, setTeachers] = useState([]);
    let subjects = []
    let percent = []

    useEffect(() => {
        setLoad(true);
    }, [sem])
    useEffect(() => {
        if (Load) {
            fetch('http://localhost:3001/charts/subject', {
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
                    console.log(data, "this is subdata");
                    setLoad(false);
                    setSubjectData(data);
                })
        }
    }, [Load])
    useEffect(() => {
        if (Load) {
            fetch('http://localhost:3001/admin/teachers', {
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
                    setLoad(false);
                    setTeachers(data)
                })
        }
    }, [Load])
    if (subjectData) {
        for (let i = 0; i < subjectData.length; i++) {
            subjects.push(subjectData[i].subname);
            percent.push(parseFloat(subjectData[i].present));
        }
    }
    console.log(teachers)
    const state = {
        labels: subjects,
        datasets: [{
            label: '% wise Attendance of Subjects',
            data: percent,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    let tableStyle = {
        width: '100%',
        height: '310px',
        marginBottom: '30px',
        marginTop: '30px'
    }
    return (
        <div>
            <div className="container" style={{ display: "block" }}>
                <h1 className="text-center my-4">This is Admin</h1>
                <select className="form-select my-4" name="semester" onChange={(e) => { setSem(e.target.value) }}>
                    <option value="BE-SEM7-C-COMP">BE-SEM7-C-COMP</option>
                    <option value="TE-SEM5-C-COMP">TE-SEM5-C-COMP</option>
                    <option value="SE-SEM3-C-COMP">SE-SEM3-C-COMP</option>
                </select>
                <h1>Avg Attendance of Students in Subjects</h1>
                <hr />
                <Bar
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                            },
                            x: {
                                display: false,
                            }
                        }
                    }}
                    width={100}
                    height={40}
                />
                <div>
                    <h1 style={{ marginTop: '30px' }}>Teachers Details</h1>
                    <hr />
                    <div className="ag-theme-alpine" style={tableStyle} >
                        <AgGridReact rowData={teachers} >
                            <AgGridColumn field="tname" headerName="Teacher Name" sortable={true} width={250}></AgGridColumn>
                            <AgGridColumn field="subname" headerName="Subject" width={300}></AgGridColumn>
                            <AgGridColumn field="post" headerName="Post" width={250}></AgGridColumn>
                            <AgGridColumn field="gender" headerName="Gender" width={200}></AgGridColumn>
                            <AgGridColumn field="mail" headerName="Mail ID" width={250}></AgGridColumn>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
    )
}