import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

const DeletStudentModal = ({open, name, handleClose, handleAccept}) => {

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Delete student
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Estas seguro que quiere eliminar el estudiante {name}? 
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleAccept}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeletStudentModal