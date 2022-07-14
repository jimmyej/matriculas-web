import React, { useEffect, useState } from 'react'
import StudentList from './StudentList'

import { useDispatch, useSelector } from 'react-redux';
import { getStudentsSelector } from '../../core/students/selectors';
import { getStudents } from '../../core/students/thunks';
import { columns } from './utils';

const Students = () => {

    const [showAll, setShowAll] = useState(false)

    const dispatch = useDispatch();
    const students = useSelector(state => getStudentsSelector(state))

    useEffect(() => {
        dispatch(getStudents(showAll));
    }, [dispatch, showAll])

    return (
        <>
            <h1>Welcome students!</h1>
            <StudentList 
                rows={students}
                columns={columns}
                showAll={showAll}
                setShowAll={setShowAll}
            />
        </>
    )
}

export default Students