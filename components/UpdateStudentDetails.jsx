import {
  Box
} from "@mui/material";
import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import useSWR from "swr";
import axios from "axios";
import UpdateRecord from "./UpdateRecord";
const getStudentSingleRecord = (url) => axios.get(url).then((res) => res.data);
export default function StudentPaymentDetails({ id }) {
  const { data, error } = useSWR(
    `/api/getSingleRecord?id=${id}`,
    getStudentSingleRecord
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

  return <UpdateRecord data={data} />;
}
