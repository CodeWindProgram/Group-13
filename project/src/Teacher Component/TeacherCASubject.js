import React from 'react'
import { TeacherCANav } from './Navs Component/TeacherCANav'
import { TeacherTableinfo } from './TeacherTableinfo'
import { useParams } from 'react-router'

export const TeacherCASubject = () => {
    const params = useParams();
    let tid = params.tid;
    return (
        <>
            <div>
                <TeacherCANav tid={tid} />
            </div>
            <h1 className="text-center my-3">Please Mark Attendance</h1>
            <div>
                <TeacherTableinfo />
            </div>
        </>
    )
}
