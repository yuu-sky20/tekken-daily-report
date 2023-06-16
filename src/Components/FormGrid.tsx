import React, {useCallback, useMemo, useRef, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const rowSpan = (params: any) => {
	if (params.data.show) {
		return 2
	} else {
		return 1
	}
}

export const FormGrid = () => {
	const containerStyle = useMemo(() => ({ width: '100%', height: '1000px' }), []);
	const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
	const [rowData, setRowData] = useState([
		{'show': "AM8:00"},
		{},
		{'show': "9:00"},
		{},
		{'show': "10:00"},
		{},
		{'show': "11:00"},
		{},
		{'show': "12:50"},
		{},
		{'show': "PM2:00"},
		{},
		{'show': "3:00"},
		{},
		{'show': "4:10"},
		{},
		{'show': "10:00"},
		{'show': "10:30"},
		{'show': "11:00"},
		{'show': "11:30"},
		{'show': "12:00"},
		{'show': "12:30"}
	]);

	const [columnDefs, setColumnDefs] = useState([
		{
			field: 'show',
			headerName: '時間',
			rowSpan: rowSpan,
			cellClassRules: {
				'show-cell'	: "value !== undefined"
			},
			width: 100
		},
		{ field: 'code', headerName: '作業コード' },
		{ field: 'no', headerName: '工事No.' },
		{ field: 'content', headerName: '作業内容' },
		{ field: 'comment', headerName:'備考' }
	])

	const defaultColDef = useMemo(() => {
		return {
			width: 170,
			resizable: true,
			editable: true
		};
	}, []);

	const gridRef = useRef<AgGridReact>(null);
	const onBtnExport = useCallback(() => {
		gridRef.current!.api.exportDataAsCsv();
	}, []);

	return (
		<div style={containerStyle}>
			<div style={{ margin: '10px 0' }}>
				<button onClick={onBtnExport}>Download CSV export file</button>
			</div>
			<div style={gridStyle} className="ag-theme-alpine">
				   <AgGridReact
					   ref={gridRef}
					   rowData={rowData}
					   columnDefs={columnDefs}
					   rowSelection={'multiple'}
					   rowMultiSelectWithClick={true}
					   suppressRowTransform={true}
					   defaultColDef={defaultColDef}
				   ></AgGridReact>
			 </div>
		</div>
	);
};