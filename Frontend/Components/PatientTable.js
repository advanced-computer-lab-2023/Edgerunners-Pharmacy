import React, { useCallback, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

import {data} from './makePatientData';

const PatientTable = () => {
  const [tableData, setTableData] = useState(() => data);

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        window.confirm(`Are you sure you want to delete ${row.getValue('username')}`)
      ) {
        // Send an API delete request here, then update the local table data for re-render
        const updatedData = [...tableData];
        updatedData.splice(row.index, 1);
        setTableData(updatedData);
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
        accessorKey: 'password',
        header: 'Password',
        size: 140,
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
        size: 100,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 100,
      },
      {
        accessorKey: 'mobileNumber',
        header: 'Mobile Number',
        size: 140,
      },
      {
        accessorKey: 'emergencyContactName',
        header: 'Emergency Contact Name',
        size: 200,
      },
      {
        accessorKey: 'emergencyContactPhone',
        header: 'Emergency Contact Phone',
        size: 160,
      },
      {
        accessorKey: 'relationToPatient',
        header: 'Relation to Patient',
        size: 140,
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
    [handleDeleteRow],
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableColumnOrdering
      />
    </>
  );
};

export default PatientTable;
