import React from 'react'
import { TeacherHODNav } from './Navs Component/TeacherHODNav'
import { TeacherTableinfo } from './TeacherTableinfo'

export const TeacherHODSubject = () => {
    return (
        <div>
            <div>
                <TeacherHODNav />
            </div>
            <h1 className="text-center my-3">Please Mark Attendance</h1>
            <div>
                <TeacherTableinfo />
            </div>
        </div>
    )
}
