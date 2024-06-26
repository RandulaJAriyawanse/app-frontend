import React, { useEffect, useState } from 'react';
import { DataGrid, getGridStringOperators } from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const apiUrl = process.env.REACT_APP_API_URL;

const columnsByTable = {
  "Flights": [
    { field: 'flight_no', headerName: 'Flight No', width: 130, type: 'string' },
    { field: 'scheduled_departure', headerName: 'Scheduled Departure', width: 200, type: 'dateTime' },
    { field: 'scheduled_arrival', headerName: 'Scheduled Arrival', width: 200, type: 'dateTime' },
    { field: 'departure_airport', headerName: 'Departure Airport', width: 150, type: 'string' },
    { field: 'arrival_airport', headerName: 'Arrival Airport', width: 150, type: 'string' },
    { field: 'status', headerName: 'Status', width: 120, type: 'string' },
    { field: 'aircraft_code', headerName: 'Aircraft Code', width: 130, type: 'string' },
    { field: 'actual_departure', headerName: 'Actual Departure', width: 200, type: 'string' },
    { field: 'actual_arrival', headerName: 'Actual Arrival', width: 200, type: 'string' },
  ],
  "Tickets": [
    { field: 'ticket_no', headerName: 'Ticket No', width: 150, type: 'string' },
    { field: 'book_ref', headerName: 'Booking Reference', width: 200, type: 'string' },
    { field: 'passenger_id', headerName: 'Passenger ID', width: 200, type: 'string' },
  ],
  "Ticket Flights": [
    { field: 'ticket_no', headerName: 'Ticket No', width: 160, type: 'string' },
    { field: 'flight_id', headerName: 'Flight ID', width: 100, type: 'string' },
    { field: 'fare_conditions', headerName: 'Fare Conditions', width: 150, type: 'string' },
    { field: 'amount', headerName: 'Amount', width: 100, type: 'number' },
  ],
  "Boarding Passes": [
    { field: 'ticket_no', headerName: 'Ticket No', width: 160, type: 'string' },
    { field: 'flight_id', headerName: 'Flight ID', width: 100, type: 'string' },
    { field: 'boarding_no', headerName: 'Boarding Number', width: 150, type: 'string' },
    { field: 'seat_no', headerName: 'Seat Number', width: 120, type: 'string' },
  ]
};


function FlightsDataGrid() {
  const [data, setData] = useState([]);
  const [tableName, setTableName] = React.useState("Flights");
  const [columns, setColumns] = React.useState(columnsByTable['Flights']);
  const [filterModel, setFilterModel] = useState({});

  
  const customColumns = React.useMemo(
    () =>
      columns.map((col) => { 
        if (col.type === 'string') {
          return {
            ...col,
            filterOperators: getGridStringOperators().filter(
              (operator) => operator.value === 'contains',
            ),
          };
        }

        return col;
        
      }),
    [columns],
  );


  useEffect(() => {
    const filterQuery = (filterModel && filterModel.items) || {}; 

    console.log("tableName", tableName.trim()) 
    fetch(`${apiUrl}/flightchatchat/flighttables/${tableName.replace(/\s+/g, '')}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterQuery)
    })
      .then(response => response.json())
      .then(data => {
        let convertedData;
        if (tableName === "Flights") {
          convertedData = data.map(row => ({
            ...row,
            scheduled_departure: new Date(row.scheduled_departure),
            scheduled_arrival: new Date(row.scheduled_arrival)
          }));
        } else {
          convertedData = data;
        }
        setData(convertedData)
        }
        )
      .catch(error => console.error('Error fetching data: ', error));
  }, [tableName, filterModel]);


  const handleChange = (event) => {
    setTableName(event.target.value);
    setColumns(columnsByTable[event.target.value]);
  };

  const names = [
    'Flights',
    'Tickets',
    'Ticket Flights',
    'Boarding Passes'
  ];

  return (
        <div style={{ width: '100%', height: '100%'}}>
          <div className="pl-4 pt-1" >
            Database
          </div>
          <hr className="my-1 border-base-content/10" />
          <div style={{ display:"flex", justifyContent: 'end'}} className="p-2">
            <Box sx={{ minWidth: 120 }}>
              <FormControl  sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label" size="small">Table</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tableName}
                  label="Age"
                  onChange={handleChange}
                  sx={{ fontSize: '0.9rem' }}
                >
                  { names.map((name, index) => (
                    <MenuItem key={index} value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            </div>
          <DataGrid
            rows={data}
            columns={customColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // checkboxSelection
            onFilterModelChange={(newModel) => setFilterModel(newModel)}
            style={{ maxHeight: 'calc(100% - 90px)' }}
          />
        </div>
  );
}

export default FlightsDataGrid;