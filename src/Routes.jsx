import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CourseListView, CourseDetailsView, LecturerListView,
  LecturerDetailsView, StudentListView, StudentDetailsView, Register, Login, Logout, DashBoard } from './Containers';


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={CourseListView} />
      <Route exact path="/courses" component={CourseListView} />
      <Route exact path="/courses/:id" component={CourseDetailsView} />
      <Route exact path="/lecturers" component={LecturerListView} />
      <Route exact path="/lecturers/:id" component={LecturerDetailsView} />
      <Route exact path="/students" component={StudentListView} />
      <Route exact path="/students/:id" component={StudentDetailsView} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/dashboard" component={DashBoard} />
    </Switch>
  );
}
