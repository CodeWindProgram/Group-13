import React from 'react'
import { TeacherHODNav } from './Navs Component/TeacherHODNav'
import { TeacherInfo } from './TeacherInfo'


export const TeacherHOD = () => {
    return (
        <div>
            <div>
                <TeacherHODNav />
            </div>
            <div>
                <TeacherInfo />
            </div>
        </div>
    )
}
