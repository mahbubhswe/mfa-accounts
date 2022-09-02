import {
  Container,
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import moment from "moment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
import useLocalStorage from "@rehooks/local-storage";
import { useState } from "react";
const getLoan = (url) => axios.get(url).then((res) => res.data);
export default function PayDueForm() {
  const [id, setId] = useState();
  const [amount, setAmount] = useState(0);
  const [due, setDue] = useState();
  const [msg, setMsg] = useState();
  const [show, setShow] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const { data, error } = useSWR(
    `/api/getLoan?username=${userInfo.username}`,
    getLoan
  );
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
  function getConfirmation(id, due) {
    setId(id);
    setDue(due);
    setShow(true);
  }
  async function payDue() {
    if (amount > due) {
      alert(`Your due is ${due} tk. It's not possiable to pay ${amount}`);
    } else {
      setShow(false);
      setOpen(true);
      const { data } = await axios.put(
        `/api/payDue?id=${id}`,
        {
          amount: amount,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setMsg(data);
      setOpen(false);
      setOpenSnackbar(true);
    }
  }

  const clossSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <>
   
      
          <Divider>
            <Typography my={5} variant="bold" component="h2">
              Check Your Loan Status
            </Typography>
          </Divider>
          <div
            style={{ height: "100%", display: "grid", placeContent: "center" }}
          >
          <TableContainer
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Sector</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.sector}</TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell align="center">
                    {item.amount == 0 ? (
                      <span style={{ color: "green" }}>Paid</span>
                    ) : (
                      <span style={{ color: "red" }}>Unpaid</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.createdAt).format("YY-MM-DD")}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<PaymentIcon />}
                      disabled={item.amount == 0 ? true : false}
                      variant="contained"
                      onClick={() => getConfirmation(item._id, item.amount)}
                    >
                      Pay now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
          </div>
    
     
      <Dialog open={show}>
        <Paper variant="outlined" sx={{ border: "1px solid #ccc" }}>
          <DialogTitle>
            <Typography align="center" sx={{ paddingTop: "20px" }}>
              <HelpOutlineIcon sx={{ fontSize: "50px", color: "#007FFF" }} />
            </Typography>
          </DialogTitle>
          <DialogTitle>
            <Divider>Do you want to pay now?</Divider>
          </DialogTitle>
          <DialogContent sx={{ paddingTop: "10px" }}>
            <TextField
              type="number"
              label="Enter Amount"
              placeholder="Enter amount"
              onClick={(e) => setAmount(e.target.value)}
            />
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
              disabled={amount > 0 ? false : true}
              sx={{
                background: "#0057B7",
                color: "#ffffff",
                "&:hover": {
                  background: "#007FFF",
                },
              }}
              onClick={payDue}
            >
              Yes
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
