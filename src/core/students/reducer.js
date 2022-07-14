import studentTypes from "./types"

const initialState = {
    students: [],
    student: {},
    isLoadingStudent: false,
    isLoadingStudents: false,
    error: null
}

export const studentsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case studentTypes.SET_LOADING_STUDENT:
            return {
                ...state,
                isLoadingStudent: true
            }
        case studentTypes.SET_LOADING_STUDENT_LIST:
            return {
                ...state,
                isLoadingStudents: true
            }
        case studentTypes.CREATE_STUDENT_SUCCESS:
            return {
                ...state,
                student: payload,
                isLoadingStudents: false,
                error: null
            }
        case studentTypes.CREATE_STUDENT_FAILURE:
            return {
                ...state,
                student: null,
                isLoadingStudents: true,
                error: payload
            }
        case studentTypes.READ_STUDENTS_SUCCESS:
            return {
                ...state,
                students: payload,
                isLoadingStudents: false,
                error: null
            }
        case studentTypes.READ_STUDENTS_FAILURE:
            return {
                ...state,
                students: null,
                isLoadingStudents: true,
                error: payload
            }
        case studentTypes.UPDATE_STUDENT_SUCCESS:
            return {
                ...state,
                student: payload,
                isLoadingStudents: false,
                error: null
            }
        case studentTypes.UPDATE_STUDENT_FAILURE:
            return {
                ...state,
                student: null,
                isLoadingStudents: true,
                error: payload
            }
        case studentTypes.DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                student: payload,
                isLoadingStudents: false,
                error: null
            }
        case studentTypes.DELETE_STUDENT_FAILURE:
            return {
                ...state,
                student: null,
                isLoadingStudents: true,
                error: payload
            }
        case studentTypes.UPLOAD_PHOTO_SUCCESS:
            return {
                ...state,
                student: payload,
                error: null
            }
        case studentTypes.UPLOAD_PHOTO_FAILURE:
            return {
                ...state,
                student: null,
                error: payload
            }
        default:
            return state;
    }
}