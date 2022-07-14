import studentTypes from "./types";

export const setLoadingStudent = () => ({
    type: studentTypes.SET_LOADING_STUDENT
})

export const setLoadingStudentList = () => ({
    type: studentTypes.SET_LOADING_STUDENT_LIST
})

export const createStudencSuccess = student => ({
    type: studentTypes.CREATE_STUDENT_SUCCESS,
    payload: student
})

export const createStudentFailure = error => ({
    type: studentTypes.CREATE_STUDENT_FAILURE,
    payload: error
})

export const getStudentsSuccess = students => ({
    type: studentTypes.READ_STUDENTS_SUCCESS,
    payload: students
})

export const getStudentsFailure = error => ({
    type: studentTypes.READ_STUDENTS_FAILURE,
    payload: error
})

export const updateStudentSuccess = student => ({
    type: studentTypes.UPDATE_STUDENT_SUCCESS,
    payload: student
})

export const updateStudentFailure = error => ({
    type: studentTypes.UPDATE_STUDENT_FAILURE,
    payload: error
})

export const deleteStudentSuccess = student => ({
    type: studentTypes.DELETE_STUDENT_SUCCESS,
    payload: student
})

export const deleteStudentFailure = error => ({
    type: studentTypes.DELETE_STUDENT_FAILURE,
    payload: error
})

export const uploadPhotoSuccess = student => ({
    type: studentTypes.UPLOAD_PHOTO_SUCCESS,
    payload: student
})

export const uploadPhotoFailure = error => ({
    type: studentTypes.UPLOAD_PHOTO_FAILURE,
    payload: error
})