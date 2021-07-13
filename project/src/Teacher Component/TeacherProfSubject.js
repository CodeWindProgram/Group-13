import React from 'react'
import { TeacherProfNav } from './Navs Component/TeacherProfNav'
import { TeacherTableinfo } from './TeacherTableinfo'

export const TeacherProfSubject = () => {
    return (
        <div>
            <div>
                <TeacherProfNav />
            </div>
            <h1 className="text-center my-3">Please Mark Attendance</h1>
            <div>
                <TeacherTableinfo />
            </div>
        </div>
    )
}
