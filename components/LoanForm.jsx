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
  const [sector, setSector] = useState();
  const [showSector, setShowSector] = useState();
  const [amount, setAmount] = useState();
  const [show, setShow] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentBalance, setCurrentBalance] = useState();
  const [worning, setWorning] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const [balance] = useLocalStorage("balance");
  //withdrow confirmation
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setWorning(false);
    loanFrom();
    setShow(true);
  };
  //withdrow
  const confirmLoan = async () => {
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
        transactionType: "loan",
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
  function loanFrom() {
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
          component="form"
        >
          <Typography
            variant="bold"
            component={"h1"}
            sx={{ color: "#222222" }}
            align="center"
          >
            Loan System
          </Typography>
          <Divider>Enter loan Info bellow</Divider>
          <FormControl size="small" color="secondary">
            <InputLabel>Select</InputLabel>
            <Select
              value={sector}
              required
              onChange={(e) => setSector(e.target.value)}
            >
              <MenuItem selected value={"admissionFee"}>
                ভর্তি ফি
              </MenuItem>
              <MenuItem value={"tutionFee"}>টিউশন ফি</MenuItem>
              <MenuItem value={"diningCharge"}>ডাইনিং চার্জ</MenuItem>
              <MenuItem value={"hairCutting"}>হেয়ার কাটিং</MenuItem>
              <MenuItem value={"cablerOyaserManCharge"}>
                কাবলার ও ওয়াসার ম্যান চার্জ
              </MenuItem>
              <MenuItem value={"religiousCharge"}>রিলিজিয়াস</MenuItem>
              <MenuItem value={"newspaperMagazineCharge"}>
                দ‌ৈনিক প‌এিকা ও সপ্তাহিক ম্যাগাজিন
              </MenuItem>
              <MenuItem value={"establishMaintainCharge"}>
                স্ট্যাবলিশম্যান্ট ও মেইনটেনেন্স
              </MenuItem>
              <MenuItem value={"supervisionCharge"}>সুপারভিশন চার্জ</MenuItem>
              <MenuItem value={"gameSportCharge"}>গেমস এন্ড স্পোর্টস</MenuItem>
              <MenuItem value={"yearlyCeremony"}>
                বার্ষিক সাংস্কৃতিক অনুষ্ঠান
              </MenuItem>
              <MenuItem value={"educationalTour"}>শিক্ষা সফর</MenuItem>
              <MenuItem value={"cadetNightCharge"}>ক্যাডেটস নাইট</MenuItem>
              <MenuItem value={"classBag"}>শিক্ষা সামগ্রী</MenuItem>
              <MenuItem value={"crodhingDabing"}>ক্লোদিং ও বেডিং</MenuItem>
              <MenuItem value={"meritimeCharge"}>
                মেরিটাইম বিশ্ববিদ্যালয় ফি
              </MenuItem>
              <MenuItem value={"aboutExam"}>
                পরীক্ষা সংক্রান্ত বিধি ব্যয়
              </MenuItem>
              <MenuItem value={"passingOut"}>আনুষ্ঠানিক পসিং আউট</MenuItem>
              <MenuItem value={"retuenable"}>কশানমানি</MenuItem>
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
            <Divider sx={{ color: "#1A2027" }}>Check Loan Information</Divider>
          </DialogTitle>

          <DialogContent>
            <DialogContentText sx={{ color: "#0A1929" }}>
              <Typography>Loan From: {showSector}</Typography>
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
              onClick={confirmLoan}
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
