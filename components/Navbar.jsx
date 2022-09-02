import {
  Alert,
  AppBar,
  Button,
  Drawer,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import PaymentIcon from "@mui/icons-material/Payment";
import dynamic from "next/dynamic";
import TransitionPage from "./SideMenuOptions";
import CloseIcon from "@mui/icons-material/Close";
import { contextStore } from "../utils/Store";
import NextLink from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";
import axios from "axios";
import { useLocalStorage } from "@rehooks/local-storage";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const getNotification = (url) => axios.get(url).then((res) => res.data);
function Navbar() {
  const [show, setShow] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  const { dispatch } = useContext(contextStore);
  
  const { data, error } = useSWR(
    `/api/getNotification?username=${userInfo?userInfo.username?userInfo.username:null:null}`,
    getNotification
  );


  //logout
  const userLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout now.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        dispatch({ type: "USER_LOGOUT" });
        router.push("/signin");
      }
    });
  };
//notification dismis
  const notificationDismiss= (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You have collected money.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async(result) => {
      if (result.value) {
        await axios.delete(`/api/deleteNotification?id=${id}`);
        router.reload(window.location.pathname);
      }
    });
  };

  return (
    <>
      <div style={{ display: !!data ? "block" : "none" }}>
        <Alert
         sx={{background:"#082038",color:"#FFFFFF"}}
          action={
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={async () =>
                notificationDismiss(data._id)}
            >
              Ok, I have collected
            </Button>
          }
        >
         
            {`Your ${
              data ? data.tansactionType : null
            } transaction request for ${
              data ? data.amount : null
            } tk has been approved
          successfully. Balance ${
            data ? data.amount : null
          } tk has been reduced from main balance.`}
         
        </Alert>
      </div>

      <AppBar
        position="sticky"
        className="navBgColor"
        // sx={{ background: "#0D1013" }}
      >
        <Toolbar>
          <NextLink href="/">
            <a>
              <IconButton size="large">
                <HomeIcon fontSize="inherit"></HomeIcon>
              </IconButton>
            </a>
          </NextLink>
          <Typography
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
            flexGrow={1}
            variant="bold"
            component="h3"
          >
            MARINE <span style={{ color: "#2F5A78" }}>FISHERIES</span> ACADEMY
          </Typography>
          <Typography
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
            flexGrow={1}
            variant="bold"
            component="h3"
            align="center"
          >
            MF ACADEMY
          </Typography>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <Button
              sx={{ background: "#ffffff" }}
              variant="outlined"
              startIcon={<PaymentIcon />}
              onClick={() => router.push("/accounts/payment")}
            >
              Payment
            </Button>
            <IconButton
              sx={{ color: "red" }}
              variant="outlined"
              onClick={() => userLogOut()}
            >
              <LogoutIcon />
            </IconButton>
          </Stack>
          <IconButton
            onClick={() => setShow(true)}
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <MenuOutlinedIcon
              sx={{ fontSize: 35 }}
              color="navBtnColor"
            ></MenuOutlinedIcon>
          </IconButton>
        </Toolbar>
      </AppBar>

      
      <Drawer open={show} onClose={() => setShow(false)}>
        <Stack sx={{ padding: "20px", width: "100vw" }} spacing={1}>
          <Button
            onClick={() => setShow(false)}
            type="button"
            sx={{
              width: "5px",
              marginLeft: "auto",
              color: "black",
              border: "1px dotted #ccc",
            }}
          >
            <CloseIcon></CloseIcon>
          </Button>

          <Stack spacing={1} sx={{ paddingX: "50px" }}>
            <Button
              sx={{ background: "#ffffff" }}
              variant="outlined"
              startIcon={<PaymentIcon />}
              onClick={() => router.push("/accounts/payment")}
            >
              Payment
            </Button>

            <TransitionPage />

            <IconButton
              sx={{ color: "red" }}
              variant="outlined"
              onClick={() => userLogOut()}
            >
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}

export default dynamic(() => Promise.resolve(Navbar), {
  ssr: false,
});
