import { Avatar, Button, FormControl, FormControlLabel, Grid, Icon, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import React, { useEffect, useState } from "react"
import CustomDialog from "../../../commons/CustomDialog"
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { createStudent, updateStudent } from "../../../core/students/thunks"
import { useDispatch } from "react-redux"

const CommonStudentModal = ({open, setOpen, selectedStudent, setSelectedStudent, showAll, action}) => {

    const dispatch = useDispatch();
    const disableInput = action === "View" ? true : false;

    const Input = styled('input')({
        display: 'none',
    });

    const handleAccept = (student, file) => {
        if(action === "Create") {
            dispatch(createStudent(student, file, showAll));
        } else if(action === "Edit") {
            dispatch(updateStudent(student, file, showAll))
        }
        setOpen(false);
        setSelectedStudent({});
    };

    const handleClose = () => {
        setOpen(false);
    }

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

        const [student, setStudent] = useState(selectedStudent ? selectedStudent : initialStudentState);
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

        const handleInputFileChange = event => {
            setFile(event.target.files[0]);
        }

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

            if(action === "Edit") {
                newStudent.id = student.id;
                newStudent.urlPhoto = student.urlPhoto;
                newStudent.publicId = student.publicId;
            }

            handleAccept(newStudent, file);
            setStudent(initialStudentState)
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
                            disabled ={disableInput}
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
                            disabled ={disableInput}
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
                                disabled ={disableInput}
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
                            disabled ={disableInput}
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
                                disabled ={disableInput}
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
                        {
                            !disableInput && 
                            <label htmlFor="photo">
                                <Input accept="image/*" id="photo" type="file" onChange={handleInputFileChange}/>
                                <Button
                                    component="span"
                                    style={{width: "200px", marginTop: "10px"}}
                                    variant="contained" 
                                    color="success"
                                    endIcon={<Icon fontSize="small">photo_camera</Icon>}>
                                    Upload
                                </Button>
                            </label>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled ={disableInput}
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
                                    disabled ={disableInput}
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
                        {
                            action !== 'View' && <Button style={{float: 'right'}} onClick={submitStudent}>Aceptar</Button>
                        }
                        <Button style={{float: 'right'}} onClick={handleClose}>{action === 'View' ? 'Close' : 'Cancel'}</Button>
                    </div>
                </FormControl>
            </>
        )
    }

    return (
        <CustomDialog
            open={open}
            title={action + " student"}
            bodyComponent={
                <BodyComponent handleClose={handleClose}  handleAccept={handleAccept}/>
            }
            hideAction={true}
        />
    )
}

export default CommonStudentModal

CommonStudentModal.propTypes = {
    open: PropTypes.bool, 
    selectedStudent: PropTypes.object,
    handleClose: PropTypes.func,
    handleAccept: PropTypes.func,
    action: PropTypes.string
};