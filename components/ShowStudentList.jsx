import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  Slide,
  TextField,
  Typography,
  ButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ShowStudentList({ data }) {
  const [studentList, setStudentList] = React.useState(data);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");
  const columns = React.useMemo(
    () => [
      { field: "studentID", headerName: "Student ID", width: "100" },
      { field: "name", headerName: "Name", width: "200" },
      { field: "email", headerName: "E-mail", width: "200" },
      { field: "batch", headerName: "Batch", width: "100" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "100",
        renderCell: (params) => moment(params.row.createdAt).format("YY-MM-DD"),
      },

      {
        field: "_id",
        headerName: "Action",
        width: "100",
        renderCell: (params) => {
          return (
            <ButtonGroup>
              <IconButton
                variant="contained"
                sx={{ color: "#E15963" }}
                // disabled={userInfo.isAdmin == "true" ? false : true}
                onClick={() => deleteRecord(params.row._id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                variant="contained"
                sx={{ color: "#015B80" }}
                // disabled={userInfo.isAdmin == "true" ? false : true}
                onClick={() =>
                  router.push(
                    `/student/update?id=${params.row._id}&studentId=${params.row.studentID}&name=${params.row.name}&email=${params.row.email}&batch=${params.row.batch}`
                  )
                }
              >
                <EditIcon />
              </IconButton>
            </ButtonGroup>
          );
        },
      },
    ],
    [studentList]
  );
  //filter decord
  async function filterRecord(id) {
    if (id == "") {
      setStudentList(data);
    } else {
      setStudentList(data.filter((item) => item.studentId == id));
    }
  }

  // set alert information
  function alertOnTaskDone(title, text, icon, confirmButtonText) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: confirmButtonText,
    }).then((result) => {
      if (result.value) {
        router.reload(window.location.pathname);
      }
    });
  }
  // delete student
  async function deleteRecord(id) {
    Swal.fire({
      title: "Do you want to delete this student record?",
      text: "Every information will be deleted from this system related to this student",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(
          `/api/student/deleteStudent?id=${id}`,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Record deleted successfully") {
          alertOnTaskDone(
            "Record deleted",
            "This record has been deleted successfully!",
            "success",
            "Ok"
          );
        } else {
          alertOnTaskDone(
            "Somethings want wrong!",
            "Please try again later",
            "error",
            "Ok"
          );
        }
      }
    });
  }

  return (
    <>
      <Typography
        variant="bold"
        component="h1"
        sx={{ textAlign: "center", py: "10px" }}
      >
        Student List
      </Typography>

      <div style={{ width: "80%", margin: "auto", marginBottom: "20px" }}>
        <TextField
          fullWidth
          placeholder="Type student id"
          type={"search"}
          size="small"
          label="Search by student ID"
          variant="outlined"
          color="secondary"
          onChange={(e) => filterRecord(e.target.value)}
        ></TextField>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={studentList}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}
