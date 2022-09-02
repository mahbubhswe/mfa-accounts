import { Button, Stack, TextField, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useLocalStorage } from "@rehooks/local-storage";
import * as React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
const getSingleInstalment = (url) => axios.get(url).then((res) => res.data);
export default function UpdateInstalmentForm() {
  const [open, setOpen] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  const { instalment } = router.query;

  const { data } = useSWR(
    `/api/getSingleInstalment?instalment=${instalment}`,
    getSingleInstalment
  );

  const [updateInstalment, setUpdateInstalment] = useState({
    admissionFee: data ? data.admissionFee : 0,
    tutionFee: data ? data.tutionFee : 0,
    diningCharge: data ? data.diningCharge : 0,
    hairCutting: data ? data.hairCutting : 0,
    cablerOyaserManCharge: data ? data.cablerOyaserManCharge : 0,
    religiousCharge: data ? data.religiousCharge : 0,
    newspaperMagazineCharge: data ? data.newspaperMagazineCharge : 0,
    establishMaintainCharge: data ? data.establishMaintainCharge : 0,
    supervisionCharge: data ? data.supervisionCharge : 0,
    gameSportCharge: data ? data.gameSportCharge : 0,
    yearlyCeremony: data ? data.yearlyCeremony : 0,
    cadetNightCharge: data ? data.cadetNightCharge : 0,
    classBag: data ? data.classBag : 0,
    educationalTour: data ? data.educationalTour : 0,
    abroadEducationalTours: data ? data.abroadEducationalTours : 0,
    crodhingDabing: data ? data.crodhingDabing : 0,
    meritimeCharge: data ? data.meritimeCharge : 0,
    aboutExam: data ? data.aboutExam : 0,
    passingOut: data ? data.passingOut : 0,
    retuenable: data ? data.retuenable : 0,
    amount: data ? data.amount : 0,
  });

  const values = Object.values(updateInstalment);
  const totalAmount = values.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  //ask for make sure
  const askForSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this instalment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        UpdateInstalment(e);
      }
    });
  };
  //Update Instalment
  const UpdateInstalment = async (e) => {
    e.target.reset();
    console.log(data);
    console.log(data._id);
    setOpen(true);
    const { data } = await axios.put(
      `/api/updateInstalment?id=${data._id}`,
      {
        admissionFee: updateInstalment.admissionFee,
        tutionFee: updateInstalment.tutionFee,
        diningCharge: updateInstalment.diningCharge,
        hairCutting: updateInstalment.hairCutting,
        cablerOyaserManCharge: updateInstalment.cablerOyaserManCharge,
        religiousCharge: updateInstalment.religiousCharge,
        newspaperMagazineCharge: updateInstalment.newspaperMagazineCharge,
        establishMaintainCharge: updateInstalment.establishMaintainCharge,
        supervisionCharge: updateInstalment.supervisionCharge,
        gameSportCharge: updateInstalment.gameSportCharge,
        yearlyCeremony: updateInstalment.yearlyCeremony,
        cadetNightCharge: updateInstalment.cadetNightCharge,
        classBag: updateInstalment.classBag,
        educationalTour: updateInstalment.educationalTour,
        crodhingDabing: updateInstalment.crodhingDabing,
        meritimeCharge: updateInstalment.meritimeCharge,
        aboutExam: updateInstalment.aboutExam,
        passingOut: updateInstalment.passingOut,
        retuenable: updateInstalment.retuenable,
        amount: totalAmount,
      },
      {
        headers: {
          authorization: `Barear ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Instalment updeted successfully!") {
      alertOnTaskDone("Success", data, "success", "Ok");
    } else {
      alertOnTaskDone(
        "Failed! to update instalment",
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
        router.push("/accounts/instalment/manage");
      }
    });
  }

  if (!data) {
    <div style={{ height: "100%", display: "grid", placeholder: "center" }}>
      <FadeLoader />
    </div>;
  }

  return (
    <div>
      <Typography
        variant="bold"
        component="h1"
        align="center"
        sx={{ color: "gray" }}
      >
        Update Instalment
      </Typography>
      <Stack onSubmit={askForSubmit} spacing={1} component="form">
        <TextField
          type="text"
          size="small"
          disabled
          color="secondary"
          fullWidth
          value={data ? data.instalment : null}
        />
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <TextField
            label="Admission Fee"
            type="number"
            placeholder="Admission Fee"
            size="small"
            color="secondary"
            fullWidth
            value={updateInstalment.admissionFee}
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.tutionFee}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
                tutionFee: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Dining Charge"
            type="number"
            placeholder="Dining Charge"
            size="small"
            fullWidth
            value={updateInstalment.diningCharge}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.hairCutting}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.cablerOyaserManCharge}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.religiousCharge}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.newspaperMagazineCharge}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.establishMaintainCharge}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.supervisionCharge}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.gameSportCharge}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.yearlyCeremony}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.cadetNightCharge}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.classBag}
            fullWidth
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
                classBag: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Educational Tour"
            type="number"
            placeholder="Educational Tour"
            size="small"
            fullWidth
            value={updateInstalment.educationalTour}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.abroadEducationalTours}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            value={updateInstalment.crodhingDabing}
            fullWidth
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
                crodhingDabing: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Maritime Fee"
            type="number"
            placeholder="Maritime Fee"
            size="small"
            value={updateInstalment.meritimeCharge}
            fullWidth
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
                meritimeCharge: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Exam Fee"
            type="number"
            placeholder="Exam Fee"
            size="small"
            value={updateInstalment.aboutExam}
            fullWidth
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
                aboutExam: Number(e.target.value),
              })
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
            value={updateInstalment.passingOut}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
                passingOut: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Kashanmani"
            type="number"
            placeholder="Kashanmani(Retuenable)"
            size="small"
            fullWidth
            value={updateInstalment.retuenable}
            color="secondary"
            onChange={(e) =>
              setUpdateInstalment({
                ...updateInstalment,
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
            disabled={userInfo.isAdmin  ? false : true}
          >
            Update
          </Button>
        </div>
      </Stack>

      <Backdrop open={open}>
        <CircularProgress color="secondary"></CircularProgress>
      </Backdrop>
    </div>
  );
}
