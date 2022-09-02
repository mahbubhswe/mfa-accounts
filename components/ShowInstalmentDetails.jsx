import { Divider, Stack, Typography, Paper } from "@mui/material";
import React from "react";

export default function ShowInstalmentDetails({ instalmentDetails }) {
  return (
  
      <Stack spacing={2}>
        <Typography>ভর্তি ফি: {instalmentDetails.admissionFee}</Typography>
        <Typography>টিউশন ফি: {instalmentDetails.tutionFee}</Typography>
        <Typography>ডাইনিং চার্জ: {instalmentDetails.diningCharge}</Typography>
        <Typography>হেয়ার কাটিং: {instalmentDetails.hairCutting}</Typography>
        <Typography>
          কাবলার ও ওয়াসার ম্যান চার্জ:{" "}
          {instalmentDetails.cablerOyaserManCharge}
        </Typography>
        <Typography>রিলিজিয়াস: {instalmentDetails.religiousCharge}</Typography>
        <Typography>
          দ‌ৈনিক প‌এিকা ও সপ্তাহিক ম্যাগাজিন:
          {instalmentDetails.newspaperMagazineCharge}
        </Typography>
        <Typography>
          স্ট্যাবলিশম্যান্ট ও মেইনটেনেন্স:
          {instalmentDetails.establishMaintainCharge}
        </Typography>
        <Typography>
          সুপারভিশন চার্জ: {instalmentDetails.supervisionCharge}
        </Typography>
        <Typography>
          গেমস এন্ড স্পোর্টস: {instalmentDetails.gameSportCharge}
        </Typography>
        <Typography>
          বার্ষিক সাংস্কৃতিক অনুষ্ঠান: {instalmentDetails.yearlyCeremony}
        </Typography>
        <Typography>
          ক্যাডেটস নাইট: {instalmentDetails.cadetNightCharge}
        </Typography>
        <Typography>
          শিক্ষা সামগ্রী (ক্লাশ ব্যাগ): {instalmentDetails.classBag}
        </Typography>
        <Typography>শিক্ষা সফর: {instalmentDetails.educationalTour}</Typography>
        <Typography>
          বিদেশি শিক্ষা সফর: {instalmentDetails.abroadEducationalTours}
        </Typography>
        <Typography>
          ক্লোদিং ও বেডিং: {instalmentDetails.crodhingDabing}
        </Typography>
        <Typography>
          মেরিটাইম বিশ্ববিদ্যালয় ফি: {instalmentDetails.meritimeCharge}
        </Typography>
        <Typography>
          পরীক্ষা সংক্রান্ত বিধি ব্যয়: {instalmentDetails.aboutExam}
        </Typography>
        <Typography>
          আনুষ্ঠানিক পসিং আউট: {instalmentDetails.passingOut}
        </Typography>
        <Typography>
          কশানমানি (ফেরত যোগ্য): {instalmentDetails.retuenable}
        </Typography>
        <Divider></Divider>
        <Typography>মোটঃ {instalmentDetails.amount} টাকা</Typography>
      </Stack>
   
  );
}
