import services from './services';
import { 
    createStudentFailure,
    createStudencSuccess, 
    deleteStudentFailure, 
    deleteStudentSuccess, 
    getStudentsFailure, 
    getStudentsSuccess, 
    setLoadingStudentList, 
    updateStudentFailure, 
    updateStudentSuccess, 
    uploadPhotoFailure, 
    uploadPhotoSuccess 
} from './actions';

export const getStudents = (showAll) => async dispatch => {
    dispatch(setLoadingStudentList());
    try {
        const { data } = await services.getAllStudents(showAll);
        dispatch(getStudentsSuccess(data));
    } catch (error) {
        dispatch(getStudentsFailure(error));
    }
}

export const createStudent = (student, file, showAll) => async dispatch => {
    try {
        const { data } = await services.createStudent(student)
        if(file !== undefined) {
            dispatch(uploadStudentPhoto(data, file, false));
        }
        dispatch(createStudencSuccess(data));
    } catch (error) {
        dispatch(createStudentFailure(error));
    } finally {
        dispatch(getStudents(showAll));
    }
}

export const updateStudent = (student, file, showAll) => async dispatch => {
    try {
        const { data } = await services.updateStudent(student);
        if(file !== undefined) {
            dispatch(uploadStudentPhoto(data, file, true));
        }
        dispatch(updateStudentSuccess(data));
    } catch (error) {
        dispatch(updateStudentFailure(error));
    } finally {
        dispatch(getStudents(showAll));
    }
}

export const deleteStudent = (id, showAll) => async dispatch => {
    try {
        const { data } = await services.deleteStudent(id);
        dispatch(deleteStudentSuccess(data));
    } catch (error) {
        dispatch(deleteStudentFailure(error));
    } finally {
        dispatch(getStudents(showAll));
    }
}

export const uploadStudentPhoto = (student, file = undefined, isEditing) => async dispatch => {
    try {
        const { data } = await services.uploadStudentPhoto(student, file, isEditing);
        dispatch(uploadPhotoSuccess(data));
    } catch (error) {
        dispatch(uploadPhotoFailure(error));
    }
}

