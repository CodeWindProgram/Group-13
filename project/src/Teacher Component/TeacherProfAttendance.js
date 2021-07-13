import React from 'react'
import { TeacherProfNav } from './Navs Component/TeacherProfNav'
import { TeacherSubjectInfo } from './TeacherSubjectInfo'

export const TeacherProfAttendance = () => {
    return (
        <div>
            <div>
                <TeacherProfNav />
            </div>
            <div>
                <TeacherSubjectInfo />
            </div>
        </div>
    )
}
