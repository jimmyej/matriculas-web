import { DialogContentText } from '@mui/material';
import React from 'react';
import CustomDialog from '../../../commons/CustomDialog';

const DeletStudentModal = ({open, selectedStudent, handleClose, handleAccept}) => {

    const BodyComponent = () => {
        return (
            <DialogContentText>
                Estas seguro que quiere desactivar al estudiante {selectedStudent.firstName} {selectedStudent.lastName}? 
            </DialogContentText>
        )
    }
    
    return (
        <CustomDialog
            open={open}
            title="Delete student"
            bodyComponent={<BodyComponent/>}
            handleClose={handleClose}
            handleAccept={handleAccept}
        />
    )
}

export default DeletStudentModal