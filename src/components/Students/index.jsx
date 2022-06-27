import React, { useEffect, useState } from 'react'
import StudentList from './StudentList'

import apiClient from "../../http-common";

const Students = () => {

    const [allStudents, setAllStudents] = useState([])

    const getAllStudents = async() => {
        try {
            const res = await apiClient.get("/v1/students");
            const result = res.data
            setAllStudents(result);
        } catch (err) {
            setAllStudents(err.response?.data || err);
        }
    }

    const createStudent = async(student) => {
        try {

            const res = await apiClient.post("/v1/students", student);
            const result = res.data
            console.log(result);
            setTimeout(() => {
                getAllStudents()
            }, 500)
            
        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    const editStudent = async(student) => {
        try {

            const res = await apiClient.put("/v1/students/"+student.id, student);
            const result = res.data
            console.log(result);
            setTimeout(() => {
                getAllStudents()
            }, 500)
            
        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    const deleteStudentById = async(id) => {
        try {
            const res = await apiClient.delete("/v1/students/"+id);
            const result = res.data
            console.log(result);
            getAllStudents()
        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    useEffect(() => {
        getAllStudents()
    }, [])

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
                rows={allStudents}
                columns={columns}
                handleDeleteById={deleteStudentById}
                handleCreate={createStudent}
                handleEdit={editStudent}
            />
        </>
    )
}

export default Students