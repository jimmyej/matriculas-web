import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import CustomDialog from '../../../commons/CustomDialog';
import PropTypes from 'prop-types';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

const EditStudentModal = ({open, selectedStudent, handleClose, handleAccept}) => {

    const BodyComponent = ({handleClose, handleAccept}) => {

        const [student, setStudent] = useState(selectedStudent);
        
        const handleInputChange = (event) => {
            setStudent({
                ...student,
                [event.target.name] : event.target.value
            })
        }
        const handleInputStatusChange = event => {
            const { name, checked } = event.target;
            setStudent({ ...student, [name]: checked });
        };

        const handleInputDateChange = event => {
            setStudent({ ...student, 'birthDate': event._d });
        };

        const submitStudent = () => {
            const newStudent = {
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                docType: student.docType,
                docNumber: student.docNumber,
                birthDate: moment(student.birthDate).format('yyyy-MM-DD'),
                email: student.email,
                status: student.status
            }
            handleAccept(newStudent);
        }

        return (
            <>
                <TextField
                    margin="dense"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={student.firstName}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={student.lastName}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth variant="standard" >
                    <InputLabel id="doc-type-select-label">Doc type</InputLabel>
                    <Select
                        labelId="doc-type-select-label"
                        id="doc-type-select"
                        name="docType"
                        defaultValue=""
                        value={student.docType}
                        label="Doc type"
                        variant="standard"
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
                    name="docNumber"
                    label="Doc number"
                    type="number"
                    fullWidth
                    variant="standard"
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
                    name="email"
                    label="E-mail"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={student.email}
                    onChange={handleInputChange}
                />
                <FormControlLabel
                    name="status"
                    control={
                        <Switch 
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
            title="Edit student"
            bodyComponent={
                <BodyComponent handleClose={handleClose}  handleAccept={handleAccept}/>
            }
            hideAction={true}
        />
    )

}

export default EditStudentModal

EditStudentModal.propTypes = {
    open: PropTypes.bool, 
    selectedStudent: PropTypes.object,
    handleClose: PropTypes.func,
    handleAccept: PropTypes.func,
};