import React, { useEffect, useState } from 'react';
import { Avatar, Button, FormControl, FormControlLabel, Grid, Icon, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import CustomDialog from '../../../commons/CustomDialog';
import PropTypes from 'prop-types';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { deepPurple } from '@mui/material/colors';
import styled from '@emotion/styled';

const EditStudentModal = ({open, selectedStudent, handleClose, handleAccept}) => {

    const Input = styled('input')({
        display: 'none',
    });

    const BodyComponent = ({handleClose, handleAccept}) => {

        const [student, setStudent] = useState(selectedStudent);
        const [file, setFile] = useState(null);
        const [preview, setPreview] = useState();

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

        const handleInputFile = event => {
            setFile(event.target.files[0]);
        }

        const submitStudent = () => {
            /* Option 1*/
            const newStudent = {
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                docType: student.docType,
                docNumber: student.docNumber,
                birthDate: moment(student.birthDate).format('yyyy-MM-DD'),
                email: student.email,
                status: student.status,
                urlPhoto: student.urlPhoto,
                publicId: student.publicId
            }
            handleAccept(newStudent, file);

            /* Option 2*/
            /* handleAccept({ ...student, 'birthDate': moment(student.birthDate).format('yyyy-MM-DD') }); */
        }

        // create a preview as a side effect, whenever selected file is changed
        useEffect(() => {
            if (!file) {
                setPreview(undefined)
                return
            }

            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)

            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl)
        }, [file])

        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6} sx={{ margin: "auto", padding: "auto", verticalAlign: "middle", textAlign: "center" }}>
                        <Avatar alt="Photo" sx={{ bgcolor: deepPurple[500], width: 200, height: 200, margin: "auto"}} src={preview || student.urlPhoto} />
                        <label htmlFor="photo">
                            <Input accept="image/*" id="photo" type="file" onChange={handleInputFile}/>
                            <Button
                                component="span"
                                style={{width: "200px", marginTop: "10px"}}
                                variant="contained" 
                                color="success"
                                endIcon={<Icon fontSize="small">photo_camera</Icon>}>
                                Upload
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>

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