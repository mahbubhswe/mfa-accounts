import { Paper, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import React from "react";
import logo from "../public/img/logo.png";
export default function Welcome() {
  return (
    <Container  sx={{ marginTop: "30px" }}>
      <Paper className="welcomeBg" sx={{ height: "220px",paddingY:"20px" }}>
        <Stack spacing={1}>
          <Typography align="center" component="div">
            <Image src={logo} quality={100} height={150} width={150} />
          </Typography>

          <Typography align="center">Welcome to Accounts Dashboard</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
