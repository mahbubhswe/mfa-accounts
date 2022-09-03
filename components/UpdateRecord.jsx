import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useLocalStorage from "@rehooks/local-storage";
import axios from "axios";
import Router from "next/router";
import * as React from "react";
import { useState } from "react";
export default function UpdateRecord({ data }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [studentId, setStudentId] = useState(data.studentId);
  const [selectInstalment, setSelectInstalment] = useState(data.instalment);
  const [userInfo] = useLocalStorage("userInfo");
  const [payment, setpayment] = useState({
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
    cadetNightCharge: data.cadetNightCharge,
    classBag: data.classBag,
    educationalTour: data.educationalTour,
    abroadEducationalTours: data.abroadEducationalTours,
    crodhingDabing: data.crodhingDabing,
    meritimeCharge: data.meritimeCharge,
    aboutExam: data.aboutExam,
    passingOut: data.passingOut,
    retuenable: data.retuenable,
  });

  //calculate amount
  const values = Object.values(payment);
  const totalAmount = values.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  //ask for update
  const askForUpdate = async (e) => {
    e.preventDefault();
    setShow(true);
  };
  //update
  const updateRecord = async (e) => {
    setShow(false);
    setOpen(true);
    const apiRes = await axios.put(
      `/api/updatePayment?_id=${data._id}&userEmail=${data.email}`,
      {
        studentId: studentId,
        detailsId: studentId,
        instalment: selectInstalment,
        amount: totalAmount,
        admissionFee: payment.admissionFee,
        tutionFee: payment.tutionFee,
        diningCharge: payment.diningCharge,
        hairCutting: payment.hairCutting,
        cablerOyaserManCharge: payment.cablerOyaserManCharge,
        religiousCharge: payment.religiousCharge,
        newspaperMagazineCharge: payment.newspaperMagazineCharge,
        establishMaintainCharge: payment.establishMaintainCharge,
        supervisionCharge: payment.supervisionCharge,
        gameSportCharge: payment.gameSportCharge,
        yearlyCeremony: payment.yearlyCeremony,
        cadetNightCharge: payment.cadetNightCharge,
        classBag: payment.classBag,
        educationalTour: payment.educationalTour,
        abroadEducationalTours: payment.abroadEducationalTours,
        crodhingDabing: payment.crodhingDabing,
        meritimeCharge: payment.meritimeCharge,
        aboutExam: payment.aboutExam,
        passingOut: payment.passingOut,
        retuenable: payment.retuenable,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setMsg(apiRes.data);
    setOpenSnackbar(true);
    setOpen(false);
  };

  const clossSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    Router.reload();
  };
  return (
    <>
      <div style={{ background: "#F4F4F4", padding: "20px 0px" }}>
        <Container sx={{ borderRadius: "25px" }}>
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
              Payment Update
            </Typography>
            <Stack onSubmit={askForUpdate} spacing={1} component="form">
              <FormControl color="secondary">
                <InputLabel color="secondary">
                  {selectInstalment + " Instalment"}
                </InputLabel>
                <Select
                  value={selectInstalment}
                  label="Select Instalment"
                  disabled
                  size="small"
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
                disabled
                value={studentId}
                color="secondary"
                onChange={(e) => setStudentId(e.target.value)}
              />
              <Stack
                direction={{ xs: "column", sm: "row", md: "row" }}
                spacing={1}
              >
                <TextField
                  label="Admission Fee"
                  type="number"
                  placeholder="Admission Fee"
                  size="small"
                  value={payment.admissionFee}
                  required
                  color="secondary"
                  fullWidth
                  onChange={(e) =>
                    setpayment({
                      ...payment,
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
                  value={payment.tutionFee}
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      tutionFee: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label="Dining Charge"
                  type="number"
                  placeholder="Dining Charge"
                  size="small"
                  value={payment.diningCharge}
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
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
                  label="Hair Cutting"
                  type="number"
                  placeholder="Hair Cutting"
                  size="small"
                  required
                  fullWidth
                  value={payment.hairCutting}
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
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
                  value={payment.cablerOyaserManCharge}
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      cablerOyaserManCharge: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label="Religious Charge"
                  type="number"
                  placeholder="Religious Charge"
                  size="small"
                  value={payment.religiousCharge}
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      religiousCharge: Number(e.target.value),
                    })
                  }
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row", md: "row" }}
                spacing={1}
              >
                <TextField
                  label="Newspaper and Magazine Charge"
                  type="number"
                  placeholder="Newspaper and Magazine Charge"
                  size="small"
                  required
                  fullWidth
                  color="secondary"
                  value={payment.newspaperMagazineCharge}
                  onChange={(e) =>
                    setpayment({
                      ...payment,
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
                  value={payment.establishMaintainCharge}
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      establishMaintainCharge: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label="Abroad Educational Tour"
                  type="number"
                  placeholder="Abroad Educational Tour"
                  size="small"
                  value={payment.abroadEducationalTours}
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      abroadEducationalTours: Number(e.target.value),
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
                  value={payment.supervisionCharge}
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      supervisionCharge: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label="Games and Sports Charge"
                  type="number"
                  placeholder="Games and Sports Charge"
                  size="small"
                  value={payment.gameSportCharge}
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      gameSportCharge: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label="Yearly Ceremony Charge"
                  type="number"
                  placeholder="Yearly Ceremony Charge"
                  size="small"
                  required
                  fullWidth
                  color="secondary"
                  value={payment.yearlyCeremony}
                  onChange={(e) =>
                    setpayment({
                      ...payment,
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
                  label="Cadet Night Charge"
                  type="number"
                  placeholder="Cadet Night Charge"
                  size="small"
                  value={payment.cadetNightCharge}
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      cadetNightCharge: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label="Class Bag"
                  value={payment.classBag}
                  type="number"
                  placeholder="Class Bag"
                  size="small"
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({ ...payment, classBag: Number(e.target.value) })
                  }
                />
                <TextField
                  label="Educational Tour"
                  type="number"
                  placeholder="Educational Tour"
                  size="small"
                  value={payment.educationalTour}
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
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
                  value={payment.crodhingDabing}
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
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
                  value={payment.meritimeCharge}
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
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
                  value={payment.aboutExam}
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      aboutExam: Number(e.target.value),
                    })
                  }
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row", md: "row" }}
                spacing={1}
              >
                <TextField
                  label="Passing Out Fee"
                  type="number"
                  value={payment.passingOut}
                  placeholder="Passing Out Fee"
                  size="small"
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      passingOut: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label="Kashanmani"
                  type="number"
                  value={payment.retuenable}
                  placeholder="Kashanmani(Retuenable)"
                  size="small"
                  required
                  fullWidth
                  color="secondary"
                  onChange={(e) =>
                    setpayment({
                      ...payment,
                      retuenable: Number(e.target.value),
                    })
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
                  Update
                </Button>
              </div>
            </Stack>
          </Paper>
        </Container>

        <Backdrop open={open}>
          <CircularProgress color="secondary"></CircularProgress>
        </Backdrop>
      </div>

      <Dialog open={show} sx={{ border: "1px solid #ccc" }}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#0A1929" }}>
            Do you sure want to update now
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" size="small" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            color="secondary"
            onClick={() => updateRecord()}
            variant="contained"
            size="small"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={clossSnackbar}
        message={msg}
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
    </>
  );
}
