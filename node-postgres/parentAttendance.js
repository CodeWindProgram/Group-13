const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Attendence Module',
    password: 'adnan',
    port: 5432,
});



const getStudentInfo = ({ id }) => {
    return new Promise(function (resolve, reject) {
        pool.query(`select * from students where pid = '${id}' `, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}



const studentAttendance = ({ id, sem }) => {
    if (sem === 'BE-SEM7-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid,s.studname, s.progid  , s.year , s.gender, ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2)
    as percentage from attendance_sem7 a, students s where a.studid = '${id}' and a.studid = s.studid  group by a.studid , s.studname , s.year, s.gender, s.progid `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0])
            })
        })
    }
    else if (sem === 'TE-SEM5-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid,s.studname, s.progid , s.year , s.gender, ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2)
    as percentage from attendance_sem5 a, students s where a.studid = '${id}' and a.studid = s.studid  group by a.studid , s.studname , s.year, s.gender, s.progid `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
            })
        })
    }
    else if (sem === 'SE-SEM3-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid,s.studname, s.progid , s.year , s.gender, ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2)
    as percentage from attendance_sem3 a, students s where a.studid = '${id}' and a.studid = s.studid  group by a.studid , s.studname , s.year, s.gender, s.progid `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0]);
            })
        })
    }
}


module.exports = {
    getStudentInfo,
    studentAttendance,
}
