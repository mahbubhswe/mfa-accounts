import {
  Divider,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import moment from "moment";
export default function ShowUserTable({ data }) {
  const [users, setUsers] = useState(data);
  //filter user
  async function searchUser(userName) {
    if (userName == "") {
        setUsers(data);
    } else {
        setUsers(data.filter((item) => item.username == userName));
    }
  }
  return (
    <Container sx={{ marginTop: "20px" }}>
      <Paper sx={{ paddingTop: "20px" }}>
        <div style={{ width: "60%", margin: "auto", marginBottom: "10px" }}>
          <TextField
            variant="outlined"
            label="Search by username"
            type={"search"}
            color="secondary"
            size="small"
            fullWidth
            placeholder="Type username"
            onChange={(e) => searchUser(e.target.value)}
          />
        </div>

        <Divider></Divider>
        <div
          style={{ height: "100%", display: "grid", placeContent: "center" }}
        >
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin=="true" ? "Admin" : "Basic User"}
                      </TableCell>
                      <TableCell>{moment(user.createdAt).format("YY-MM-DD")}</TableCell>
                   
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </div>
      </Paper>
    </Container>
  );
}
