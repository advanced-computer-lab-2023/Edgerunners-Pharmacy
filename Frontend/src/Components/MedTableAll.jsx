import React, { useCallback, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Logo from '../UI/Logo';

import { data } from './makeMedicineDataAll';

const MedTableAll = () => {
  const [tableData, setTableData] = useState(() => data);

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
        accessorKey: 'name',
        header: 'Name',
        size: 140,
      },
      {
        accessorKey: 'picture',
        header: 'Picture',
        size: 140,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 140,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 140,
      },
      {
        accessorKey: 'medicinalUse',
        header: 'Medicinal Use',
        size: 140,
      },
    ],
    [],
  );

  return (
    <>
      <div className=" flex justify-center  mt-6 mb-0 ">
        <Logo height='4rem' />
      </div >
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableColumnOrdering
      />
    </>
  );
};

export default MedTableAll;