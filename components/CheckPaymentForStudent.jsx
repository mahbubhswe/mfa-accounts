import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import FadeLoader from "react-spinners/FadeLoader";
import useSWR from "swr";
import axios from "axios";
const getPaymentInfoForChacking = (url) =>
  axios.get(url).then((res) => res.data);
export default function StudentPaymentDetails({ studentId, instalment }) {
  const { data, error } = useSWR(
    `/api/getPaymentInfoForChacking?id=${studentId}&instalment=${instalment}`,
    getPaymentInfoForChacking
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
        <Typography>Semester: {instalment}</Typography>

        <Typography>Student ID: {studentId}</Typography>
        <Typography>Amount: {data ? data.amount : 0}</Typography>
        <Typography>
          Payment Date: {moment(data.createdAt).format("YY-MM-DD")}
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
          {`You don't have make payment for ${instalment} semester`}
          <p style={{ color: "green" }}>Or check you student ID</p>
        </Typography>
      )}
    </Paper>
  );
}
