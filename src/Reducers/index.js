import { combineReducers } from 'redux';
import { CourseReducer } from './course.reducer';
import { LecturerReducer } from './lecturer.reducer';
import { StudentReducer } from './student.reducer';
import { UserReducer } from './user.reducer';

const rootReducer = combineReducers({
  CourseReducer,
  LecturerReducer,
  StudentReducer,
  UserReducer,
});

export default rootReducer;
