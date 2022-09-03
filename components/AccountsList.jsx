import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NextLink from "next/link";
import ListIcon from "@mui/icons-material/List";
import MoneyIcon from "@mui/icons-material/Money";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { HashLoader } from "react-spinners";
import { writeStorage } from "@rehooks/local-storage";
const getBalanceInfo = (url) => axios.get(url).then((res) => res.data);
export default function AccountsList({
  deposit,
  paymentCount,
  withdrawBalance,
}) {
  const [show, setShow] = useState(false);
  const { data, error } = useSWR("/api/getBalanceInfo", getBalanceInfo);

  const items = [
    {
      id: 1,
      title: "ভর্তি ফি",
      balance: data ? data.admissionFee : 0,
    },
    {
      id: 2,
      title: "টিউশন ফি",
      balance: data ? data.tutionFee : 0,
    },
    {
      id: 3,
      title: "ডাইনিং চার্জ",
      balance: data ? data.diningCharge : 0,
    },
    {
      id: 4,
      title: "হেয়ার কাটিং",
      balance: data ? data.hairCutting : 0,
    },
    {
      id: 5,
      title: "কাবলার ও ওয়াসার ম্যান চার্জ",
      balance: data ? data.cablerOyaserManCharge : 0,
    },
    {
      id: 6,
      title: "রিলিজিয়াস",
      balance: data ? data.religiousCharge : 0,
    },
    {
      id: 7,
      title: "দ‌ৈনিক প‌এিকা ও সপ্তাহিক ম্যাগাজিন",
      balance: data ? data.newspaperMagazineCharge : 0,
    },
    {
      id: 8,
      title: "স্ট্যাবলিশম্যান্ট ও মেইনটেনেন্স",
      balance: data ? data.establishMaintainCharge : 0,
    },
    {
      id: 9,
      title: "সুপারভিশন চার্জ",
      balance: data ? data.supervisionCharge : 0,
    },
    {
      id: 10,
      title: "গেমস এন্ড স্পোর্টস",
      balance: data ? data.gameSportCharge : 0,
    },
    {
      id: 11,
      title: "বার্ষিক সাংস্কৃতিক অনুষ্ঠান",
      balance: data ? data.yearlyCeremony : 0,
    },
    {
      id: 12,
      title: "ক্যাডেটস নাইট",
      balance: data ? data.cadetNightCharge : 0,
    },
    {
      id: 13,
      title: "শিক্ষা সামগ্রী",
      balance: data ? data.classBag : 0,
    },
    {
      id: 14,
      title: "শিক্ষা সফর",
      balance: data ? data.educationalTour : 0,
    },
    {
      id: 15,
      title: "বিদেশি শিক্ষা সফর",
      balance: data ? data.abroadEducationalTours : 0,
    },
    {
      id: 16,
      title: "ক্লোদিং ও বেডিং",
      balance: data ? data.crodhingDabing : 0,
    },
    {
      id: 17,
      title: "মেরিটাইম বিশ্ববিদ্যালয় ফি",
      balance: data ? data.meritimeCharge : 0,
    },
    {
      id: 18,
      title: "পরীক্ষা সংক্রান্ত বিধি ব্যয়",
      balance: data ? data.aboutExam : 0,
    },
    {
      id: 19,
      title: "আনুষ্ঠানিক পসিং আউট",
      balance: data ? data.passingOut : 0,
    },
    {
      id: 20,
      title: "কশানমানি ",
      balance: data ? data.retuenable : 0,
    },
   
  ];
  if (data) {
    writeStorage("balance", data);
  }
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
        <HashLoader size={70} color={"#001E3C"} />
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={1} justifyContent="center" mt={5}>
        <Grid item className="dashboardItem">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ListIcon fontSize="large" />
              </Avatar>
            </ListItemAvatar>
            <NextLink href={"/accounts/payment-list"}>
              <a>
                <ListItemText
                  primary="Payment List"
                  secondary={`Total: ${paymentCount}`}
                />
              </a>
            </NextLink>
          </ListItem>
        </Grid>
        <Grid item className="dashboardItem">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MoneyIcon fontSize="large" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Total Deposit"
              secondary={`Balance: ${deposit}`}
            />
          </ListItem>
        </Grid>
        <Grid item className="dashboardItem">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MoneyIcon fontSize="large" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Current Balance"
              secondary={`Balance: ${deposit - withdrawBalance}`}
            />
          </ListItem>
        </Grid>
      </Grid>

      <Container sx={{ display: show ? "block" : "none", marginTop: "20px" }}>
        <Divider sx={{ marginBottom: "20px" }}>More Accounts</Divider>
        <Grid container spacing={1} justifyContent="center">
          {items.map((item) => (
            <Grid key={item.id} item className="dashboardItem">
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoneyIcon fontSize="large" />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={item.title}
                  secondary={`Balance: ${item.balance}`}
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          variant="outlined"
          endIcon={show ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          color="secondary"
          onClick={() => setShow(!show)}
        >
          {show ? "Less" : "More"} Accounts
        </Button>
      </div>
    </>
  );
}
