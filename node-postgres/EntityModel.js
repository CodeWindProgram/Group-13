const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Attendenc Module',
    password: 'adnan',
    port: 5432,
});

const getSingleEntity = ({ username, entity }) => {
    return new Promise(function (resolve, reject) {
        if (entity === "teachers") {
            pool.query(`select * from teachers where tid = '${username}'`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows[0]);
            })
        }
        else if (entity === "students") {
            pool.query(`select * from students where studid = '${username}'`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows[0]);
            })
        }
        else if (entity === "parents") {
            pool.query(`select * from parents where pid = '${username}'`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows[0]);
            })
        }
        else if (entity === "admin") {
            pool.query(`select * from principal`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
            })
        }
    })
}


const getSingleTeacher = ({ tid }) => {
    return new Promise(function (resolve, reject) {
        pool.query(`select * from teachers where tid = '${tid}' `, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        })
    })
}


// , gender, year, sem,
const getStudentsCA = ({ tid }) => {
    return new Promise(function (resolve, reject) {
        if (tid === 'T-1') {
            pool.query(`select a.studid ,  s.studname , s.year , s.sem, s.progid, s.gender ,
                        ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
                        from attendance_sem7 a, students s where a.studid = s.studid group by a.studid , s.studname, s.year , s.sem , s.progid, s.gender
                        order by studid asc ;`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
        else if (tid === 'T-5') {
            pool.query(`select a.studid ,  s.studname , s.year , s.sem, s.progid, s.gender ,
                        ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
                        from attendance_sem5 a, students s where a.studid = s.studid group by a.studid , s.studname, s.year , s.sem , s.progid, s.gender
                        order by studid asc ;`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
        else if (tid === 'T-6') {
            pool.query(`select a.studid ,  s.studname , s.year , s.sem, s.progid, s.gender ,
                        ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
                        from attendance_sem3 a, students s where a.studid = s.studid group by a.studid , s.studname, s.year , s.sem , s.progid, s.gender
                        order by studid asc ;`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
    })
}

const getTeacherSubject = ({ tid, sem }) => {
    return new Promise(function (resolve, reject) {
        pool.query(`select s.subid,s.subname from subjects s where s.progid = '${sem}' and s.lectid = '${tid}' `, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const getTeacherSubjectAttendance = ({ sem, actDay, lect }) => {
    return new Promise(function (resolve, reject) {
        if (sem === "BE-SEM7-C-COMP") {
            pool.query(`select ttid,timing from TTSEM7 where subid = '${lect}' and day = '${actDay}'`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
        else if (sem === "TE-SEM5-C-COMP") {
            pool.query(`select ttid,timing from TTSEM5 where subid = '${lect}' and day = '${actDay}'`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
        else if (sem === "SE-SEM3-C-COMP") {
            pool.query(`select ttid, timing from TTSEM3 where subid = '${lect}' and day = '${actDay}'`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }

    })
}


const getTeacherSubjectTable = ({ date, time, sem }) => {
    return new Promise(function (resolve, reject) {
        if (sem === 'BE-SEM7-C-COMP') {
            pool.query(`select a.studid , s.studname, a.status from attendance_sem7 a , students s where cldate = '${date}'  and ttid = ${time} and a.studid = s.studid order by a.studid`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
        else if (sem === 'TE-SEM5-C-COMP') {
            pool.query(`select a.studid , s.studname, a.status from attendance_sem5 a , students s where cldate = '${date}'  and ttid = ${time} and a.studid = s.studid order by a.studid`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
        else if (sem === 'SE-SEM3-C-COMP') {
            pool.query(`select a.studid , s.studname, a.status from attendance_sem3 a , students s where cldate = '${date}'  and ttid = ${time} and a.studid = s.studid order by a.studid`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
    })
}

const getTeacherStudentList = ({ sem }) => {
    return new Promise(function (resolve, reject) {
        pool.query(`select studid , studname from students where progid =  '${sem}' order by studid`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const insertAttendance = ({ finalInsert, sem }) => {
    return new Promise(function (resolve, reject) {
        if (sem === 'BE-SEM7-C-COMP') {
            for (let i = 0; i < finalInsert.length; i++) {
                let studid = finalInsert[i].studid
                let status = finalInsert[i].status
                let date = finalInsert[i].date
                let timing = finalInsert[i].timing
                pool.query(`INSERT INTO ATTENDANCE_SEM7 (STUDID , CLDATE, STATUS , TTID) VALUES ('${studid}' , '${date}' , '${status}' , ${timing});`, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve('students attendance added');
                })
            }
        }
        else if (sem === 'TE-SEM5-C-COMP') {
            for (let i = 0; i < finalInsert.length; i++) {
                let studid = finalInsert[i].studid
                let status = finalInsert[i].status
                let date = finalInsert[i].date
                let timing = finalInsert[i].timing
                pool.query(`INSERT INTO ATTENDANCE_SEM5 (STUDID , CLDATE, STATUS , TTID) VALUES ('${studid}' , '${date}' , '${status}' , ${timing});`, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve('students attendance added');
                })
            }
        }
        else if (sem === 'SE-SEM3-C-COMP') {
            for (let i = 0; i < finalInsert.length; i++) {
                let studid = finalInsert[i].studid
                let status = finalInsert[i].status
                let date = finalInsert[i].date
                let timing = finalInsert[i].timing
                pool.query(`INSERT INTO ATTENDANCE_SEM3 (STUDID , CLDATE, STATUS , TTID) VALUES ('${studid}' , '${date}' , '${status}' , ${timing});`, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve('students attendance added');
                })
            }
        }

    })
}

const updateAttendance = ({ finalInsert, sem }) => {
    return new Promise(function (resolve, reject) {
        if (sem === 'BE-SEM7-C-COMP') {
            for (let i = 0; i < finalInsert.length; i++) {
                let studid = finalInsert[i].studid
                let status = finalInsert[i].status
                let date = finalInsert[i].date
                let timing = finalInsert[i].timing
                pool.query(`UPDATE ATTENDANCE_SEM7 SET STATUS = '${status}' WHERE studid = '${studid}' and cldate = '${date}' and ttid = ${timing} ;`, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve('students attendance added');
                })
            }
        }
        else if (sem === 'TE-SEM5-C-COMP') {
            for (let i = 0; i < finalInsert.length; i++) {
                let studid = finalInsert[i].studid
                let status = finalInsert[i].status
                let date = finalInsert[i].date
                let timing = finalInsert[i].timing
                pool.query(`UPDATE ATTENDANCE_SEM5 SET STATUS = '${status}' WHERE studid = '${studid}' and cldate = '${date}' and ttid = ${timing} ;`, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve('students attendance added');
                })
            }
        }
        else if (sem === 'SE-SEM3-C-COMP') {
            for (let i = 0; i < finalInsert.length; i++) {
                let studid = finalInsert[i].studid
                let status = finalInsert[i].status
                let date = finalInsert[i].date
                let timing = finalInsert[i].timing
                pool.query(`UPDATE ATTENDANCE_SEM3 SET STATUS = '${status}' WHERE studid = '${studid}' and cldate = '${date}' and ttid = ${timing} ;`, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve('students attendance added');
                })
            }
        }

    })
}


module.exports = {
    getSingleEntity,
    getStudentsCA,
    getSingleTeacher,
    getTeacherSubject,
    getTeacherSubjectAttendance,
    getTeacherSubjectTable,
    getTeacherStudentList,
    insertAttendance,
    updateAttendance,
}