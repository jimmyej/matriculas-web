import { createSelector } from 'reselect';

export const isLoadingStudentsSelector = createSelector(
    state => state.studentsReducer,
    ({isLoadingStudents}) => isLoadingStudents
)

export const getStudentsSelector = createSelector(
    state => state.studentsReducer,
    ({students}) => students
)

export const getStudentSelector = createSelector(
    state => state.studentsReducer,
    ({student}) => student
)