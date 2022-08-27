import * as React from "react";
import axios from "axios";
import { Box } from "@mui/material";
import ShowTransactionHistory from "../components/ShowTransactionHistory";
import FadeLoader from "react-spinners/FadeLoader";
import useSWR from "swr";
const getTransactionHistory = (url) => axios.get(url).then((res) => res.data);
export default function TransactionHistory() {
  const { data, error } = useSWR("/api/getTransactionHistory", getTransactionHistory);

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

  return <ShowTransactionHistory data={data} />;
}
