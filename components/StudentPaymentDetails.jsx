import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import FadeLoader from "react-spinners/FadeLoader";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
const getPaymentDetails = (url) => axios.get(url).then((res) => res.data);
const getStudentDetails = (url) => axios.get(url).then((res) => res.data);
export default function StudentPaymentDetails({ studentId }) {
  const [instmn, setInstmn] = useState("1st");
  const { data, error } = useSWR(
    `/api/getPaymentDetails?id=${studentId}&instmn=${instmn}`,
    getPaymentDetails
  );
  const { data: studentDetails, error: sEr } = useSWR(
    `/api/getStudentDetails?id=${studentId}`,
    getStudentDetails
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

  async function handleChange(event) {
    setInstmn(event.target.value);
  }
  function formateDate(x) {
    let date = new Date(x);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return `${year}-${month}-${dt}`;
  }

  return (
    <Paper variant="outlined" sx={{ padding: "20px" }}>
      <Stack
        direction={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        spacing={3}
      >
        <Typography>Semester:</Typography>
        <FormControl size="small" color="secondary">
          <Select
            sx={{ width: "200px" }}
            value={instmn}
            onChange={handleChange}
          >
            <MenuItem value="1st">1st Semester</MenuItem>
            <MenuItem value="2nd">2nd Semester</MenuItem>
            <MenuItem value="3rd">3rd Semester</MenuItem>
            <MenuItem value="4th">4th Semester</MenuItem>
          </Select>
        </FormControl>
        <Typography>Student ID: {studentId}</Typography>
        <Typography>Name: {studentDetails?studentDetails.name?studentDetails.name:null:null}</Typography>
        <Typography>Amount: {data.length > 0 ? data[0].amount : 0}</Typography>
        <Typography>
          Payment Date:{" "}
          {formateDate(data.length > 0 ? data[0].createdAt : new Date())}
        </Typography>
      </Stack>
      <Divider sx={{ marginY: "20px" }}></Divider>
      {data.length > 0 ? (
        data.map((item) => (
          <Stack spacing={2} key={item._id}>
            <Typography>ভর্তি ফি: {item.admissionFee}</Typography>
            <Typography>টিউশন ফি: {item.tutionFee}</Typography>
            <Typography>ডাইনিং চার্জ: {item.diningCharge}</Typography>
            <Typography>হেয়ার কাটিং: {item.hairCutting}</Typography>
            <Typography>
              কাবলার ও ওয়াসার ম্যান চার্জ: {item.cablerOyaserManCharge}
            </Typography>
            <Typography>রিলিজিয়াস: {item.religiousCharge}</Typography>
            <Typography>
              দ‌ৈনিক প‌এিকা ও সপ্তাহিক ম্যাগাজিন: {item.newspaperMagazineCharge}
            </Typography>
            <Typography>
              স্ট্যাবলিশম্যান্ট ও মেইনটেনেন্স: {item.establishMaintainCharge}
            </Typography>
            <Typography>সুপারভিশন চার্জ: {item.supervisionCharge}</Typography>
            <Typography>গেমস এন্ড স্পোর্টস: {item.gameSportCharge}</Typography>
            <Typography>
              বার্ষিক সাংস্কৃতিক অনুষ্ঠান: {item.yearlyCeremony}
            </Typography>
            <Typography>ক্যাডেটস নাইট: {item.cadetNightCharge}</Typography>
            <Typography>
              শিক্ষা সামগ্রী (ক্লাশ ব্যাগ): {item.classBag}
            </Typography>
            <Typography>শিক্ষা সফর: {item.educationalTour}</Typography>
            <Typography>বিদেশি শিক্ষা সফর: {item.abroadEducationalTours}</Typography>
            <Typography>ক্লোদিং ও বেডিং: {item.crodhingDabing}</Typography>
            <Typography>
              মেরিটাইম বিশ্ববিদ্যালয় ফি: {item.meritimeCharge}
            </Typography>
            <Typography>
              পরীক্ষা সংক্রান্ত বিধি ব্যয়: {item.aboutExam}
            </Typography>
            <Typography>আনুষ্ঠানিক পসিং আউট: {item.passingOut}</Typography>
            <Typography>কশানমানি (ফেরত যোগ্য): {item.retuenable}</Typography>
            <Divider></Divider>
            <Typography>মোটঃ {item.amount} টাকা</Typography>
          </Stack>
        ))
      ) : (
        <Typography align="center" sx={{ color: "red" }}>
          {`${studentId} don't have make payment for ${instmn} semester`}
        </Typography>
      )}
    </Paper>
  );
}
