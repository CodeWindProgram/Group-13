import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const TeacherHODNav = () => {
    const params = useParams();
    let tid = params.tid;
    let link = "/teachers/HOD/" + tid
    let AttendenceLink = "/teachers/HOD/" + tid + "/attendance";
    let SubjectLink = "/teachers/HOD/" + tid + "/subjectAttendance";
    let subjectAttendance = "/teachers/HOD/" + tid + "/subjectWise";
    return (
        <div>
            <div className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={link}><i className="fas fa-chalkboard-teacher"></i>Head Of Department</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to={link}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={AttendenceLink}>Dept Attendance Report</Link>
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
        </div>
    )
}
