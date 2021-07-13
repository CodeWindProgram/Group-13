import React from 'react'
import { TeacherHODNav } from './Navs Component/TeacherHODNav'
import { TeacherHOD } from './TeacherHOD'
import { TeacherSubjectInfo } from './TeacherSubjectInfo'


export const TeacherHODSubjectAttendance = () => {
    return (
        <div>
            <div>
                <TeacherHODNav />
            </div>
            <div>
                <TeacherSubjectInfo />
            </div>
        </div>
    )
}
