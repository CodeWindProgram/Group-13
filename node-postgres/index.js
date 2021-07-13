const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001

const EntityModel = require('./EntityModel')
const teacherAttendance = require('./teacherAttendance')
const studentAttendance = require('./studentAttendance')
const parentAttendance = require('./parentAttendance')
const Charts = require('./chartEntity')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.post('/', (req, res) => {
    const { username, entity } = req.body;
    EntityModel.getSingleEntity({ username, entity })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/teacher/subject', (req, res) => {
    const { tid, sem } = req.body;
    EntityModel.getTeacherSubject({ tid, sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


app.post('/teacher', (req, res) => {
    const { tid } = req.body;
    EntityModel.getSingleTeacher({ tid })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/teacherCA', (req, res) => {
    const { tid } = req.body;
    EntityModel.getStudentsCA({ tid })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


app.post('/teacher/subject/attendance', (req, res) => {
    const { sem, actDay, lect } = req.body;
    EntityModel.getTeacherSubjectAttendance({ sem, actDay, lect })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


app.post('/teacher/subject/table', (req, res) => {
    const { date, time, sem } = req.body;
    EntityModel.getTeacherSubjectTable({ date, time, sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/teacher/subject/studentsList', (req, res) => {
    const { sem } = req.body;
    EntityModel.getTeacherStudentList({ sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


app.post('/insertAttendance', (req, res) => {
    const { sem } = req.body;
    const { finalInsert } = req.body;
    EntityModel.insertAttendance({ sem, finalInsert })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.put('/updateAttendance', (req, res) => {
    const { sem } = req.body;
    const { finalInsert } = req.body;
    EntityModel.updateAttendance({ sem, finalInsert })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/subAttendance', (req, res) => {
    const { sem } = req.body;
    const { tid } = req.body;
    teacherAttendance.getProfSubjectAttendance({ sem, tid })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/studentsAttendance', (req, res) => {
    const { sem } = req.body;
    teacherAttendance.studentAttendance({ sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/student/info', (req, res) => {
    const { id } = req.body;
    studentAttendance.studentInfo({ id })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


app.post('/student/subjectAttendance', (req, res) => {
    const { id, sem } = req.body;
    console.log(id, sem);
    studentAttendance.studentSubjectAttendance({ id, sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/student/overallAttendance', (req, res) => {
    const { id, sem } = req.body;
    studentAttendance.studentOverallAttendance({ id, sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/parent/info', (req, res) => {
    const { id } = req.body;
    parentAttendance.getStudentInfo({ id })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


app.post('/parent/student', (req, res) => {
    const { id, sem } = req.body;
    parentAttendance.studentAttendance({ id, sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/charts/subject', (req, res) => {
    const { sem } = req.body;
    Charts.getSubjectWiseData({ sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.post('/admin/teachers', (req, res) => {
    const { sem } = req.body;
    Charts.getTeacherData({ sem })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

