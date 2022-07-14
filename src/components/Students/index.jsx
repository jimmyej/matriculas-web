import React, { useEffect, useState } from 'react'
import StudentList from './StudentList'

import axios from "../../axiosInstance";
import { useDispatch, useSelector } from 'react-redux';
import { getStudentsSelector } from '../../core/students/selectors';
import { getStudents } from '../../core/students/thunks';

const Students = () => {

    const [allStudents, setAllStudents] = useState([])
    const [showAll, setShowAll] = useState(false)

    const dispatch = useDispatch();
    const students = useSelector(state => getStudentsSelector(state))

    const getAllStudents = async() => {
        try {
            const res = await axios.get(`/v1/students?showAll=${showAll}`);
            const result = res.data
            setAllStudents(result);
        } catch (err) {
            setAllStudents(err.response?.data || err);
        }
    }

    const createStudent = async(student, file = undefined) => {
        try {
            await axios.post("/v1/students", student)
            .then(response => {
                if(file !== undefined) {
                    uploadStudentPhoto(response.data, file, false)
                }
                setTimeout(() => {
                    getAllStudents()
                }, 1000)
            });

        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    const editStudent = async(student, file = undefined) => {
        try {
            await axios.put("/v1/students/"+student.id, student);
            if(file !== undefined) {
                await uploadStudentPhoto(student, file, true)
            }
            setTimeout(() => {
                getAllStudents()
            }, 500)
        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    const deleteStudentById = async(id) => {
        try {
            await axios.delete("/v1/students/"+id);
            getAllStudents()
        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    const uploadStudentPhoto = async(student, file, isEditing) => {
        try {
            let form_data = new FormData();
            form_data.append('file', file, "testFileName");
    
            await axios.post(buildUploadPath(student, isEditing), form_data, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
            });
        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    const buildUploadPath = (student, isEditing) => {
        const sufixPath = (isEditing && student.publicId !== null && student.publicId !== "") ? "/"+student.publicId : "";
        return  "/v1/students/"+student.id+"/upload"+ sufixPath
    }

    useEffect(() => {
        //getAllStudents()
        dispatch(getStudents(showAll));
        console.log("useEffect");
    }, [dispatch, showAll])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, align: 'left'},
        { field: 'firstName', headerName: 'First name', width: 130 , align: 'left'},
        { field: 'lastName', headerName: 'Last name', width: 130 , align: 'left'},
        { field: 'docType', headerName: 'Doc type', width: 130 , align: 'left'},
        { field: 'docNumber', headerName: 'Doc number', width: 130 , align: 'left'},
        { field: 'bithdate', headerName: 'Birthdate', width: 130 , align: 'left'},
        { field: 'email', headerName: 'E-mail', width: 130 , align: 'left'},
        { field: 'status', headerName: 'Status', width: 130 , align: 'left'},
        {
          field: 'actions',
          headerName: 'Acciones',
          description: 'This column has two functionalties delete and edit',
          sortable: false,
          width: 160,
          align: 'right'
        },
    ];

    return (
        <>
            <h1>Welcome students!</h1>
            <StudentList 
                rows={students}
                columns={columns}
                handleDeleteById={deleteStudentById}
                handleCreate={createStudent}
                handleEdit={editStudent}
                showAll={showAll}
                setShowAll={setShowAll}
            />
        </>
    )
}

export default Students