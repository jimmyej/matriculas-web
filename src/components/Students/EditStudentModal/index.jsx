import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const EditStudentModal = ({open, student, handleClose, handleAccept}) => {

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Edit student
            </DialogTitle>

            <DialogContent>
                <TextField
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={student.firstName}
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={student.lastName}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleAccept}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )

}

export default EditStudentModal