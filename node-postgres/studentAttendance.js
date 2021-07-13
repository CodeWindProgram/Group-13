const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Attendenc Module',
    password: 'adnan',
    port: 5432,
});


const studentInfo = ({ id }) => {
    return new Promise(function (resolve, reject) {
        pool.query(`select * from students where studid = '${id}' `, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        })
    })
}


const studentSubjectAttendance = ({ id, sem }) => {
    if (sem === 'BE-SEM7-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid,sub.subname,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
from attendance_sem7 a, subjects sub , ttsem7 t where a.studid = '${id}' and
t.subid = sub.subid  and a.ttid = t.ttid  group by sub.subname , a.studid ; `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
    else if (sem === 'TE-SEM5-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid,sub.subname,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
from attendance_sem5 a, subjects sub , ttsem5 t where a.studid = '${id}' and
t.subid = sub.subid  and a.ttid = t.ttid  group by sub.subname , a.studid ; `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
    else if (sem === 'SE-SEM3-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid,sub.subname,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
from attendance_sem3 a, subjects sub , ttsem3 t where a.studid = '${id}' and
t.subid = sub.subid  and a.ttid = t.ttid  group by sub.subname , a.studid ; `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
}


const studentOverallAttendance = ({ id, sem }) => {
    if (sem === 'BE-SEM7-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select sum(case when status = 'P' then 1 else 0 end) as present,
sum(case when status = 'P' then 1 else 1 end) as total,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as percentage
from attendance_sem7 where studid = '${id}'`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
            })
        })
    }
    else if (sem === 'TE-SEM5-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select sum(case when status = 'P' then 1 else 0 end) as present,
sum(case when status = 'P' then 1 else 1 end) as total,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as percentage
from attendance_sem5 where studid = '${id}'`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
            })
        })
    }
    else if (sem === 'SE-SEM3-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select sum(case when status = 'P' then 1 else 0 end) as present,
sum(case when status = 'P' then 1 else 1 end) as total,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as percentage
from attendance_sem3 where studid = '${id}'`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
            })
        })
    }
}


module.exports = {
    studentInfo,
    studentSubjectAttendance,
    studentOverallAttendance,
}