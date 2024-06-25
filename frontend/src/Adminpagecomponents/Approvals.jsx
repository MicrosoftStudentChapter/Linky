import React, { useState, useEffect } from 'react'; // Import useEffect
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import data from '../data/approvals.json';

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
  { field: 'username', headerName: 'From', width: 200 },
  { field: 'websiteAlias', headerName: 'Website Alias', width: 200 },
  { field: 'date', headerName: 'Submitted', width: 200, sortable: false, filterable: false },
  {
    field: 'actions',
    headerName: 'Link and Actions',
    width: 150,
    disableColumnMenu: true,
    renderCell: (params) => {
      const [openLink, setOpenLink] = useState(false);

      const handleClickOpen = () => {
        setOpenLink(true);
      };

      const handleApprove = () => {
        console.log('Approve link:', params.row.link);
      };

      const handleDeny = () => {
        console.log('Deny link:', params.row.link);
      };

      return (
        <>
          <IconButton onClick={handleClickOpen}>
            <OpenInNewRoundedIcon />
          </IconButton>
          <Dialog open={openLink} onClose={() => setOpenLink(false)}>
            <DialogTitle>Open Link</DialogTitle>
            <DialogContent>
              <a href={params.row.link} target="_blank" rel="noreferrer noopener">
                {params.row.link}
              </a>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={handleApprove}>
                Approve
              </Button>
              <Button variant="contained" color="error" onClick={handleDeny}>
                Deny
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    },
    sortable: false,
    filterable: false,
  },
];

const Approvals = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(data);
  }, []);

  return (
    <DataGrid rows={rows} columns={columns} disableColumnSelector={true} />
  );
};

export default Approvals;