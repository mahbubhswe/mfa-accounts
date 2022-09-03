import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import useSWR from "swr";
import { FadeLoader } from "react-spinners";
import Swal from "sweetalert2";
import Router from "next/router";
const getStudentList = (url) => axios.get(url).then((res) => res.data);
const getSingleInstalment = (url) => axios.get(url).then((res) => res.data);
export default function PaymentForm() {
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const [studentId, setStudentId] = useState();
  const [amount, setAmount] = useState();
  const [instalment, setInstalment] = useState("1st");
  const { data } = useSWR(
    `/api/getSingleInstalment?instalment=${instalment}`,
    getSingleInstalment
  );
  const { data: studentList } = useSWR(`/api/getStudentList`, getStudentList);

  //ask for payment
  const askForPayment = (e) => {
    e.preventDefault();
    if (instalment == data.instalment && amount == data.amount) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to process this transaction",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#115D56",
        cancelButtonColor: "#FF0000",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          e.target.reset();
          makeNewPayment();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `You need to pay ${data.amount} tk for ${data.instalment} semester `,
        confirmButtonText: "Ok",
        confirmButtonColor: "#115D56",
      });
    }
  };
  //make payment
  const makeNewPayment = async () => {
    setOpen(true);
    const apiRes = await axios.post(
      `/api/payment?id=${studentId}`,
      {
        studentId: studentId,
        detailsId: studentId,
        instalment: data.instalment,
        admissionFee: data.admissionFee,
        tutionFee: data.tutionFee,
        diningCharge: data.diningCharge,
        hairCutting: data.hairCutting,
        cablerOyaserManCharge: data.cablerOyaserManCharge,
        religiousCharge: data.religiousCharge,
        newspaperMagazineCharge: data.newspaperMagazineCharge,
        establishMaintainCharge: data.establishMaintainCharge,
        supervisionCharge: data.supervisionCharge,
        gameSportCharge: data.gameSportCharge,
        yearlyCeremony: data.yearlyCeremony,
        cadetNightCharge: data.cablerOyaserManCharge,
        classBag: data.classBag,
        educationalTour: data.educationalTour,
        abroadEducationalTours: data.abroadEducationalTours,
        crodhingDabing: data.crodhingDabing,
        meritimeCharge: data.meritimeCharge,
        aboutExam: data.aboutExam,
        passingOut: data.passingOut,
        retuenable: data.retuenable,
        amount: data.amount,
      },
      {
        headers: {
          authorization: `Barear ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (apiRes.data == "Payment Added successfully") {
      Swal.fire({
        icon: "success",
        title: "Payment success",
        text: apiRes.data,
      }).then((result) => {
        if (result.isConfirmed) {
          Router.reload();
        }
      });
    } else if (
      apiRes.data == "Student ID not exist.Please add before make a payment"
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: `Student ID ${studentId} is not exist.Please add before make a payment`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: apiRes.data,
      });
    }
  };

  if (!data || !studentList) {
    return (
      <div style={{ height: "100vh", display: "grid", placeContent: "center" }}>
        <FadeLoader size={50} color="#6DC69D" />
      </div>
    );
  }
  return (
    <>
      <Stack
        component="form"
        spacing={2}
        px={5}
        pb={3}
        sx={{
          padding: "30px",
          borderRadius: "4px",
        }}
        onSubmit={askForPayment}
      >
        <Typography flexGrow={1} align="center" variant="bold" component="h1">
          Payment System
        </Typography>
        <Divider>Enter payment information bellow</Divider>
        <FormControl fullWidth>
          <InputLabel>Select Instalment</InputLabel>
          <Select
            size="small"
            value={instalment}
            required
            color="secondary"
            onChange={(e) => setInstalment(e.target.value)}
          >
            <MenuItem value={"1st"}>1st Instalment</MenuItem>
            <MenuItem value={"2nd"}>2nd Instalment</MenuItem>
            <MenuItem value={"3rd"}>3rd Instalment</MenuItem>
            <MenuItem value={"4th"}>4th Instalment</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          value={studentId}
          size="small"
          options={studentList.map((option) => option.studentID)}
          onChange={(event, newValue) => {
            setStudentId(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} color="secondary" label="Student ID" />
          )}
        />

        <TextField
          label="Amount"
          type={"number"}
          color="secondary"
          size="small"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Button
          disabled={studentId ? (amount ? false : true) : true}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Payment
        </Button>
      </Stack>

      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
