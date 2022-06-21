import React from 'react';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import CustomDialog from '../../../commons/CustomDialog';

const CreateStudentModal = ({open, handleClose, handleAccept}) => {

    const BodyComponent = () => {
        return (
            <>
                <TextField
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <FormControl fullWidth variant="standard" >
                    <InputLabel id="doc-type-select-label">Doc type</InputLabel>
                    <Select
                        labelId="doc-type-select-label"
                        id="doc-type-select"
                        //value={docType}
                        label="Doc type"
                        variant="standard"
                        //onChange={handleChange}
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
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="E-mail"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <FormControlLabel 
                    control={
                        <Switch 
                            checked={true}//{checked}
                            //onChange={handleChange}
                        />
                    } 
                    label="Status"
                />
            </>
        )
    }

    return (
        <CustomDialog
            open={open}
            title="Create student"
            bodyComponent={<BodyComponent/>}
            handleClose={handleClose}
            handleAccept={handleAccept}
        />
    )
}

export default CreateStudentModal