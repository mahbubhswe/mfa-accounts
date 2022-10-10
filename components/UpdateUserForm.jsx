import {
  Stack,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export default function UpdateUserForm({ data }) {
  const [open, setOpen] = useState(false);
  const [id] = useState(data.id);
  const [userType, setUserType] = useState(data.userType);
  const [name, setName] = useState(data.name);
  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  const updateUser = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update now",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.put(
          "/api/user/updateUser",
          {
            id: id,
            name: name,
            username: username,
            email: email,
            userType: userType,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "User updated successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.push("/user/list");
            }
          });
        } else {
          Swal.fire("Failed", data, "error");
        }
      }
    });
  };

  return (
    <>
      <Stack component="form" onSubmit={updateUser} px={5} pb={3} spacing={2}>
        <Typography
          variant="bold"
          component={"h1"}
          sx={{ color: "#222222" }}
          align="center"
        >
          Update user
        </Typography>
        <Divider>Enter user information Bellow</Divider>
        <TextField
          size="small"
          type="text"
          label="Enter your name"
          color="secondary"
          variant="outlined"
          value={name}
          placeholder="Enter full name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          size="small"
          type="text"
          label="Username"
          color="secondary"
          variant="outlined"
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormControl size="small" color="secondary">
          <InputLabel>Select user Role</InputLabel>
          <Select
            value={userType}
            required
            onChange={(e) => setUserType(e.target.value)}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"bank"}>Bank User</MenuItem>
            <MenuItem value={"staff"}>Accounts staff</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small"
          type="email"
          label="Email address"
          color="secondary"
          variant="outlined"
          value={email}
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          variant="outlined"
          fullWidth
          sx={{ background: "#8D94CB", color: "#000000" }}
          type="submit"
        >
          Update
        </Button>
      </Stack>

      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
