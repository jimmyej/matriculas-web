import { Box, Button, Container, FormControl, FormControlLabel, Icon, IconButton, InputAdornment, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeletStudentModal from '../DeleteStudentModal';
import CommonStudentModal from '../CommonStudentModal';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';

const StudentList = ({ rows, columns, showAll, setShowAll }) => {

    const [selectedStudent, setSelectedStudent] = useState({});

    //search
    const [searchText, setSearchText] = useState("");

    const data = {
        rows: rows.filter((item) =>
            item.docNumber.includes(searchText) ||
            item.birthDate.includes(searchText)
        ),
    };

    //Create modal
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleClickOpenCreateModal = () => {
        setOpenCreateModal(true);
    };

    //Edit modal
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleClickOpenEditModal = (row) => {
        setSelectedStudent(row)
        setOpenEditModal(true);
    };

    //View modal
    const [openViewModal, setOpenViewModal] = useState(false);

    const handleClickOpenViewModal = (row) => {
        setSelectedStudent(row)
        setOpenViewModal(true);
    };

    //Delete modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleClickOpenDeleteModal = (row) => {
        setSelectedStudent(row);
        setOpenDeleteModal(true);
    };

    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //sorting students
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('updatedAt');

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const createSortHandler = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar variant="regular" color="primary" style={{ padding: 0}}>
                        <Button 
                            variant="contained" 
                            color="success"
                            onClick={() => handleClickOpenCreateModal()}
                            endIcon={<Icon fontSize="small">add</Icon>}>
                            New
                        </Button>
                        
                        <FormControlLabel
                            control={<Switch checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />}
                            label="Show All"
                            labelPlacement="start"
                        />
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Student List
                        </Typography>

                        <FormControl variant="standard">
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Search..."
                                InputProps={{
                                    'aria-label': 'weight',
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon fontSize="small">search</Icon>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        searchText.length> 0 && (
                                            <InputAdornment position="start" onClick={() => setSearchText("")} >
                                                <Icon fontSize="small">close</Icon>
                                            </InputAdornment>
                                            )
                                    )
                                }}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                variant="standard"
                            />
                        </FormControl>
                    </Toolbar>
                </Box>

                <Paper elevation={3}>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">

                            <TableHead>
                                <TableRow>
                                    {columns.map( (column) =>(
                                        <TableCell 
                                            key={column.field} 
                                            align={column.align}
                                            sortDirection={orderBy === column.field ? order : false}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === column.field}
                                                    direction={orderBy === column.field ? order : 'asc'}
                                                    onClick={createSortHandler(column.field)}
                                                >
                                                    {column.headerName}
                                                    {orderBy === column.field ? (
                                                        <Box component="span" sx={visuallyHidden}>
                                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                        </Box>
                                                    ) : null}
                                                </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data.rows
                                    .slice().sort(getComparator(order, orderBy))//sorting
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)//pagination
                                    .map((row) => (
                                    <TableRow key={row.id} >
                                        <TableCell align="left">{row.id}</TableCell>
                                        <TableCell align="left">{row.firstName}</TableCell>
                                        <TableCell align="left">{row.lastName}</TableCell>
                                        <TableCell align="left">{row.docType}</TableCell>
                                        <TableCell align="left">{row.docNumber}</TableCell>
                                        <TableCell align="left">{moment(row.birthDate).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.status?<Icon color="success">toggle_on</Icon>:<Icon color="error">toggle_off</Icon>}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="secondary" aria-label="view student" component="span" onClick={() => handleClickOpenViewModal(row)}>
                                                <Icon fontSize="small">visibility</Icon>
                                            </IconButton>
                                            <IconButton color="primary" aria-label="edit student" component="span" onClick={() => handleClickOpenEditModal(row)}>
                                                <Icon fontSize="small">edit</Icon>
                                            </IconButton>
                                            <IconButton color="error" aria-label="delete student" component="span" onClick={() => handleClickOpenDeleteModal(row)} disabled={!row.status}>
                                                <Icon fontSize="small">delete</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {data.rows.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={9} style={{ textAlign: 'center' }}>
                                            No records found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={data.rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                            
                        </Table>
                    </TableContainer>

                    <DeletStudentModal
                        open={openDeleteModal}
                        setOpen={setOpenDeleteModal}
                        selectedStudent={selectedStudent}
                        showAll={showAll}
                    />

                    <CommonStudentModal
                        open={openCreateModal}
                        setOpen={setOpenCreateModal}
                        setSelectedStudent={setSelectedStudent}
                        showAll={showAll}
                        action="Create"
                    />

                    <CommonStudentModal
                        open={openEditModal}
                        setOpen={setOpenEditModal}
                        selectedStudent={selectedStudent}
                        setSelectedStudent={setSelectedStudent}
                        showAll={showAll}
                        action="Edit"
                    />

                    <CommonStudentModal
                        open={openViewModal}
                        setOpen={setOpenViewModal}
                        selectedStudent={selectedStudent}
                        action="View"
                    />

                </Paper>
            </Container>
        </>

    )
}

export default StudentList