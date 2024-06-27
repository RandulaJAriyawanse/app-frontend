import React, { useEffect, useState } from "react";
import { DataGrid, getGridStringOperators } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { dummyData, columnsByTable } from "./flight_table_constants";

const apiUrl = process.env.REACT_APP_API_URL;

function FlightsDataGrid() {
  const [data, setData] = useState(dummyData["Flights"]);
  const [tableName, setTableName] = React.useState("Flights");
  const [columns, setColumns] = React.useState(columnsByTable["Flights"]);
  const [filterModel, setFilterModel] = useState({});

  const customColumns = React.useMemo(
    () =>
      columns.map((col) => {
        if (col.type === "string") {
          return {
            ...col,
            filterOperators: getGridStringOperators().filter(
              (operator) => operator.value === "contains"
            ),
          };
        }

        return col;
      }),
    [columns]
  );

  useEffect(() => {
    // const filterQuery = (filterModel && filterModel.items) || {};

    // console.log("tableName", tableName.trim())
    // fetch(`${apiUrl}/flightchatchat/flighttables/${tableName.replace(/\s+/g, '')}/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(filterQuery)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     let convertedData;
    //     if (tableName === "Flights") {
    //       convertedData = data.map(row => ({
    //         ...row,
    //         scheduled_departure: new Date(row.scheduled_departure),
    //         scheduled_arrival: new Date(row.scheduled_arrival)
    //       }));
    //     } else {
    //       convertedData = data;
    //     }
    //     setData(convertedData)
    //     }
    //     )
    //   .catch(error => console.error('Error fetching data: ', error));
    setData(dummyData[tableName]);
  }, [tableName, filterModel]);

  const handleChange = (event) => {
    setTableName(event.target.value);
    setColumns(columnsByTable[event.target.value]);
  };

  const names = ["Flights", "Tickets", "Ticket Flights", "Boarding Passes"];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="pl-4 pr-3 pt-2 flex justify-between">
        <span className="pt-3 font-medium text-gray-900">Database</span>
        <div style={{ display: "flex", justifyContent: "end" }} className="p-2">
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label" size="small">
                Table
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tableName}
                label="Age"
                onChange={handleChange}
                sx={{ fontSize: "0.9rem" }}
              >
                {names.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <DataGrid
        className="mx-4"
        rows={data}
        columns={customColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
        onFilterModelChange={(newModel) => setFilterModel(newModel)}
      />
    </div>
  );
}

export default FlightsDataGrid;
