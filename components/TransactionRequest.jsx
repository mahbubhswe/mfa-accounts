import * as React from "react";
import axios from "axios";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Snackbar,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import FadeLoader from "react-spinners/FadeLoader";
import moment from "moment";
import ClearIcon from "@mui/icons-material/Clear";
import useSWR from "swr";
import { useLocalStorage } from "@rehooks/local-storage";
import { useState } from "react";
import { useRouter } from "next/router";
const getTransactionRequest = (url) => axios.get(url).then((res) => res.data);
export default function CheckRequest() {
  const [msg, setMsg] = useState();
  const [id, setId] = useState();
  const [userName, setUserName] = useState();
  const [tansactionType, setTansactionType] = useState();
  const [amount, setAmount] = useState();
  const [show, setShow] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const { data, error } = useSWR(
    "/api/getTransactionRequest",
    getTransactionRequest
  );
  const router = useRouter();
  if (!data) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeContent: "center",
        }}
      >
        <FadeLoader size={50} color={"#001E3C"} />
      </Box>
    );
  }
  function confirmApprove(id, type, amount, userName) {
    setId(id);
    setTansactionType(type);
    setAmount(amount);
    setUserName(userName);
    setShow(true);
  }
  async function giveApprove() {
    setShow(false);
    setOpen(true);
    const { data } = await axios.put(
      "/api/changeRequestStatus",
      {
        _id: id,
        status: "approved",
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    await axios.post("/api/saveNotification", {
      username: userName,
      tansactionType: tansactionType,
      amount: amount,
    });
    setMsg(data);
    setOpen(false);
    setOpenSnackbar(true);
  }
  const clossSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <>
    
          <Divider sx={{ fontSize: "35px", fontWeight: 700 }}>
            Transaction Request
          </Divider>
          <div
            style={{ height: "100%", display: "grid", placeContent: "center" }}
          >
            <TableContainer  sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Sector</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.username}</TableCell>
                    <TableCell align="center">{item.transactionType}</TableCell>
                    <TableCell align="center">{item.sector}</TableCell>
                    <TableCell align="center">{item.amount}</TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                    <TableCell align="center">
                      {moment(item.createdAt).format("YY-MM-DD")}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          onClick={() =>
                            confirmApprove(
                              item._id,
                              item.transactionType,
                              item.amount,
                              item.username
                            )
                          }
                          startIcon={<EditAttributesIcon />}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          onClick={async () => {
                            await axios.delete(
                              `/api/cancleRequest?id=${item._id}`
                            );
                            router.reload(window.location.pathname);
                          }}
                          startIcon={<ClearIcon />}
                        >
                          Cancel
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </div>
    
      <Dialog open={show}>
        <Paper variant="none" sx={{ border: "1px solid #ccc" }}>
          <DialogTitle>
            <Typography align="center">
              <QuestionMarkIcon sx={{ fontSize: "50px", color: "#007FFF" }} />
            </Typography>
          </DialogTitle>
          <DialogTitle>
            <Divider sx={{ color: "#1A2027" }}>Are you sure?</Divider>
          </DialogTitle>

          <DialogContent>
            <DialogContentText sx={{ color: "#0A1929" }}>
              <Typography>
                Do you want to approve to complete this transaction
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                background: "red",
                color: "#ffffff",
                "&:hover": {
                  background: "#AF0100",
                },
              }}
              onClick={() => setShow(false)}
            >
              Cancle
            </Button>
            <Button
              sx={{
                background: "#0057B7",
                color: "#ffffff",
                "&:hover": {
                  background: "#007FFF",
                },
              }}
              onClick={giveApprove}
            >
              Confirm
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={clossSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{
            width: "100%",
            color: "green",
            paddingY: "20px",
            border: "1px solid #ccc",
          }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
