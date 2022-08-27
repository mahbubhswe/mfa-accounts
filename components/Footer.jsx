import { Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  let currentYear = new Date().getFullYear();
  return (
    <>
      <Typography
        align="center"
        sx={{
          paddingY: "20px",
          background: "#E3E6E3",
          borderTop: "1px solid #ccc",
        }}
      >
        All Rights Reserved @ {currentYear} Marine Fisheries Academy
      </Typography>
    </>
  );
}
