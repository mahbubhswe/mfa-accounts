import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
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
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function FullScreenDialog() {
  const [open, setOpen] = useState(false);
  const [selectInstalment, setSelectInstalment] = useState("select");
  const [userInfo] = useLocalStorage("userInfo");
  const [selectedInstalment] = useLocalStorage("selectedInstalment");
  const [studentId, setStudentId] = useState(false);
  const router = useRouter();
  const [paymnet, setPaymnet] = useState({
    admissionFee: 0,
    tutionFee: 0,
    diningCharge: 0,
    hairCutting: 0,
    cablerOyaserManCharge: 0,
    religiousCharge: 0,
    newspaperMagazineCharge: 0,
    establishMaintainCharge: 0,
    supervisionCharge: 0,
    gameSportCharge: 0,
    yearlyCeremony: 0,
    cadetNightCharge: 0,
    classBag: 0,
    educationalTour: 0,
    crodhingDabing: 0,
    meritimeCharge: 0,
    aboutExam: 0,
    passingOut: 0,
    retuenable: 0,
  });

  const values = Object.values(paymnet);
  const totalAmount = values.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  useEffect(() => {
    setSelectInstalment(selectedInstalment);
  });
  const selectHandler = (e) => {
    const inst = e.target.value;
    writeStorage("selectedInstalment", inst);
    router.reload(window.location.pathname);
  };
  //ask for make sure
  const askForPayment = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to process this transaction?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        makeNewPayment();
      }
    });
  };
  //make payment
  const makeNewPayment = async (e) => {
    setOpen(true);
    const { data } = await axios.post(
      `/api/payment?id=${studentId}`,
      {
        studentId: studentId,
        detailsId: studentId,
        instalment: selectInstalment,
        amount: totalAmount,
        admissionFee: paymnet.admissionFee,
        tutionFee: paymnet.tutionFee,
        diningCharge: paymnet.diningCharge,
        hairCutting: paymnet.hairCutting,
        cablerOyaserManCharge: paymnet.cablerOyaserManCharge,
        religiousCharge: paymnet.religiousCharge,
        newspaperMagazineCharge: paymnet.newspaperMagazineCharge,
        establishMaintainCharge: paymnet.establishMaintainCharge,
        supervisionCharge: paymnet.supervisionCharge,
        gameSportCharge: paymnet.gameSportCharge,
        yearlyCeremony: paymnet.yearlyCeremony,
        cadetNightCharge: paymnet.cadetNightCharge,
        classBag: paymnet.classBag,
        educationalTour: paymnet.educationalTour,
        crodhingDabing: paymnet.crodhingDabing,
        meritimeCharge: paymnet.meritimeCharge,
        aboutExam: paymnet.aboutExam,
        passingOut: paymnet.passingOut,
        retuenable: paymnet.retuenable,
      },
      {
        headers: {
          authorization: `Barear ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Payment Added successfully") {
      alertOnTaskDone(
        "Transaction success",
        "Transaction has been processed successfully!",
        "success",
        "Ok"
      );
    } else {
      alertOnTaskDone(
        "Transaction failed!",
        "Student ID not exist. Please add before make a payment",
        "error",
        "Ok"
      );
    }
  };

  //set alert information
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
  return (
    <div style={{ background: "#F4F4F4", padding: "20px 0px" }}>
      <Container sx={{borderRadius:"25px"}}>
        <Paper
          sx={{ width: "99%", marginX: "auto", padding: "20px", mt: "6px" }}
          variant="none"
        >
          <Typography
            variant="bold"
            component="h1"
            align="center"
            sx={{ color: "gray" }}
          >
            Payment System
          </Typography>
          <Stack onSubmit={askForPayment} spacing={1} component="form">
            <FormControl color="secondary">
              <InputLabel color="secondary">
                {selectInstalment + " Instalment"}
              </InputLabel>
              <Select
                value={selectInstalment}
                label="Select Instalment"
                
                size="small"
                onChange={selectHandler}
              >
                <MenuItem value="1st">1st Instalment</MenuItem>
                <MenuItem value="2nd">2nd Instalment</MenuItem>
                <MenuItem value="3rd">3rd Instalment</MenuItem>
                <MenuItem value="4th">4th Instalment</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Student ID"
              type="text"
              placeholder="Type student ID"
              size="small"
              required
              color="secondary"
              onChange={(e) => setStudentId(e.target.value)}
            />
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              spacing={1}
            >
              <TextField
                sx={{
                  display:
                    selectInstalment == "2nd" ||
                    (selectInstalment == "3rd") | (selectInstalment == "4th")
                      ? "none"
                      : "block",
                }}
                label="Admission Fee"
                type="number"
                placeholder="Admission Fee"
                size="small"
                required={
                  selectInstalment == "2nd" ||
                  (selectInstalment == "3rd") | (selectInstalment == "4th")
                    ? false
                    : true
                }
                color="secondary"
                fullWidth
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    admissionFee: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Tution Fee"
                type="number"
                placeholder="Tution Fee"
                size="small"
                fullWidth
                required
                color="secondary"
                onChange={(e) =>
                  setPaymnet({ ...paymnet, tutionFee: Number(e.target.value) })
                }
              />
              <TextField
                sx={{
                  display:
                    selectInstalment == "2nd" ||
                    (selectInstalment == "3rd") | (selectInstalment == "4th")
                      ? "none"
                      : "block",
                }}
                label="Dining Charge"
                type="number"
                placeholder="Dining Charge"
                size="small"
                required={
                  selectInstalment == "2nd" ||
                  (selectInstalment == "3rd") | (selectInstalment == "4th")
                    ? false
                    : true
                }
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    diningCharge: Number(e.target.value),
                  })
                }
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              spacing={1}
            >
              <TextField
                label="Dining Charge"
                type="number"
                placeholder="Dining Charge"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    diningCharge: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Hair Cutting"
                type="number"
                placeholder="Hair Cutting"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    hairCutting: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Cabler and Oyaser Man Charge"
                type="number"
                placeholder="Cabler and Oyaser Man Charge"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    cablerOyaserManCharge: Number(e.target.value),
                  })
                }
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              spacing={1}
            >
              <TextField
                sx={{
                  display:
                    selectInstalment == "2nd" || selectInstalment == "4th"
                      ? "none"
                      : "block",
                }}
                label="Religious Charge"
                type="number"
                placeholder="Religious Charge"
                size="small"
                required={
                  selectInstalment == "2nd" || selectInstalment == "4th"
                    ? false
                    : true
                }
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    religiousCharge: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Newspaper and Magazine Charge"
                type="number"
                placeholder="Newspaper and Magazine Charge"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    newspaperMagazineCharge: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Establish and Maintain Charge"
                type="number"
                placeholder="Establish and Maintain Charge"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    establishMaintainCharge: Number(e.target.value),
                  })
                }
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              spacing={1}
            >
              <TextField
                label="Supervision Charge"
                type="number"
                placeholder="Supervision Charge"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    supervisionCharge: Number(e.target.value),
                  })
                }
              />
              <TextField
                sx={{
                  display:
                    selectInstalment == "2nd" || selectInstalment == "4th"
                      ? "none"
                      : "block",
                }}
                label="Games and Sports Charge"
                type="number"
                placeholder="Games and Sports Charge"
                size="small"
                required={
                  selectInstalment == "2nd" || selectInstalment == "4th"
                    ? false
                    : true
                }
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    gameSportCharge: Number(e.target.value),
                  })
                }
              />
              <TextField
                sx={{
                  display:
                    selectInstalment == "2nd" || selectInstalment == "4th"
                      ? "none"
                      : "block",
                }}
                label="Yearly Ceremony Charge"
                type="number"
                placeholder="Yearly Ceremony Charge"
                size="small"
                required={
                  selectInstalment == "2nd" || selectInstalment == "4th"
                    ? false
                    : true
                }
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    yearlyCeremony: Number(e.target.value),
                  })
                }
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              spacing={1}
            >
              <TextField
                sx={{
                  display:
                    selectInstalment == "1st" || selectInstalment == "3rd"
                      ? "none"
                      : "block",
                }}
                label="Cadet Night Charge"
                type="number"
                placeholder="Cadet Night Charge"
                size="small"
                required={
                  selectInstalment == "1st" || selectInstalment == "3rd"
                    ? false
                    : true
                }
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    cadetNightCharge: Number(e.target.value),
                  })
                }
              />
              <TextField
                sx={{
                  display:
                    selectInstalment == "2nd" ||
                    selectInstalment == "3rd" ||
                    selectInstalment == "4th"
                      ? "none"
                      : "block",
                }}
                label="Class Bag"
                type="number"
                placeholder="Class Bag"
                size="small"
                required={
                  selectInstalment == "2nd" ||
                  selectInstalment == "3rd" ||
                  selectInstalment == "4th"
                    ? false
                    : true
                }
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({ ...paymnet, classBag: Number(e.target.value) })
                }
              />
              <TextField
                label="Educational Tour"
                type="number"
                placeholder="Educational Tour"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    educationalTour: Number(e.target.value),
                  })
                }
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              spacing={1}
            >
              <TextField
                label="Crodhing Dabing Charge"
                type="number"
                placeholder="Crodhing Dabing Charge"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    crodhingDabing: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Maritime Fee"
                type="number"
                placeholder="Maritime Fee"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({
                    ...paymnet,
                    meritimeCharge: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Exam Fee"
                type="number"
                placeholder="Exam Fee"
                size="small"
                required
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({ ...paymnet, aboutExam: Number(e.target.value) })
                }
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row", md: "row" }}
              spacing={1}
            >
              <TextField
                sx={{
                  display:
                    selectInstalment == "1st" ||
                    selectInstalment == "3rd" ||
                    selectInstalment == "4th"
                      ? "none"
                      : "block",
                }}
                label="Passing Out Fee"
                type="number"
                placeholder="Passing Out Fee"
                size="small"
                required={
                  selectInstalment == "1st" ||
                  selectInstalment == "3rd" ||
                  selectInstalment == "4th"
                    ? false
                    : true
                }
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({ ...paymnet, passingOut: Number(e.target.value) })
                }
              />
              <TextField
                sx={{
                  display:
                    selectInstalment == "1st" ||
                    selectInstalment == "2nd" ||
                    selectInstalment == "3rd"
                      ? "none"
                      : "block",
                }}
                label="Kashanmani"
                type="number"
                placeholder="Kashanmani(Retuenable)"
                size="small"
                required={
                  selectInstalment == "1st" ||
                  selectInstalment == "2nd" ||
                  selectInstalment == "3rd"
                    ? false
                    : true
                }
                fullWidth
                color="secondary"
                onChange={(e) =>
                  setPaymnet({ ...paymnet, retuenable: Number(e.target.value) })
                }
              />
            </Stack>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>
                <span style={{ color: "green" }}>Total Amount: </span>
                {totalAmount ? totalAmount : 0}
              </Typography>
              <Button
                type="submit"
                size="small"
                color="secondary"
                variant="contained"
              >
                Payment
              </Button>
            </div>
          </Stack>
        </Paper>
      </Container>

      <Backdrop open={open}>
        <CircularProgress color="secondary"></CircularProgress>
      </Backdrop>
    </div>
  );
}
