import React from 'react'
import { StudentLect } from './StudentLect'
import { StudentOverall } from './StudentOverall'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

export const Student = () => {
    // function studentInfo() {
    // const sem = student.progid;
    // let content1 = '';
    // let content2 = '';
    // console.log(sem);
    // if (sem !== '') {
    //     content1 = <StudentOverall sem={sem} />
    //     content2 = <StudentLect sem={sem} />
    // }
    const params = useParams();
    const id = params.studid;
    const [student, setStudent] = useState('');
    const [sem, setSem] = useState('');
    useEffect(() => {
        fetch('http://localhost:3001/student/info', {
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
                setStudent(data);
                setSem(data.progid);
            })
    }, []);
    return (
        <div className="container" style={{ display: "block" }}>
            <h1 className="text-center my-3">Welcome {student.studname}</h1>
            <div className="details" style={{ alighItems: "center" }}>
                <h2>Details: </h2>
                <hr />
                <table className="table">
                    <tr>
                        <td className="my-5">Name: {student.studname}</td>
                        <td className="my-5">Programe: {student.progid}</td>
                    </tr>
                    <tr className="text-right">
                        <td className="my-5">Gender: {student.gender}</td>
                        <td className="my-5">year: {student.year} </td>
                    </tr>
                </table>
            </div>
            <div>
                <StudentOverall sem={sem} />
            </div>
            <div>
                <StudentLect sem={sem} />
            </div>
        </div>
    )
}
