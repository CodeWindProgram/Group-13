import './App.css';
import React, { useState, useEffect } from 'react'
import { TeacherCA } from './Teacher Component/TeacherCA'
import { TeacherProf } from './Teacher Component/TeacherProf'
import { TeacherHOD } from './Teacher Component/TeacherHOD'
import { Student } from './Student Component/Student'
import { TeacherCAAttendance } from './Teacher Component/TeacherCAAttendance'
import { NotFound } from './Not Found Component/NotFound'
import { TeacherCASubject } from './Teacher Component/TeacherCASubject'
import { Home } from './login component/Home'
import { TeacherProfAttendance } from './Teacher Component/TeacherProfAttendance'
import { TeacherProfSubject } from './Teacher Component/TeacherProfSubject'
import { TeacherHODAttendance } from './Teacher Component/TeacherHODAttendance'
import { TeacherHODSubject } from './Teacher Component/TeacherHODSubject'
import { Parent } from './Parents Component/Parent'
import { TeacherCASubjectInfo } from './Teacher Component/TeacherCASubjectInfo';
import { TeacherHODSubjectAttendance } from './Teacher Component/TeacherHODSubjectAttendance'
import { Admin } from './Admin Component/Admin'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// getting teachers data from

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/teachers/CA/:tid">
            <TeacherCA />
          </Route>
          <Route exact path="/teachers/CA/:tid/attendance">
            <TeacherCAAttendance />
          </Route>
          <Route exact path="/teachers/CA/:tid/subjectWise">
            <TeacherCASubjectInfo />
          </Route>
          <Route exact path="/teachers/CA/:tid/subjectAttendance">
            <TeacherCASubject />
          </Route>
          <Route exact path="/teachers/HOD/:tid">
            <TeacherHOD />
          </Route>
          <Route exact path="/teachers/HOD/:tid/attendance">
            <TeacherHODAttendance />
          </Route>
          <Route exact path="/teachers/HOD/:tid/subjectAttendance">
            <TeacherHODSubject />
          </Route>
          <Route exact path="/teachers/HOD/:tid/subjectWise">
            <TeacherHODSubjectAttendance />
          </Route>
          <Route exact path="/teachers/LECTURER/:tid">
            <TeacherProf />
          </Route>
          <Route exact path="/teachers/LECTURER/:tid/attendance">
            <TeacherProfAttendance />
          </Route>
          <Route exact path="/teachers/LECTURER/:tid/subjectAttendance">
            <TeacherProfSubject />
          </Route>
          <Route exact path="/students/:studid">
            <Student />
          </Route>
          <Route exact path="/parents/:pid">
            <Parent />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route path="/:id">
            <NotFound />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>this is about page</h2>;
}


export default App;
