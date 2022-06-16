import React, { useEffect, useState } from 'react'
import StudentList from './StudentList'

const Students = () => {

    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        console.log("deleting: "+isDeleting)
    }, [isDeleting])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'actions',
          headerName: 'Acciones',
          description: 'This column has two functionalties delete and edit',
          sortable: false,
          width: 160,
        },
    ];

    const students = [
        {"id": 1, "firstName":"Angel", "lastName":"Felix"},
        {"id": 2, "firstName":"Jimmy", "lastName":"Sanchez"},
        {"id": 3, "firstName":"Tony", "lastName":"Sanchez"}
    ]

    return (
        <>
            <h1>Welcome students!</h1>
            <StudentList 
                rows={students}
                columns={columns}
                setIsDeleting={setIsDeleting}
            />
        </>
    )
}

export default Students