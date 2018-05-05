import axios from 'axios';

// action type
const FETCH_STUDENTS = 'FETCH_STUDENTS';
const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';
const FETCH_STUDENT = 'FETCH_STUDENT';
const FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS';
const FETCH_STUDENT_FAILURE = 'FETCH_STUDENT_FAILURE';
const PUT_STUDENT = 'PUT_STUDENT';
const PUT_STUDENT_SUCCESS = 'PUT_STUDENT_SUCCESS';
const PUT_STUDENT_FAILURE = 'PUT_STUDENT_FAILURE';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
const DELETE_STUDENT_FAILURE = 'DELETE_STUDENT_FAILURE';

// reducer
export function StudentReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return { isLoading: true };
    case FETCH_STUDENTS_SUCCESS:
      return { isLoading: false, students: action.students, totalPage: action.totalPage };
    case FETCH_STUDENTS_FAILURE:
      return { isLoading: false, error: action.error };
    case FETCH_STUDENT:
      return { isLoading: true };
    case FETCH_STUDENT_SUCCESS:
      return { isLoading: false, student: action.student };
    case FETCH_STUDENT_FAILURE:
      return { isLoading: false, error: action.error, showError: true };
    case PUT_STUDENT:
      return { isSaving: true };
    case PUT_STUDENT_SUCCESS:
      return { isSaving: false, showSuccess: true };
    case PUT_STUDENT_FAILURE:
      return { isSaving: false, showError: true, error: action.error };
    case DELETE_STUDENT:
      return { isDeleting: true };
    case DELETE_STUDENT_SUCCESS:
      return { isDeleting: false };
    case DELETE_STUDENT_FAILURE:
      return { isDeleting: false, showError: true, error: action.error };
    default :
      return state;
  }
}


// action creator
export const getAllStudentsOrderly = (pageSize, currentNumber,
  sortString, isOrderAsc, searchValue) => {
  function fecthDataByQueryString(queryString, dispatch) {
    return axios.post(queryString)
      .then(response => response.data)
      .then(data => dispatch({ type: FETCH_STUDENTS_SUCCESS,
        students: data.students,
        totalPage: data.totalPage }))
      .catch(error => dispatch({ type: FETCH_STUDENTS_FAILURE, error }));
  }
  return (dispatch) => {
    dispatch({ type: FETCH_STUDENTS });
    if (searchValue === '') {
      return fecthDataByQueryString(`/api/students/search?pageSize=${pageSize}
                                    &pageNumber=${currentNumber}
                                    &sortString=${sortString}
                                    &sortOrder=${isOrderAsc ? 'asc' : 'desc'}`, dispatch);
    }
    return fecthDataByQueryString(`/api/students/search?pageSize=${pageSize}
                                  &pageNumber=${currentNumber}&sortString=${sortString}
                                  &sortOrder=${isOrderAsc ? 'asc' : 'desc'}
                                  &searchValue=${searchValue}`, dispatch);
  };
};

export const getStudentById = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_STUDENT });
    return axios.get(`/api/students/${id}`)
      .then(response => response.data)
      .then(student => dispatch({ type: FETCH_STUDENT_SUCCESS, student }))
      .catch(error => dispatch({ type: FETCH_STUDENT_FAILURE, error }));
  };
};

export const modifyOrCreateStudentDetail = (student, id) => {
  return (dispatch) => {
    dispatch({ type: PUT_STUDENT });
    if (id === 'create') {
      return axios.post('/api/students/create', student)
        .then(response => response.data)
        .then(st => dispatch({ type: PUT_STUDENT_SUCCESS, student: st }))
        .catch(error => dispatch({ type: PUT_STUDENT_FAILURE, error }));
    }
    return axios.put('/api/students/', student)
      .then(response => response.data)
      .then(st => dispatch({ type: PUT_STUDENT_SUCCESS, student: st }))
      .catch(error => dispatch({ type: PUT_STUDENT_FAILURE, error }));
  };
};

export const deleteStudent = (history, id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_STUDENT });
    return axios.delete(`/api/studentss/delete/${id}`)
      .then(() => {
        dispatch({ type: DELETE_STUDENT_SUCCESS });
        history.push('/students');
      })
      .catch(error => dispatch({ type: DELETE_STUDENT_FAILURE, error }));
  };
};
