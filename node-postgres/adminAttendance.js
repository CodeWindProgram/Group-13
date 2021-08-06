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
        pool.query(`select * from students `, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}


const studentAttendance = () => {
    return new Promise(function (resolve, reject)
    {
        pool.query(`select s.studid,s.studname, s.progid  , s.year , s.gender, ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2)
    as percentage from students s group by s.studid , s.studname , s.year, s.gender, s.progid `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows[0])
            })
    })
}

module.exports = {
    getStudentInfo,
    studentAttendance,
}