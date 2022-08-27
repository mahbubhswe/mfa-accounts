import * as React from "react";
import axios from "axios";
import { Box } from "@mui/material";
import ShowStudentList from "../components/ShowStudentList";
import FadeLoader from "react-spinners/FadeLoader";
import useSWR from "swr";
const getStudentList = (url) => axios.get(url).then((res) => res.data);
export default function PaymentTable() {
  const { data, error } = useSWR("/api/getStudentList", getStudentList);

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

  return <ShowStudentList data={data} />;
}
