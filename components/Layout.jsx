import { Box, Stack, Paper } from "@mui/material";
import Head from "next/head";
import React from "react";
import SideMenuOptions from "../components/SideMenuOptions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Layout({ pageTitle, children }) {
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "Dashboard | MFA Accounts"}</title>
      </Head>
      <Navbar />
      <main>
        <Stack
          direction={"row"}
          sx={{
            background: "#F7F9FA",
            paddingBottom: "500px",
          }}
        >
          <Box
            sx={{
              width: "220px",
              paddingLeft: "25px",
              display: { xs: "none", sm: "block", md: "block" },
            }}
          >
            <Box sx={{ height: "100vh", position: "fixed", overflow: "auto" }}>
              <SideMenuOptions />
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              margin: { xs: "5px", sm: "12px", md: "50px" },
            }}
          >
            <Paper
              sx={{
                padding: { xs: "0px", sm: "30px", md: "80px" },
                marginTop: "10px",
              }}
            >
              {children}
            </Paper>
          </Box>
        </Stack>
      </main>
      <Footer />
    </React.Fragment>
  );
}
