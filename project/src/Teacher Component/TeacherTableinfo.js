import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { TableSubject } from './TableSubject'


export const TeacherTableinfo = () => {
    let lectures = []
    let timing = []
    const params = useParams();
    let tid = params.tid;
    const [sem, setSem] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [timeVal, setTimeVal] = useState('');
    const [lect, setLecture] = useState('');
    const [actDay, setActDay] = useState('');
    const [date, setDate] = useState('');
    useEffect(subjectInfo, [sem]);
    useEffect(timingInfo, [sem, lect, date]);
    function subjectInfo() {
        setTimeVal('');
        fetch('http://localhost:3001/teacher/subject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tid, sem }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setSubject(data);
            })
    }

    function setActDayVal(date) {
        let day = date.split("-")
        let year = day[0];
        let month = day[1];
        let currdate = day[2];
        const weekday = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        setActDay(weekday[new Date(month + "/" + currdate + "/" + year).getDay()]);
    }

    function timingInfo() {
        setTimeVal('');
        fetch('http://localhost:3001/teacher/subject/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sem, actDay, lect }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTimeVal(data);
            })
    }

    if (subject !== null) {
        for (let i = 0; i < subject.length; i++) {
            let oneSub = <option value={subject[i].subid} key={subject[i].subid}>{subject[i].subname}</option>
            lectures.push(oneSub);
        }
    }

    if (timeVal !== null) {
        for (let i = 0; i < timeVal.length; i++) {
            let oneTime = <option value={timeVal[i].ttid} key={i}>{timeVal[i].timing}</option>
            timing.push(oneTime);
        }
    }
    return (
        <>
            <div className="container" style={{ display: "block" }}>
                <div className="my-4">
                    <div>
                        <select className="form-select my-2 " name="semister" onChange={(e) => { setSem(e.target.value) }} >
                            <option value="null">--null--</option>
                            <option value="BE-SEM7-C-COMP">BE-SEM7-C-COMP</option>
                            <option value="TE-SEM5-C-COMP">TE-SEM5-C-COMP</option>
                            <option value="SE-SEM3-C-COMP">SE-SEM3-C-COMP</option>
                        </select>
                    </div>
                    <div>
                        <input style={{ width: "100%", border: "1px solid #dbdbdb", borderRadius: "3px" }} className="py-1 px-2" type="date" placeholder="dd:mm:yy" onChange={(e) => { setDate(e.target.value); setActDayVal(e.target.value) }} />
                    </div>
                    <div>
                        <select className="form-select my-2 " name="lecture" onChange={(e) => { setLecture(e.target.value) }}>
                            <option value="null">--null--</option>
                            {lectures}
                        </select>
                    </div>
                    <div>
                        <select className="form-select my-2 " name="timing" onChange={(e) => { setTime(e.target.value) }}>
                            <option value="null">--null--</option>
                            {timing}
                        </select>
                    </div>
                </div>
                <div>
                    <TableSubject date={date} time={time} sem={sem} actDay={actDay} />
                </div>
            </div>
        </>
    )
}
