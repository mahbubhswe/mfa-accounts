import {
  Button,
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
import { useLocalStorage } from "@rehooks/local-storage";
import * as React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export default function FullScreenDialog() {
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const [instalment, setInstalment] = useState("1st");
  const router = useRouter();
  const [payment, setpayment] = useState({
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
    abroadEducationalTours: 0,
    crodhingDabing: 0,
    meritimeCharge: 0,
    aboutExam: 0,
    passingOut: 0,
    retuenable: 0,
  });

  const values = Object.values(payment);
  const totalAmount = values.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  //ask for make sure
  const askForSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this instalment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        addInstalment(e);
      }
    });
  };
  //make Instalment
  const addInstalment = async (e) => {
    e.target.reset();
    setOpen(true);
    const { data } = await axios.post(
      `/api/addInstalment`,
      {
        instalment: instalment,
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
        crodhingDabing: payment.crodhingDabing,
        meritimeCharge: payment.meritimeCharge,
        aboutExam: payment.aboutExam,
        passingOut: payment.passingOut,
        retuenable: payment.retuenable,
        amount: totalAmount,
      },
      {
        headers: {
          authorization: `Barear ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Instalment added successfully!") {
      alertOnTaskDone("Success", data, "success", "Ok");
    } else if (data == "Already added instalment") {
      alertOnTaskDone(
        "Already added",
        `You have already added instalment for ${instalment} semester`,
        "warning",
        "Ok"
      );
    } else {
      alertOnTaskDone(
        "Failed! to add instalment",
        "Somethings want wrong",
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
    <div>
      <Typography
        variant="bold"
        component="h1"
        align="center"
        sx={{ color: "gray" }}
      >
        Add Instalment
      </Typography>
      <Stack onSubmit={askForSubmit} spacing={1} component="form">
        <FormControl color="secondary">
          <InputLabel color="secondary">Select Instalment</InputLabel>
          <Select
            value={instalment}
            label="Select Instalment"
            size="small"
            onChange={(e) => setInstalment(e.target.value)}
          >
            <MenuItem value="1st">1st Instalment</MenuItem>
            <MenuItem value="2nd">2nd Instalment</MenuItem>
            <MenuItem value="3rd">3rd Instalment</MenuItem>
            <MenuItem value="4th">4th Instalment</MenuItem>
            {/* <MenuItem value="5th">5th Instalment</MenuItem>
            <MenuItem value="6th">6th Instalment</MenuItem>
            <MenuItem value="7th">7th Instalment</MenuItem>
            <MenuItem value="8th">8th Instalment</MenuItem> */}
          </Select>
        </FormControl>

        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <TextField
            label="Admission Fee"
            type="number"
            placeholder="Admission Fee"
            size="small"
         
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
        
            color="secondary"
            onChange={(e) =>
              setpayment({ ...payment, tutionFee: Number(e.target.value) })
            }
          />
          <TextField
            label="Dining Charge"
            type="number"
            placeholder="Dining Charge"
            size="small"
       
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
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <TextField
            label="Hair Cutting"
            type="number"
            placeholder="Hair Cutting"
            size="small"
           
            fullWidth
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
         
            fullWidth
            color="secondary"
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
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <TextField
            label="Newspaper and Magazine Charge"
            type="number"
            placeholder="Newspaper and Magazine Charge"
            size="small"
          
            fullWidth
            color="secondary"
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
            label="Supervision Charge"
            type="number"
            placeholder="Supervision Charge"
            size="small"
         
            fullWidth
            color="secondary"
            onChange={(e) =>
              setpayment({
                ...payment,
                supervisionCharge: Number(e.target.value),
              })
            }
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <TextField
            label="Games and Sports Charge"
            type="number"
            placeholder="Games and Sports Charge"
            size="small"
          
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
        
            fullWidth
            color="secondary"
            onChange={(e) =>
              setpayment({
                ...payment,
                yearlyCeremony: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Cadet Night Charge"
            type="number"
            placeholder="Cadet Night Charge"
            size="small"
        
            fullWidth
            color="secondary"
            onChange={(e) =>
              setpayment({
                ...payment,
                cadetNightCharge: Number(e.target.value),
              })
            }
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <TextField
            label="Class Bag"
            type="number"
            placeholder="Class Bag"
            size="small"
          
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
      
            fullWidth
            color="secondary"
            onChange={(e) =>
              setpayment({
                ...payment,
                educationalTour: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Abroad Educational Tour"
            type="number"
            placeholder="Abroad Educational Tour"
            size="small"
     
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
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <TextField
            label="Crodhing Dabing Charge"
            type="number"
            placeholder="Crodhing Dabing Charge"
            size="small"
         
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
        
            fullWidth
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
        
            fullWidth
            color="secondary"
            onChange={(e) =>
              setpayment({ ...payment, aboutExam: Number(e.target.value) })
            }
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <TextField
            label="Passing Out Fee"
            type="number"
            placeholder="Passing Out Fee"
            size="small"
           
            fullWidth
            color="secondary"
            onChange={(e) =>
              setpayment({ ...payment, passingOut: Number(e.target.value) })
            }
          />
          <TextField
            label="Kashanmani"
            type="number"
            placeholder="Kashanmani(Retuenable)"
            size="small"
       
            fullWidth
            color="secondary"
            onChange={(e) =>
              setpayment({ ...payment, retuenable: Number(e.target.value) })
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
            Add Instalment
          </Button>
        </div>
      </Stack>

      <Backdrop open={open}>
        <CircularProgress color="secondary"></CircularProgress>
      </Backdrop>
    </div>
  );
}
