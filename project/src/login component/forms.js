import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles/forms.css'

export const Forms = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    // const [teachers, setTeachers] = useState("");
    const [entity, setEntity] = useState("teachers");
    function getEntity(e) {
        e.preventDefault();
        fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, entity }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (entity === 'teachers') {
                    if (data.post === "PROFESSOR" || data.post === "ASSISTANT PROFESSOR") {
                        return history.push(`/teachers/LECTURER/${data.tid}`);
                    }
                    else if (data.post === "HOD") {
                        return history.push(`/teachers/HOD/${data.tid}`);
                    }
                    else if (data.post === "CLASS ADVISOR") {
                        return history.push(`teachers/CA/${data.tid}`);
                    }
                }
                else if (entity === "students") {
                    return history.push(`${entity}/${data.studid}`);
                }
                else if (entity === "parents") {
                    return history.push(`${entity}/${data.pid}`)
                }
                else if (entity === "admin" && username === "admin") {
                    return history.push(`${entity}`)
                }
            })
            .catch(err => {
                history.push(`/notfound`)
            });
    }
    return (
        <div>
            <div className="mydiv">
                <form>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">User ID</label>
                        <input type="text" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setUsername(e.target.value) }} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <select name="entity" className="form-select" onChange={(e) => { setEntity(e.target.value) }}  >
                        <option value="teachers">Teacher</option>
                        <option value="students">Student</option>
                        <option value="admin">Admin</option>
                        <option value="parents">parents</option>
                    </select>
                    <button className="btn btn-primary forms-button" onClick={getEntity}>Submit</button>
                </form>
            </div >
            <div style={{ marginTop: 50 }}>
                <div className="information">
                    <p><span>T-1 : </span> Teacher Class Advisor</p>
                    <p><span>T-2 : </span> Teacher Professor</p>
                    <p><span>T-4 : </span> Teacher hod </p>
                    <p><span>TUS3F181940 : </span> Student</p>
                    <p><span>P-8 : </span> Parents</p>
                </div>
            </div>
        </div>

    )
}