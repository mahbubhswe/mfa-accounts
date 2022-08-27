import * as React from "react";
import axios from "axios";
import { Box } from "@mui/material";
import ShowUserTable from "../components/ShowUserTable";
import FadeLoader from "react-spinners/FadeLoader";
import useSWR from "swr";
const getUserList = (url) => axios.get(url).then((res) => res.data);
export default function UserList() {
  const { data, error } = useSWR("/api/user/getUserList", getUserList);

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

  return <ShowUserTable data={data} />;
}
