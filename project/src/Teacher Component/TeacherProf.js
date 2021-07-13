import React from 'react'
import { TeacherProfNav } from './Navs Component/TeacherProfNav'
import { TeacherInfo } from './TeacherInfo'

export const TeacherProf = () => {
    return (
        <div>
            <div>
                <TeacherProfNav />
            </div>
            <div className="container" style={{ display: "block" }}>
                <TeacherInfo />
            </div>
        </div>
    )
}