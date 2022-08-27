import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import useSWR from "swr";
import { HashLoader } from "react-spinners";
import Welcome from "./Welcome";
import AccountsList from "./AccountsList";
import Transaction from "./Transaction";
const getDeposit = (url) => axios.get(url).then((res) => res.data);
const getPaymentCount = (url) => axios.get(url).then((res) => res.data);
const getWithdrawBalance = (url) => axios.get(url).then((res) => res.data);
export default function Home() {
  const { data: deposit, error: bError } = useSWR(
    "/api/getDeposit",
    getDeposit
  );
  const { data: paymentCount, error: pError } = useSWR(
    "/api/getPaymentCount",
    getPaymentCount
  );
  const { data: withdrawBalance, error: wError } = useSWR(
    "/api/getWithdrawBalance",
    getDeposit
  );
  // if (!balance || !paymentCount) {
  //   return (
  //     <Box
  //       sx={{
  //         height: "100vh",
  //         width: "100vw",
  //         display: "grid",
  //         placeContent: "center",
  //       }}
  //     >
  //       <HashLoader size={70} color={"#001E3C"} />
  //     </Box>
  //   );
  // }
  return (
    <>
      <Stack
        direction={"row"}
        sx={{ background: "#F7F9FA", paddingBottom: "50px" }}
      >
        <Box
          sx={{
            width: "220px",
            paddingLeft: "25px",
            display: { xs: "none", sm: "block", md: "block" },
          }}
        >
          <Box sx={{ position: "fixed" }}>
            <Transaction />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Paper elevation={1} sx={{ padding: "10px", margin: "20px" }}>
            <Welcome />
            {deposit ? (
              <AccountsList
                deposit={deposit}
                paymentCount={paymentCount}
                withdrawBalance={withdrawBalance}
              />
            ) : (
              <Typography
                align="center"
                sx={{ marginY: "100px", color: "gray" }}
              >
                No transaction happened
              </Typography>
            )}
          </Paper>
        </Box>
      </Stack>
    </>
  );
}
