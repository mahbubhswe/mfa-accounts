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
export default function UpdateStudentForm({ data }) {
  const [id, setId] = useState(data.id);
  const [studentID, setStudentID] = useState(data.studentId);
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [batch, setBatch] = useState(data.batch);
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  //update student
  const updateStudent = async (e) => {
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
          "/api/student/updateStudent",
          {
            id: id,
            studentID: studentID,
            name: name,
            batch: batch,
            email: email,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Student updated successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.push("/student/list");
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
      <Stack
        component="form"
        onSubmit={updateStudent}
        px={5}
        pb={3}
        spacing={2}
      >
        <Typography
          variant="bold"
          component={"h1"}
          sx={{ color: "#222222" }}
          align="center"
        >
          Update Student
        </Typography>
        <Divider>Enter student information bellow</Divider>
        <TextField
          size="small"
          type="text"
          label="Student id"
          color="secondary"
          variant="outlined"
          value={studentID}
          disabled
          placeholder="Enter student ID"
          onChange={(e) => setStudentID(e.target.value)}
          required
        />
        <TextField
          size="small"
          type="text"
          label="Name"
          color="secondary"
          variant="outlined"
          value={name}
          placeholder="Enter full name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          size="small"
          type="email"
          color="secondary"
          label="Email"
          variant="outlined"
          value={email}
          placeholder="Enter student email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormControl size="small" color="secondary">
          <InputLabel>Select batch</InputLabel>
          <Select
            value={batch}
            required
            onChange={(e) => setBatch(e.target.value)}
          >
            <MenuItem value={1}>01</MenuItem>
            <MenuItem value={2}>02</MenuItem>
            <MenuItem value={3}>03</MenuItem>
            <MenuItem value={4}>04</MenuItem>
            <MenuItem value={5}>05</MenuItem>
          </Select>
        </FormControl>

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
