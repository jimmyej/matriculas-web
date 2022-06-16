import { Container, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import DeletStudentModal from '../DeleteStudentModal';
import EditStudentModal from '../EditStudentModal';

const StudentList = ({ rows, columns, setIsDeleting }) => {

    //Delete modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [name, setName] = useState('');

    const handleClickOpen = (row) => {
        setName(row.firstName)
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleAcceptDeleteModal = () => {
        setIsDeleting(true);
        setOpenDeleteModal(false);
    };

    //Edit modal
    const [openEdit, setOpenEdit] = useState(false);
    const [student, setStudent] = useState({});

    const handleClickOpenEditModal = (row) => {
        setStudent(row)
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleAcceptEdit = () => {
        setOpenEdit(false);
    };

    return (
        <>
            <Container maxWidth="sm">
                <h3>Student List!</h3>
                <Paper elevation={3}>
                    <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                        <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">

                            <TableHead>
                                <TableRow>
                                    {columns.map( (column) =>(
                                        <TableCell key={column.field} align="right">{column.headerName}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell align="right">{row.id}</TableCell>
                                        <TableCell align="right">{row.firstName}</TableCell>
                                        <TableCell align="right">{row.lastName}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="edit student" component="span" onClick={() => handleClickOpenEditModal(row)}>
                                                <Icon fontSize="small">edit</Icon>
                                            </IconButton>
                                            <IconButton aria-label="delete student" component="span" onClick={() => handleClickOpen(row)}>
                                                <Icon fontSize="small">delete</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4} align="center">numero de estudiantes</TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>

                    <DeletStudentModal
                        open={openDeleteModal}
                        name={name}
                        handleClose={handleCloseDeleteModal}
                        handleAccept={handleAcceptDeleteModal}
                    />

                    <EditStudentModal
                        open={openEdit}
                        student={student}
                        handleClose={handleCloseEdit}
                        handleAccept={handleAcceptEdit}
                    />

                </Paper>
            </Container>
        </>

    )
}

export default StudentList