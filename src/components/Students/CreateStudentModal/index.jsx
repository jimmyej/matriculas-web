import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import CustomDialog from '../../../commons/CustomDialog';
import PropTypes from 'prop-types';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';

const CreateStudentModal = ({open, handleClose, handleAccept }) => {

    const BodyComponent = ({handleClose, handleAccept}) => {

        const initialStudentState = {
            firstName: "",
            lastName: "",
            docType: "",
            docNumber: "",
            birthDate: new Date(),
            email: "",
            status: true
        }
    
        const [student, setStudent] = useState(initialStudentState);

        const handleInputChange = event => {
            const { name, value } = event.target;
            setStudent({ ...student, [name]: value });
        };

        const handleInputStatusChange = event => {
            const { name, checked } = event.target;
            setStudent({ ...student, [name]: checked });
        };

        const handleInputDateChange = event => {
            setStudent({ ...student, 'birthDate': event._d });
        };

        const submitStudent = () => {
            const newStudent = {
                firstName: student.firstName,
                lastName: student.lastName,
                docType: student.docType,
                docNumber: student.docNumber,
                birthDate: moment(student.birthDate).format('yyyy-MM-DD'),
                email: student.email,
                status: student.status
            }
            handleAccept(newStudent);
            setStudent(initialStudentState)
        }
        
        return (
            <>
                <TextField
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="firstName"
                    value={student.firstName}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="lastName"
                    value={student.lastName}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth variant="standard" >
                    <InputLabel id="doc-type-select-label">Doc type</InputLabel>
                    <Select
                        labelId="doc-type-select-label"
                        id="doc-type-select"
                        label="Doc type"
                        variant="standard"
                        name="docType"
                        defaultValue=""
                        value={student.docType}
                        onChange={handleInputChange}
                    >
                        <MenuItem value={'DNI'}>DNI</MenuItem>
                        <MenuItem value={'LM'}>Libreta militar</MenuItem>
                        <MenuItem value={'CE'}>Carnet de extrangeria</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    id="docNumber"
                    label="Doc number"
                    type="number"
                    fullWidth
                    variant="standard"
                    name="docNumber"
                    value={student.docNumber}
                    onChange={handleInputChange}
                />

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        label="Birthdate"
                        inputFormat="yyyy-MM-DD"
                        name="birthDate"
                        value={student.birthDate}
                        onChange={handleInputDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth variant="standard"/>}
                    />
                </LocalizationProvider>

                <TextField
                    margin="dense"
                    id="email"
                    label="E-mail"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="email"
                    value={student.email}
                    onChange={handleInputChange}
                />

                <FormControlLabel
                    control={
                        <Switch
                            name="status"
                            checked={student.status}
                            onChange={handleInputStatusChange}
                        />
                    } 
                    label="Status"
                />

                <FormControl fullWidth variant="standard" >
                    <div>
                        <Button  style={{float: 'right'}} onClick={submitStudent}>Aceptar</Button>
                        <Button  style={{float: 'right'}} onClick={handleClose}>Cancelar</Button>
                    </div>
                </FormControl>
            </>
        )
    }

    return (
        <CustomDialog
            open={open}
            title="Create student"
            bodyComponent={
                <BodyComponent handleClose={handleClose} handleAccept={handleAccept}/>
            }
            hideAction={true}
        />
    )
}

export default CreateStudentModal

CreateStudentModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleAccept: PropTypes.func,
};