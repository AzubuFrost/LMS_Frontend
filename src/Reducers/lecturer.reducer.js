import axios from 'axios';

// action types
const FETCH_LECTURERS = 'FETCH_LECTURERS';
const FETCH_LECTURERS_SUCCESS = 'FETCH_LECTURERS_SUCCESS';
const FETCH_LECTURERS_FAILURE = 'FETCH_LECTURERS_FAILURE';
const FETCH_LECTURER = 'FETCH_LECTURER';
const FETCH_LECTURER_SUCCESS = 'FETCH_LECTURER_SUCCESS';
const FETCH_LECTURER_FAILURE = 'FETCH_LECTURER_FAILURE';
const PUT_LECTURER = 'PUT_LECTURER';
const PUT_LECTURER_SUCCESS = 'PUT_LECTURER_SUCCESS';
const PUT_LECTURER_FAILURE = 'PUT_LECTURER_FAILURE';
const DELETE_LECTURER = 'DELETE_LECTURER';
const DELETE_LECTURER_SUCCESS = 'DELETE_LECTURER_SUCCESS';
const DELETE_LECTURER_FAILURE = 'DELETE_LECTURER_FAILURE';

// reducers
export function LecturerReducer(state = { }, action) {
  switch (action.type) {
    case FETCH_LECTURERS:
      return { isLoading: true, lecturers: action.lecturers };
    case FETCH_LECTURERS_SUCCESS:
      return { isLoading: false, lecturers: action.lecturers };
    case FETCH_LECTURERS_FAILURE:
      return { isLoading: false, error: action.error };
    case FETCH_LECTURER:
      return { isLoading: true };
    case FETCH_LECTURER_SUCCESS:
      return { isLoading: false, lecturer: action.lecturer };
    case FETCH_LECTURER_FAILURE:
      return { isLoading: false, showError: true, error: action.error };
    case PUT_LECTURER:
      return { isSaving: true };
    case PUT_LECTURER_SUCCESS:
      return { isSaving: false, showSuccess: true };
    case PUT_LECTURER_FAILURE:
      return { isSaving: false, showError: true, error: action.error };
    case DELETE_LECTURER:
      return { isDeleting: true };
    case DELETE_LECTURER_SUCCESS:
      return { isDeleting: false };
    case DELETE_LECTURER_FAILURE:
      return { isDeleting: false, error: action.error, showError: true };
    default:
      return state;
  }
}
// action creator
export const getAllLecturer = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_LECTURERS });
    return axios.get('/api/lecturers/getall')
      .then(response => response.data)
      .then((lecturers) => { dispatch({ type: FETCH_LECTURERS_SUCCESS, lecturers }); })
      .catch(error => dispatch({ type: FETCH_LECTURERS_FAILURE, error }));
  };
};

export const getLecturerById = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_LECTURER });
    return axios.get(`/api/lecturers/${id}`)
      .then(response => response.data)
      .then(lecturer => dispatch({ type: FETCH_LECTURER_SUCCESS, lecturer }))
      .catch(error => dispatch({ type: FETCH_LECTURER_FAILURE, error }));
  };
};

export const modifyOrCreateLecturerDetail = (lecturer, id) => {
  return (dispatch) => {
    dispatch({ type: PUT_LECTURER });
    if (id === 'create') {
      return axios.post('/api/lecturers', lecturer)
        .then(response => response.data)
        .then(lc => dispatch({ type: PUT_LECTURER_SUCCESS, lecturer: lc }))
        .catch(error => dispatch({ type: PUT_LECTURER_FAILURE, error }));
    }
    return axios.put('/api/lecturers', lecturer)
      .then(response => response.data)
      .then(lc => dispatch({ type: PUT_LECTURER_SUCCESS, lecturer: lc }))
      .catch(error => dispatch({ type: PUT_LECTURER_FAILURE, error }));
  };
};

export const deleteLecturer = (history, id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_LECTURER });
    return axios.delete(`/api/lecturers/delete/${id}`)
      .then(() => {
        dispatch({ type: DELETE_LECTURER_SUCCESS });
        history.push('/lecturers');
      })
      .catch(error => dispatch({ type: DELETE_LECTURER_FAILURE, error }));
  };
};
