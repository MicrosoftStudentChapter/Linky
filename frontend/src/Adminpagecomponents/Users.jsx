import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import data from '../data/users.json';

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
  { field: 'username', headerName: 'Username', width: 300 },
  { field: 'date', headerName: 'User since', width: 200, sortable: false, filterable: false, disableColumnMenu: true },
  {
    field: 'links',
    headerName: 'Links Created',
    width: 150,
    disableColumnMenu: true,
    renderCell: (params) => {
      const [open, setOpen] = useState(false);
      const [selectedLinks, setSelectedLinks] = useState([]);

      const handleClick = () => {
        setSelectedLinks(params.row.links);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const linkColumns = [
        { field: 'link', headerName: 'Link', width: 200 },
        { field: 'alias', headerName: 'Alias', width: 150 },
        { field: 'expiry', headerName: 'Expiry', width: 150 },
        { field: 'analytics', headerName: 'Analytics', width: 150 },
      ];

      return (
        <>
          <IconButton onClick={handleClick}>
            <OpenInNewRoundedIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Links</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                  <TableHead>
                    <TableRow>
                      {linkColumns.map((column) => (
                        <TableCell key={column.field}>{column.headerName}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedLinks.map((link) => (
                      <TableRow key={link.link}>
                        <TableCell>{link.link}</TableCell>
                        <TableCell>{link.alias}</TableCell>
                        <TableCell>{link.expiry}</TableCell>
                        <TableCell>{link.analytics}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    },
    sortable: false,
    filterable: false,
  },
  {
    field: 'removeUser',
    headerName: 'Remove User',
    width: 150,
    disableColumnMenu: true,
    renderCell: (params) => {
      const handleClick = () => {
        // Logic to remove from database
        console.log('Remove User with ID:', params.row.id);
      };

      return (
        <Button variant="contained" color="error" size="small" onClick={handleClick}>
          Remove User
        </Button>
      );
    },
    sortable: false,
    filterable: false,
  },
];

const Users = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(data);
  }, []);

  return (
    <DataGrid rows={rows} columns={columns} disableColumnSelector={true} />
  );
};

export default Users;