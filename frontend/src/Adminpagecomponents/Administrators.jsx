import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Avatar, Button } from '@mui/material';
import data from '../data/admins.json';

const columns = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 80,
    disableColumnMenu: true,
    renderCell: (params) => {
      const firstInitial = params.row.username.charAt(0).toUpperCase();
      return (
        <Grid container alignItems="center" justifyContent="left" sx={{ display: 'flex', width: '100%', height: '100%' }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {firstInitial}
          </Avatar>
        </Grid>
      );
    },
    sortable: false,
    filterable: false,
  },
  { field: 'username', headerName: 'Username', width: 400, },
  { field: 'date', headerName: 'Admin since', width: 300, sortable: false, filterable: false, disableColumnMenu: true,},
  {
    field: 'removeAdmin',
    headerName: 'Remove Admin',
    width: 150,
    disableColumnMenu: true,
    
    renderCell: (params) => {
      // Logic for button
      const handleClick = () => {
        // Logic to remove from database
        console.log('Remove admin with ID:', params.row.id);
      };

      return (
        <Button variant="contained" color="error" size="small" onClick={handleClick}>
          Remove Admin
        </Button>
      );
    },
    sortable: false,
    filterable: false,
  },
];

const Administrators = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {//use fetch when importing dynamic data in all 3 components
    setRows(data);
  }, []);

  return (
    <DataGrid rows={rows} columns={columns} disableColumnSelector={true} />
  );
};

export default Administrators;