import { DialogContentText } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import CustomDialog from '../../../commons/CustomDialog';
import { deleteStudent } from '../../../core/students/thunks';

const DeletStudentModal = ({open, setOpen, selectedStudent, showAll}) => {

    const dispatch = useDispatch();

    const handleAccept = () => {
        const id = selectedStudent.id;
        dispatch(deleteStudent(id, showAll));
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

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