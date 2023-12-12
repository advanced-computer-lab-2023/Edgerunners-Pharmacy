import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MaterialReactTable } from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
    Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { makeAdminData } from './makeAdminData';
import axios from 'axios';

const AdminTable = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await makeAdminData();
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
                await axios.delete("http://localhost:3001/deleteAdmin", { data: { Username: usernameToDelete } })
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
            }

        },
        [tableData],
    );

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/AddAdmin`;
        navigate(path);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false,
                enableSorting: false,
                size: 100,
            },
            {
                accessorKey: 'username',
                header: 'Username',
                size: 140,
            },
            {
                accessorKey: 'email',
                header: 'Email',
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
        <div>
            <div className="items-center flex justify-center">
                <h2 style={{ color: '#93AFDA' }}>Admins</h2>
            </div>
            <div style={{ height: '100vh', width: '98.9vw' }}>
                <MaterialReactTable
                    columns={columns}
                    data={tableData}
                    enableColumnOrdering
                />
                <div className="mt-6 flex justify-center">
                <button
                    className="text-sky-600 outline w-40 h-9 rounded-md shadow"
                    onClick={routeChange}
                >
                    Add Admin
                </button>
            </div>
            </div>
        </div>
    );
};

export default AdminTable;