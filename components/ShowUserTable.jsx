import {
  Backdrop,
  Button,
  Divider,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Swal from "sweetalert2";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import useLocalStorage from "@rehooks/local-storage";
import Router from "next/router";
export default function ShowUserTable({ data }) {
  const [users, setUsers] = useState(data);
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  //filter user
  async function searchUser(userName) {
    if (userName == "") {
      setUsers(data);
    } else {
      setUsers(data.filter((item) => item.username == userName));
    }
  }

  const changeUpdatePer = (hasUpdatePer, id) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "Want to change update permission of this user",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonColor: "green",
      confirmButtonText:"Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } =await axios.put(
          `/api/user/changeUpdatePermission?id=${id}`,
          { hasUpdatePer: hasUpdatePer },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);

        if (data == "Update permission has been changed successfully") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: data,
          }).then((result) => {
            if (result.isConfirmed) {
              Router.reload();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again later",
          });
        }
      }
    });
  };
  return (
    <>
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
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        <TableContainer
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "10px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Permission(Update)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {moment(user.createdAt).format("YY-MM-DD")}
                </TableCell>
                <TableCell>{user.isAdmin ? "Admin" : "Accounts staff"}</TableCell>
                <TableCell align="center">
                  <Button
                    disabled={user.isAdmin ? true : false}
                    startIcon={<ChangeCircleIcon />}
                    onClick={() => changeUpdatePer(user.hasUpdatePer, user._id)}
                  >
                    {user.hasUpdatePer ? "Yes" : "No"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </div>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}
