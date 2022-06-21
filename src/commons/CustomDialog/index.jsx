import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

const CustomDialog = ({open, title, bodyComponent ,handleClose, handleAccept}) => {

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>
                {bodyComponent}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleAccept}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog