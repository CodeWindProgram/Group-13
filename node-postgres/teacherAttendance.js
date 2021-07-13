const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Attendenc Module',
    password: 'adnan',
    port: 5432,
});

const getProfSubjectAttendance = ({ tid, sem }) => {
    if (sem === 'BE-SEM7-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid , s.studname, s.gender, sub.subname,
    ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
    from attendance_sem7 a , students s , subjects sub  where a.studid = s.studid and
    ttid in (select ttid from TTSEM7 where subid in (select subid from subjects sub where lectid = '${tid}' and progid = '${sem}'))
    and sub.subid in (select subid from subjects s where lectid = '${tid}' and progid = '${sem}')
    group by a.studid , s.studname , s.gender , sub.subname order by a.studid; `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
    else if (sem === 'TE-SEM5-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid , s.studname, s.gender, sub.subname,
    ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
    from attendance_sem5 a , students s , subjects sub  where a.studid = s.studid and
    ttid in (select ttid from TTSEM5 where subid in (select subid from subjects sub where lectid = '${tid}' and progid = '${sem}'))
    and sub.subid in (select subid from subjects s where lectid = '${tid}' and progid = '${sem}')
    group by a.studid , s.studname , s.gender , sub.subname order by a.studid; `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
    else if (sem === 'SE-SEM3-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid , s.studname, s.gender, sub.subname,
    ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
    from attendance_sem3 a , students s , subjects sub  where a.studid = s.studid and
    ttid in (select ttid from TTSEM3 where subid in (select subid from subjects sub where lectid = '${tid}' and progid = '${sem}'))
    and sub.subid in (select subid from subjects s where lectid = '${tid}' and progid = '${sem}')
    group by a.studid , s.studname , s.gender , sub.subname order by a.studid; `, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
}

const studentAttendance = ({ sem }) => {
    if (sem === 'BE-SEM7-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid ,  s.studname , s.year , s.sem, s.progid, s.gender ,
                        ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
                        from attendance_sem7 a, students s where a.studid = s.studid group by a.studid , s.studname, s.year , s.sem , s.progid, s.gender
                        order by studid asc ;`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
    else if (sem === 'TE-SEM5-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid ,  s.studname , s.year , s.sem, s.progid, s.gender ,
                        ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
                        from attendance_sem5 a, students s where a.studid = s.studid group by a.studid , s.studname, s.year , s.sem , s.progid, s.gender
                        order by studid asc ;`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
    else if (sem === 'SE-SEM3-C-COMP') {
        return new Promise(function (resolve, reject) {
            pool.query(`select a.studid ,  s.studname , s.year , s.sem, s.progid, s.gender ,
                        ROUND((sum(case when status = 'P' then 1 else 0 end)::decimal / sum(case when status = 'P' then 1 else 1 end) * 100),2) as present
                        from attendance_sem3 a, students s where a.studid = s.studid group by a.studid , s.studname, s.year , s.sem , s.progid, s.gender
                        order by studid asc ;`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            })
        })
    }
}


module.exports = {
    getProfSubjectAttendance,
    studentAttendance,
}