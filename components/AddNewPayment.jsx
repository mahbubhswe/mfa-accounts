import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
export default function FullScreenDialog() {
  const [openPaymentInfo, setOpenPaymentInfo] = useState(false);
  const [open, setOpen] = useState(false);
  const [apiRes, setApiRes] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const [studentId, setStudentId] = useState();
  const [instalment, setInstalment] = useState();
  const [amount, setAmount] = useState();
  function setAdmissionFee() {
    return instalment == "1st" ? 5000 : 0;
  }
  function setReligiousCharge() {
    if (instalment == "1st" || instalment == "3rd") {
      return 250;
    } else {
      return 0;
    }
  }
  function setStablishAndMaint() {
    if (instalment == "1st") {
      return 4000;
    } else if (
      instalment == "2nd" ||
      instalment == "3rd" ||
      instalment == "4th"
    ) {
      return 2000;
    }
  }
  function setMeritimeVrstyFee() {
    if (instalment == "1st") {
      return 4000;
    } else if (
      instalment == "2nd" ||
      instalment == "3rd" ||
      instalment == "4th"
    ) {
      return 3000;
    }
  }
  function setCrodingAndBadding() {
    if (instalment == "1st") {
      return 20000;
    } else if (
      instalment == "2nd" ||
      instalment == "3rd" ||
      instalment == "4th"
    ) {
      return 10000;
    }
  }
  function setGameSportCharge() {
    if (instalment == "1st" || instalment == "3rd") {
      return 500;
    } else {
      return 0;
    }
  }
  function setYearlyCeremony() {
    if (instalment == "1st" || instalment == "3rd") {
      return 500;
    } else {
      return 0;
    }
  }
  function setCadetNightCharge() {
    if (instalment == "2nd" || instalment == "4th") {
      return 1000;
    } else {
      return 0;
    }
  }
  function setClassBag() {
    return instalment == "1st" ? 1000 : 0;
  }
  function setPassingOut() {
    return instalment == "2nd" ? 3000 : 0;
  }
  function setRetuenable() {
    return instalment == "4th" ? 5000 : 0;
  }
  const makeNewPayment = async (e) => {
    e.preventDefault();
    if (amount == 83000) {
      instalment = "1st";
    } else if (amount == 66750) {
      instalment = "2nd";
    } else if (amount == 64000) {
      instalment = "3rd";
    } else if (amount == 68750) {
      instalment = "4th";
    } else {
      setOpenPaymentInfo(true);
      return;
    }

    setOpen(true);
    const { data } = await axios.post(
      `/api/payment?id=${studentId}`,
      {
        studentId: studentId,
        detailsId: studentId,
        instalment: instalment,
        amount: amount,
        admissionFee: setAdmissionFee(),
        tutionFee: 2100,
        diningCharge: 36000,
        hairCutting: 900,
        cablerOyaserManCharge: 3000,
        religiousCharge: setReligiousCharge(),
        newspaperMagazineCharge: 150,
        establishMaintainCharge: setStablishAndMaint(),
        supervisionCharge: 1500,
        gameSportCharge: setGameSportCharge(),
        yearlyCeremony: setYearlyCeremony(),
        cadetNightCharge: setCadetNightCharge(),
        classBag: setClassBag(),
        educationalTour: 2000,
        crodhingDabing: setCrodingAndBadding(),
        meritimeCharge: setMeritimeVrstyFee(),
        aboutExam: 2100,
        passingOut: setPassingOut(),
        retuenable: setRetuenable(),
      },
      {
        headers: {
          authorization: `Barear ${userInfo.token}`,
        },
      }
    );

    setApiRes(data);
    setOpen(false);
    setAmount("");
    setOpenSnackbar(true);
  };

  const classSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Paper variant="outlined">
          <form onSubmit={makeNewPayment}>
            <Stack
              spacing={2}
              sx={{ padding: "20px", border: "1px solid #ccc" }}
            >
              <Typography
                flexGrow={1}
                align="center"
                variant="bold"
                component="h2"
              >
                Enter Payment Information
              </Typography>
              <TextField
                value={studentId}
                color="secondary"
                size="small"
                label="Student ID"
                onChange={(e) => setStudentId(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>Select Instalment</InputLabel>
                <Select
                  size="small"
                  value={instalment}
                  required
                  color="secondary"
                  onChange={(e) => setInstalment(e.target.value)}
                >
                  <MenuItem value={"1st"} selected>
                    1st Instalment
                  </MenuItem>
                  <MenuItem value={"2nd"}>2nd Instalment</MenuItem>
                  <MenuItem value={"3rd"}>3rd Instalment</MenuItem>
                  <MenuItem value={"4th"}>4th Instalment</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Amount"
                type={"number"}
                color="secondary"
                size="small"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Button
                disabled={amount ? false : true}
                sx={{
                  background: "#001E3C",
                  color: "white",
                  "&:hover": {
                    background: "#0074CC",
                  },
                }}
                type="submit"
              >
                Pay Now
              </Button>

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </Stack>
          </form>
        </Paper>
      </Box>

      <Dialog open={openPaymentInfo} sx={{ border: "1px solid #ccc" }}>
        <DialogTitle>{"Please, Check Payment Requirement"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#0A1929" }}>
            Sorry, only payment amount is allowed for 83000, 66750, 64000 and
            68750 tk
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              background: "#0057B7",
              color: "#ffffff",
              "&:hover": {
                background: "#007FFF",
              },
            }}
            onClick={() => setOpenPaymentInfo(false)}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={classSnackbar}
        message={apiRes}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={
            apiRes == `Student ID not exist.Please add before make a payment`
              ? "info"
              : "success"
          }
          sx={{
            width: "100%",
            color: "green",
            paddingY: "20px",
            border: "1px solid #ccc",
          }}
        >
          {apiRes}
        </Alert>
      </Snackbar>
    </>
  );
}
