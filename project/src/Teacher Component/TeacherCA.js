import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TeacherCANav } from './Navs Component/TeacherCANav'
import { TeacherInfo } from './TeacherInfo'

export const TeacherCA = () => {
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
        <>
            <div>
                <TeacherCANav tid={tid} />
            </div>
            <div className="container" style={{ display: "block" }}>
                <div>
                    <TeacherInfo />
                </div>
            </div>
        </>
    )
}
