export const columns = [
    { field: 'id', headerName: 'ID', width: 70, align: 'left'},
    { field: 'firstName', headerName: 'First name', width: 130 , align: 'left'},
    { field: 'lastName', headerName: 'Last name', width: 130 , align: 'left'},
    { field: 'docType', headerName: 'Doc type', width: 130 , align: 'left'},
    { field: 'docNumber', headerName: 'Doc number', width: 130 , align: 'left'},
    { field: 'bithdate', headerName: 'Birthdate', width: 130 , align: 'left'},
    { field: 'email', headerName: 'E-mail', width: 130 , align: 'left'},
    { field: 'status', headerName: 'Status', width: 130 , align: 'left'},
    {
      field: 'actions',
      headerName: 'Acciones',
      description: 'This column has two functionalties delete and edit',
      sortable: false,
      width: 160,
      align: 'right'
    },
];