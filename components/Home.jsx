import { Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import useSWR from "swr";
import Welcome from "./Welcome";
import AccountsList from "./AccountsList";
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
    `/api/getWithdrawBalance`,
    getWithdrawBalance
  );

  return (
    <>
      <Welcome />
      {deposit ? (
        <AccountsList
          deposit={deposit}
          paymentCount={paymentCount}
          withdrawBalance={withdrawBalance}
        />
      ) : (
        <Typography align="center" sx={{ marginY: "100px", color: "gray" }}>
          No transaction happened
        </Typography>
      )}
    </>
  );
}
