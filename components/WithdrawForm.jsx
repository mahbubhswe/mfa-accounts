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
  const [msg, setMsg] = useState();
  const [currentBalance, setCurrentBalance] = useState();
  const [worning, setWorning] = useState(false);
  const [sector, setSector] = useState();
  const [showSector, setShowSector] = useState();
  const [amount, setAmount] = useState();
  const [show, setShow] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const [balance] = useLocalStorage("balance");

  //withdrow confirmation
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setWorning(false);
    withDrowFrom();
    setShow(true);
  };
  //withdrow
  const confirmWithDrow = async () => {
    if (Number(amount) > Number(currentBalance)) {
      setWorning(true);
      setShow(false);
      return;
    }
    setShow(false);
    setOpen(true);
    const apiRes = await axios.post(
      "/api/transaction",
      {
        sector: sector,
        amount: Number(amount),
        transactionType: "withdraw",
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
  function withDrowFrom() {
    if (sector == "admissionFee") {
      setCurrentBalance(balance.admissionFee);
      setShowSector("Admission Fee");
    } else if (sector == "tutionFee") {
      setCurrentBalance(balance.tutionFee);
      setShowSector("Tuition fees");
    } else if (sector == "diningCharge") {
      setCurrentBalance(balance.diningCharge);
      setShowSector("Dining charges");
    } else if (sector == "hairCutting") {
      setCurrentBalance(balance.hairCutting);
      setShowSector("Hair cutting");
    } else if (sector == "cablerOyaserManCharge") {
      setCurrentBalance(balance.cablerOyaserManCharge);
      setShowSector("Kabler and Wasserman charge");
    } else if (sector == "religiousCharge") {
      setCurrentBalance(balance.religiousCharge);
      setShowSector("Religious");
    } else if (sector == "newspaperMagazineCharge") {
      setCurrentBalance(balance.newspaperMagazineCharge);
      setShowSector("Daily and weekly magazines");
    } else if (sector == "establishMaintainCharge") {
      setCurrentBalance(balance.establishMaintainCharge);
      setShowSector("Establishment and Maintenance");
    } else if (sector == "supervisionCharge") {
      setCurrentBalance(balance.supervisionCharge);
      setShowSector("Supervision charges");
    } else if (sector == "gameSportCharge") {
      setCurrentBalance(balance.gameSportCharge);
      setShowSector("Games and Sports");
    } else if (sector == "yearlyCeremony") {
      setCurrentBalance(balance.yearlyCeremony);
      setShowSector("Annual cultural events");
    } else if (sector == "cadetNightCharge") {
      setCurrentBalance(balance.cadetNightCharge);
      setShowSector("Cadets Night");
    } else if (sector == "educationalTour") {
      setCurrentBalance(balance.educationalTour);
      setShowSector("Educational Tour");
    } else if (sector == "classBag") {
      setCurrentBalance(balance.classBag);
      setShowSector("Educational materials");
    } else if (sector == "crodhingDabing") {
      setCurrentBalance(balance.crodhingDabing);
      setShowSector("Clothing and Bedding");
    } else if (sector == "meritimeCharge") {
      setCurrentBalance(balance.meritimeCharge);
      setShowSector("Maritime University Fees");
    } else if (sector == "aboutExam") {
      setCurrentBalance(balance.aboutExam);
      setShowSector("Examination Charge");
    } else if (sector == "passingOut") {
      setCurrentBalance(balance.passingOut);
      setShowSector("Passing Out");
    } else if (sector == "deposit") {
      setCurrentBalance(balance.deposit);
      setShowSector("retuenable");
    }
  }
  return (
    <>
      <Stack
        onSubmit={handleSubmit}
        spacing={2}
        px={5}
        pb={3}
        sx={{
          padding: "30px",
          borderRadius: "4px",
        }}
        component="form"
      >
        <Typography
          variant="bold"
          component={"h1"}
          sx={{ color: "#222222" }}
          align="center"
        >
          Withdraw System
        </Typography>
        <Divider><Typography align="center">Enter withdraw Info bellow</Typography></Divider>
        <FormControl size="small" color="secondary">
          <InputLabel>Select</InputLabel>
          <Select
            value={sector}
            required
            onChange={(e) => setSector(e.target.value)}
          >
            <MenuItem selected value={"admissionFee"}>
              ??????????????? ??????
            </MenuItem>
            <MenuItem value={"tutionFee"}>??????????????? ??????</MenuItem>
            <MenuItem value={"diningCharge"}>?????????????????? ???????????????</MenuItem>
            <MenuItem value={"hairCutting"}>?????????????????? ???????????????</MenuItem>
            <MenuItem value={"cablerOyaserManCharge"}>
              ?????????????????? ??? ????????????????????? ??????????????? ???????????????
            </MenuItem>
            <MenuItem value={"religiousCharge"}>??????????????????????????????</MenuItem>
            <MenuItem value={"newspaperMagazineCharge"}>
              ?????????????????? ?????????????????? ??? ???????????????????????? ???????????????????????????
            </MenuItem>
            <MenuItem value={"establishMaintainCharge"}>
              ??????????????????????????????????????????????????? ??? ?????????????????????????????????
            </MenuItem>
            <MenuItem value={"supervisionCharge"}>??????????????????????????? ???????????????</MenuItem>
            <MenuItem value={"gameSportCharge"}>???????????? ???????????? ????????????????????????</MenuItem>
            <MenuItem value={"yearlyCeremony"}>
              ????????????????????? ?????????????????????????????? ????????????????????????
            </MenuItem>
            <MenuItem value={"educationalTour"}>?????????????????? ?????????</MenuItem>
            <MenuItem value={"cadetNightCharge"}>???????????????????????? ????????????</MenuItem>
            <MenuItem value={"classBag"}>?????????????????? ?????????????????????</MenuItem>
            <MenuItem value={"crodhingDabing"}>????????????????????? ??? ???????????????</MenuItem>
            <MenuItem value={"meritimeCharge"}>
              ???????????????????????? ?????????????????????????????????????????? ??????
            </MenuItem>
            <MenuItem value={"aboutExam"}>
              ????????????????????? ??????????????????????????? ???????????? ???????????????
            </MenuItem>
            <MenuItem value={"passingOut"}>?????????????????????????????? ???????????? ?????????</MenuItem>
            <MenuItem value={"retuenable"}>????????????????????????</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          type="number"
          color="secondary"
          variant="outlined"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Typography
          sx={{
            display: worning ? "block" : "none",
            color: "red",
          }}
        >
          Found insufficient balance.
          <p style={{ color: "green" }}>Balance: {currentBalance} tk</p>
        </Typography>
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
            <Divider sx={{ color: "#1A2027" }}>
              Check Withdrow Information
            </Divider>
          </DialogTitle>

          <DialogContent>
            <DialogContentText sx={{ color: "#0A1929" }}>
              <Typography>Withdrow From: {showSector}</Typography>
              <Typography>Amount: {amount} tk</Typography>
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
