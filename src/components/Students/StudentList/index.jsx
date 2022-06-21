import { Box, Button, Container, FormControl, Icon, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import CreateStudentModal from '../CreateStudentModal';
import DeletStudentModal from '../DeleteStudentModal';
import EditStudentModal from '../EditStudentModal';

import moment from 'moment';

const StudentList = ({ rows, columns, handleDeleteById }) => {

    const [selectedStudent, setSelectedStudent] = useState({});

    //Delete modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleClickOpen = (row) => {
        setSelectedStudent(row);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleAcceptDeleteModal = () => {
        const id = selectedStudent.id;
        handleDeleteById(id);
        setOpenDeleteModal(false);
    };

    //Edit modal
    const [openEdit, setOpenEdit] = useState(false);
    const [student, setStudent] = useState({});

    const handleClickOpenEditModal = (row) => {
        setStudent(row)
        setSelectedStudent(row)
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleAcceptEdit = () => {
        setOpenEdit(false);
        console.log(selectedStudent)
    };

    //Create modal
    const [openCreate, setOpenCreate] = useState(false);

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleAcceptCreate = () => {
        setOpenCreate(false);
    };

    const handleClickOpenCreateModal = () => {
        setOpenCreate(true);
    };

    return (
        <>
            <Container maxWidth="lg">
                <h3>Student List!</h3>

                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar variant="regular" color="primary" style={{ padding: 0}}>
                        <Button 
                            variant="contained" 
                            color="success"
                            onClick={() => handleClickOpenCreateModal()}
                            endIcon={<Icon fontSize="small">add</Icon>}>
                            New
                        </Button>
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Student List
                        </Typography>

                        <FormControl variant="standard">
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Search..."
                                InputProps={{
                                    'aria-label': 'weight',
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon fontSize="small">search</Icon>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Icon fontSize="small">close</Icon>
                                        </InputAdornment>
                                    )
                                }}
                                variant="standard"
                            />
                        </FormControl>
                        </Toolbar>
                </Box>

                <Paper elevation={3}>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">

                            <TableHead>
                                <TableRow>
                                    {columns.map( (column) =>(
                                        <TableCell key={column.field} align={column.align}>{column.headerName}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell align="left">{row.id}</TableCell>
                                        <TableCell align="left">{row.firstName}</TableCell>
                                        <TableCell align="left">{row.lastName}</TableCell>
                                        <TableCell align="left">{row.docType}</TableCell>
                                        <TableCell align="left">{row.docNumber}</TableCell>
                                        <TableCell align="left">{moment(new Date(row.birthDate)).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.status?<Icon color="success">toggle_on</Icon>:<Icon color="error">toggle_off</Icon>}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" aria-label="edit student" component="span" onClick={() => handleClickOpenEditModal(row)}>
                                                <Icon fontSize="small">edit</Icon>
                                            </IconButton>
                                            <IconButton color="error" aria-label="delete student" component="span" onClick={() => handleClickOpen(row)}>
                                                <Icon fontSize="small">delete</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={9} align="center">numero de estudiantes</TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>

                    <DeletStudentModal
                        open={openDeleteModal}
                        selectedStudent={selectedStudent}
                        setSelectedStudent={setSelectedStudent}
                        handleClose={handleCloseDeleteModal}
                        handleAccept={handleAcceptDeleteModal}
                    />

                    <EditStudentModal
                        open={openEdit}
                        student={student}
                        selectedStudent={selectedStudent}
                        setSelectedStudent={setSelectedStudent}
                        handleClose={handleCloseEdit}
                        handleAccept={handleAcceptEdit}
                    />

                    <CreateStudentModal
                        open={openCreate}
                        handleClose={handleCloseCreate}
                        handleAccept={handleAcceptCreate}
                    />

                </Paper>
            </Container>
        </>

    )
}

export default StudentList