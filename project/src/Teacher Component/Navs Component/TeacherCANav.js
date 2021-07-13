import React from 'react'
import { Link } from 'react-router-dom'


export const TeacherCANav = ({ tid }) => {
    let link = "/teachers/CA/" + tid
    let AttendenceLink = "/teachers/CA/" + tid + "/attendance";
    let SubjectLink = "/teachers/CA/" + tid + "/subjectAttendance";
    let AttendenceEdit = "/teachers/CA/" + tid + "/editAttendance";
    let subjectAttendance = "/teachers/CA/" + tid + "/subjectWise";
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={link}><i className="fas fa-chalkboard-teacher"></i>Class Advisor</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to={link}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={AttendenceLink}>Class Attendance Report</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={SubjectLink}>Mark Attendance</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={subjectAttendance} >Subject Wise Attendance</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" >Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
