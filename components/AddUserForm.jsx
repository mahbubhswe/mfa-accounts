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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Backdrop,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
import axios from "axios";
export default function WithdrawForm() {
  const [userRole, setUserRole] = useState(false);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const [msg, setMsg] = useState();
  //withdrow confirmation
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setShow(true);
  };
  //withdrow
  const confirmWithDrow = async () => {
    setShow(false);
    setOpen(true);
    const apiRes = await axios.post(
      "/api/user/insertUser",
      {
        name: name,
        username: username,
        email: email,
        password: password,
        isAdmin: userRole,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    if (apiRes.status === 200) {
      setMsg(apiRes.data);
    }
    setOpen(false);
    setOpenSnackbar(true);
  };
  const clossSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <Stack
       component="form"
       onSubmit={handleSubmit}
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
          Add New User
        </Typography>
        <Divider>Enter user information Bellow</Divider>
        <TextField
          size="small"
          type="text"
          label="Enter your name"
          color="secondary"
          variant="outlined"
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
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormControl size="small" color="secondary">
          <InputLabel>Select user Role</InputLabel>
          <Select
            value={userRole}
            required
            onChange={(e) => setUserRole(e.target.value)}
          >
            <MenuItem value={true}>Admin</MenuItem>
            <MenuItem value={false}>Accounts staff</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small"
          type="email"
          label="Email address"
          color="secondary"
          variant="outlined"
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          size="small"
          type="text"
          color="secondary"
          variant="outlined"
          label="Password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          variant="outlined"
          fullWidth
          sx={{ background: "#8D94CB", color: "#000000" }}
          type="submit"
        >
          Next
        </Button>
      </Stack>

      <Dialog open={show}>
        <Paper variant="outlined" sx={{ border: "1px solid #ccc" }}>
          <DialogTitle>
            <Typography align="center">
              <InfoIcon sx={{ fontSize: "50px", color: "#007FFF" }} />
            </Typography>
          </DialogTitle>
          <DialogTitle>
            <Divider sx={{ color: "#1A2027" }}>Check User Information</Divider>
          </DialogTitle>

          <DialogContent>
            <DialogContentText sx={{ color: "#0A1929" }}>
              <Typography>Name: {name}</Typography>
              <Typography>Role: {userRole ? "Admin" : "Accounts staff"}</Typography>
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
              onClick={confirmWithDrow}
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
