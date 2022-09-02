import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Dialog,
  IconButton,
  Slide,
  Button,
  Paper,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
  ButtonGroup,
  Divider,
} from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import StudentPaymentDetails from "./StudentPaymentDetails";
import { useLocalStorage } from "@rehooks/local-storage";
import UpdateStudentDetails from "./UpdateStudentDetails";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ShowStudentList({ data }) {
  const [studentList, setStudentList] = React.useState(data);
  const [snackbarTex, setSnackbarTex] = useState();
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  let [detailsId, setDetailsId] = useState();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editID, setEditID] = useState(false);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");
  const columns = React.useMemo(
    () => [
      { field: "studentID", headerName: "Student ID", width: "200" },
      { field: "name", headerName: "Name", width: "200" },
      { field: "email", headerName: "E-mail", width: "200" },
      { field: "batch", headerName: "Batch", width: "200" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
        renderCell: (params) => moment(params.row.createdAt).format("YY-MM-DD"),
      },

      // {
      //   field: "detailsId",
      //   headerName: "Details",
      //   width: "200",
      //   renderCell: (params) => {
      //     return (
      //       <IconButton
      //         variant="contained"
      //         sx={{ color: "#73C9A7" }}
      //         onClick={() => handleOpenDetails(params.row.detailsId)}
      //       >
      //         <DetailsIcon />
      //       </IconButton>
      //     );
      //   },
      // },
      // {
      //   field: "_id",
      //   headerName: "Action",
      //   width: "200",
      //   renderCell: (params) => {
      //     return (
      //       <ButtonGroup>
      //         <IconButton
      //           variant="contained"
      //           sx={{ color: "#E15963" }}
      //           disabled={userInfo.isAdmin == "true" ? false : true}
      //           onClick={() => deleteAlert(params.row._id)}
      //         >
      //           <DeleteIcon />
      //         </IconButton>
      //         <IconButton
      //           variant="contained"
      //           sx={{ color: "#015B80" }}
      //           disabled={userInfo.isAdmin == "true" ? false : true}
      //           onClick={() => handleUpdateOpenDetails(params.row._id)}
      //         >
      //           <EditIcon />
      //         </IconButton>
      //       </ButtonGroup>
      //     );
      //   },
      // },
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
  // //delete alert
  // function deleteAlert(id) {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to delete this record.",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.value) {
  //       deleteRecord(id);
  //     }
  //   });
  // }
  //set alert information
  // function alertOnTaskDone(title, text, icon, confirmButtonText) {
  //   Swal.fire({
  //     title: title,
  //     text: text,
  //     icon: icon,
  //     confirmButtonColor: "#3085d6",
  //     confirmButtonText: confirmButtonText,
  //   }).then((result) => {
  //     if (result.value) {
  //       router.reload(window.location.pathname);
  //     }
  //   });
  // }
  //delete decord
  // async function deleteRecord(id) {
  //   setBackdropOpen(true);
  //   const apiRes = await axios.delete(`/api/deleteRecord?id=${id}`, {
  //     headers: {
  //       authorization: `Bearer ${userInfo.token}`,
  //     },
  //   });
  //   if (apiRes.status === 200) {
  //     setBackdropOpen(false);
  //     alertOnTaskDone(
  //       "Record deleted",
  //       "This record has been deleted successfully!",
  //       "success",
  //       "Ok"
  //     );
  //   } else {
  //     alertOnTaskDone(
  //       "Somethings want wrong!",
  //       "Please try again later",
  //       "error",
  //       "Ok"
  //     );
  //   }
  // }
  //open update dailog
  // const handleSetOpenEdit = () => {
  //   setOpenEdit(false);
  //   router.reload(window.location.pathname);
  // };
  // const handleUpdateOpenDetails = (id) => {
  //   setEditID(id);
  //   setOpenEdit(true);
  // };
  //show dailog
  // const handleOpenDetails = (id) => {
  //   setDetailsId(id);
  //   setOpen(true);
  // };
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
       
      {/* <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(!open)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#0D1013" }}>
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              align="center"
            >
              Student List
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <StudentPaymentDetails studentId={detailsId} />
      </Dialog> */}
      {/* <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message={snackbarTex}
      /> */}

      {/* edit dialog */}
      {/* <Dialog
        fullScreen
        open={openEdit}
        onClose={() => setOpenEdit(!openEdit)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#0D1013" }}>
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              align="center"
            >
              Update Payment Record
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleSetOpenEdit(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <UpdateStudentDetails id={editID} />
      </Dialog> */}
    </>
  );
}
