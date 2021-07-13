import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const TeacherInfo = () => {
    const params = useParams();
    const [teacher, setTeacher] = useState([]);
    let tid = params.tid;
    useEffect(teacherinfo, []);
    function teacherinfo() {
        fetch('http://localhost:3001/teacher', {
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
                setTeacher(data);
            })
    }
    return (
        <div className="container" style={{ display: 'block' }}>
            <h1 className="my-4">Details</h1>
            <hr />
            <table style={{ width: "100%" }}>
                <tr>
                    <td>
                        <h5>ID: {teacher.tid}</h5>
                    </td>
                    <td>
                        <h5>Name: {teacher.tname}</h5>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5>Gender: {teacher.gender}</h5>
                    </td>
                    <td>
                        <h5>Post: {teacher.post}</h5>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5>Phone: {teacher.phone}</h5>
                    </td>
                    <td>
                        <h5>Mail: {teacher.mail}</h5>
                    </td>
                </tr>
            </table>
        </div>
    )
}
