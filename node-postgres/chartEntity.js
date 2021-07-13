const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Attendenc Module',
    password: 'adnan',
    port: 5432,
});

const getSubjectWiseData = ({ sem }) => {
    return new Promise(function (resolve, reject) {
        if (sem === 'BE-SEM7-C-COMP') {
            pool.query(`select s.subname,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
from attendance_sem7 a , subjects s , ttsem7 t where s.progid = '${sem}' and s.subid = t.subid and t.ttid = a.ttid group by s.subname `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
        else if (sem === 'TE-SEM5-C-COMP') {
            pool.query(`select s.subname,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
from attendance_sem5 a , subjects s , ttsem5 t where s.progid = '${sem}' and s.subid = t.subid and t.ttid = a.ttid group by s.subname `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
        else if (sem === 'SE-SEM3-C-COMP') {
            pool.query(`select s.subname,
ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
from attendance_sem3 a , subjects s , ttsem3 t where s.progid = '${sem}' and s.subid = t.subid and t.ttid = a.ttid group by s.subname `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        }
    })
}



const getTeacherData = ({ sem }) => {
    return new Promise(function (resolve, reject) {
        pool.query(`select tname ,subname , post , gender, mail, phone from teachers t , subjects s
where s.progid = '${sem}' and t.tid = s.lectid`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

module.exports = {
    getSubjectWiseData,
    getTeacherData,
}