import React from 'react'
import { TeacherCANav } from './Navs Component/TeacherCANav'
import { TeacherSubjectInfo } from './TeacherSubjectInfo'

export const TeacherCASubjectInfo = () => {
    return (
        <div>
            <div>
                <TeacherCANav />
            </div>
            <div>
                <TeacherSubjectInfo />
            </div>
        </div>
    )
}
