import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { makePharmData } from './makePharmData';
import axios from 'axios';
const PharmTable = () => {
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await makePharmData();
        setTableData(data);

      } catch (error) {
        console.error("Error fetching data:", error);

      }
    }

    fetchData();
  }, []);
  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        window.confirm(`Are you sure you want to delete ${row.getValue('username')}`)
      ) {
        const usernameToDelete = row.getValue('username');
        //console.log(usernameToDelete);
        await axios.delete("http://localhost:3001/deletePharmacist", { data: { Username: usernameToDelete } })
          .then((response) => {
            if (response.status === 200) {
              // Update the local table data to remove the deleted row
              const updatedData = tableData.filter((item) => item.username !== usernameToDelete);
              setTableData(updatedData);
              console.log(`Deleted user: ${usernameToDelete}`);
            } else {
              console.error(`Failed to delete user: ${usernameToDelete}`);
            }
          })
          .catch((error) => {
            console.error(`Error deleting user: ${usernameToDelete}`, error);
          });
        // const updatedData = [...tableData];
        // updatedData.splice(row.index, 1);
        // setTableData(updatedData);
      }
    },
    [tableData],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 140,
      },
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        size: 140,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 140,
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
        size: 100,
      },
      {
        accessorKey: 'hourlyRate',
        header: 'Hourly Rate',
        size: 100,
      },
      {
        accessorKey: 'affiliation',
        header: 'Affiliation (Hospital)',
        size: 200,
      },
      {
        accessorKey: 'educationalBackground',
        header: 'Educational Background',
        size: 200,
      },
      {
        accessorKey: 'reqStatus',
        header: 'Status',
        size: 200,
      },
      {
        accessorKey: 'delete',
        header: 'Actions',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 120,
        muiTableBodyCellEditTextFieldProps: {
          align: 'center',
        },
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [handleDeleteRow]
  );


  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div className = "items-center flex justify-center">
        <h2 style={{ color: '#93AFDA'}}>Pharmacists</h2>
      </div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableColumnOrdering
      />
    </div>
  );
};

export default PharmTable;