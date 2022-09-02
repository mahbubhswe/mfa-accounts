import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { Divider, Paper, TextField } from "@mui/material";
export default function ShowTransactionHistory({ data }) {
  const [transactionList, setTransactionList] = useState(data);
  console.log(transactionList);
  const columns = React.useMemo(
    () => [
      { field: "name", headerName: "Name", width: "200" },
      { field: "username", headerName: "Username", width: "200" },
      { field: "amount", headerName: "Amount", width: "200" },
      { field: "sector", headerName: "Sector", width: "200" },
      { field: "transactionType", headerName: "Type", width: "200" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
        renderCell: (params) => moment(params.row.createdAt).format("YY-MM-DD"),
      },
    ],
    [transactionList]
  );
  //filter decord
  async function filterRecord(username) {
    if (username == "") {
      setTransactionList(data);
    } else {
      setTransactionList(data.filter((item) => item.username == username));
    }
  }

  return (
    <>
      <div style={{ width: "80%", margin: "auto", marginBottom: "20px" }}>
        <TextField
          fullWidth
          placeholder="Type username"
          type={"search"}
          size="small"
          label="Search by username"
          variant="outlined"
          color="secondary"
          onChange={(e) => filterRecord(e.target.value)}
        ></TextField>
      </div>
      <Divider sx={{ fontSize: "35px", fontWeight: 700 }}>
        Transaction History
      </Divider>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={transactionList}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}
