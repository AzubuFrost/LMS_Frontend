import axios from 'axios';

// action types
const FETCH_COURSES = 'FETCH_COURSES';
const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
const FETCH_COURSE = 'FETCH_COURSE';
const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
const FETCH_COURSE_FAILURE = 'FETCH_COURSE_FAILURE';
const PUT_COURSE = 'PUT_COURSE';
const PUT_COURSE_SUCCESS = 'PUT_COURSE_SUCCESS';
const PUT_COURSE_FAILURE = 'PUT_COURSE_FAILURE';
const DELETE_COURSE = 'DELETE_COURSE';
const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';
const DELETE_COURSE_FAILURE = 'DELETE_COURSE_FAILURE';


// reducers
export function CourseReducer(state = { }, action) {
  switch (action.type) {
    case FETCH_COURSES:
      return { isLoading: true, courses: action.courses };
    case FETCH_COURSES_SUCCESS:
      return { courses: action.courses, isLoading: false };
    case FETCH_COURSE:
      return { isLoading: true, course: action.course };
    case FETCH_COURSE_SUCCESS:
      return { course: action.course, isLoading: false };
    case FETCH_COURSE_FAILURE:
      return { error: action.error, showError: true };
    case PUT_COURSE:
      return { isSaving: true, course: action.course };
    case PUT_COURSE_SUCCESS:
      return { isSaving: false, course: action.course, showSuccess: true };
    case PUT_COURSE_FAILURE:
      return { isSaving: false, error: action.error, showError: true };
    case DELETE_COURSE:
      return { isDeleting: true };
    case DELETE_COURSE_SUCCESS:
      return { isDeleting: false };
    case DELETE_COURSE_FAILURE:
      return { isDeleting: false, showError: true, error: action.error };
    default:
      return state;
  }
}

// action creators
export const getAll = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_COURSES });
    return axios.get('/api/courses/getall')
      .then(response => response.data)
      .then((courses) => {
        dispatch({ type: FETCH_COURSES_SUCCESS, courses });
      });
  };
};

export const getcourseById = (id) => {
  return (dispacth) => {
    dispacth({ type: FETCH_COURSE });
    return axios.get(`api/courses/${id}`)
      .then(response => response.data)
      .then(course => dispacth({ type: FETCH_COURSE_SUCCESS, course }),
        error => dispacth({ type: FETCH_COURSE_FAILURE, error }));
  };
};

export const modifyOrCreateCourseDetail = (coursebefore, id) => {
  return (dispatch) => {
    dispatch({ type: PUT_COURSE });
    if (id !== 'create') {
      return axios.put('/api/courses', coursebefore)
        .then(response => response.data)
        .then(course => dispatch({ type: PUT_COURSE_SUCCESS, course }))
        .catch(error => dispatch({ type: PUT_COURSE_FAILURE, error }));
    }
    return axios.post('/api/courses/create', coursebefore)
      .then(response => response.data)
      .then(course => dispatch({ type: PUT_COURSE_SUCCESS, course }))
      .catch(error => dispatch({ type: PUT_COURSE_FAILURE, error }));
  };
};

export const deleteCourse = (history, id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_COURSE });
    return axios.delete(`/api/courses/delete/${id}`)
      .then(() => {
        dispatch({ type: DELETE_COURSE_SUCCESS });
        history.push('/courses');
      })
      .catch(error => dispatch({ type: DELETE_COURSE_FAILURE, error }));
  };
};
