import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import CustomDialog from '../../../commons/CustomDialog';
import PropTypes from 'prop-types';

const EditStudentModal = ({open, selectedStudent, setSelectedStudent, handleClose, handleAccept}) => {

    const handleInputChange = (event) => {
        event.preventDefault();
        setSelectedStudent({
            ...selectedStudent,
            [event.target.name] : event.target.value
        })
    }

    const BodyComponent = () => {
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
                    value={selectedStudent.firstName}
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
                    value={selectedStudent.lastName}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth variant="standard" >
                    <InputLabel id="doc-type-select-label">Doc type</InputLabel>
                    <Select
                        labelId="doc-type-select-label"
                        id="doc-type-select"
                        name="docType"
                        value={selectedStudent.docType}
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
                    value={selectedStudent.docNumber}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="E-mail"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedStudent.email}
                    onChange={handleInputChange}
                />
                <FormControlLabel
                    name="status"
                    control={
                        <Switch 
                            checked={selectedStudent.status}
                            onChange={handleInputChange}
                        />
                    } 
                    label="Status"
                />
                {JSON.stringify(selectedStudent)}
            </>
        )
    }

    return (
        <CustomDialog
            open={open}
            title="Edit student"
            bodyComponent={<BodyComponent/>}
            handleClose={handleClose}
            handleAccept={handleAccept}
        />
    )

}

export default EditStudentModal

EditStudentModal.propTypes = {
    open: PropTypes.bool, 
    selectedStudent: PropTypes.object, 
    setSelectedStudent: PropTypes.func,
    handleClose: PropTypes.func,
    handleAccept: PropTypes.func,
};