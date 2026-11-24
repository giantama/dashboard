import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';

interface TableUIProps {
    labels: string[];
    values1: number[];
    values2: number[];
    header1: string;
    header2: string;
}

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
    return arrLabels.map((label, index) => ({
        id: index,
        label: label,
        value1: arrValues1[index],
        value2: arrValues2[index],
    }));
}

export default function TableUI({ labels, values1, values2, header1, header2 }: TableUIProps) {

    const columns: GridColDef[] = [
        { field: 'label', headerName: 'Hora', width: 110 },
        { field: 'value1', headerName: header1, width: 160, type: 'number' },
        { field: 'value2', headerName: header2, width: 160, type: 'number' },
        {
            field: 'resumen',
            headerName: 'Resumen',
            description: 'No es posible ordenar u ocultar esta columna.',
            sortable: false,
            hideable: false,
            flex: 1,
            minWidth: 180,
            valueGetter: (_, row) => `${row.label} · ${row.value1} / ${row.value2}`,
        },
    ];

    const rows = combineArrays(labels, values1, values2);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 6,
                        },
                    },
                }}
                pageSizeOptions={[6, 12, 24]}
                disableRowSelectionOnClick
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    );
}
