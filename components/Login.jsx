import React, { useState, useContext } from "react";
import {
  Container,
  Paper,
  Button,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import Image from "next/image";
import logo from "../public/img/logo.jpg";
import { useRouter } from "next/router";
import axios from "axios";
import Slide from "react-reveal/Slide";
import EmailIcon from "@mui/icons-material/Email";
import { contextStore } from "../utils/Store";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [err, setErr] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const { dispatch } = useContext(contextStore);
  const router = useRouter();
  const hideShowPassword = () => {
    setShow(!show);
  };
  //login
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      setShowLoading(true);
      const { data } = await axios.post("/api/user/login", {
        email: email,
        password: password,
      });
      setShowLoading(false);

      if (email.localeCompare(data.email) === 0) {
        dispatch({ type: "USER_LOGIN", payload: data });
        return router.push("/");
      }
      setErr(data);
      setShowLoading(false);
    } catch (error) {
      setErr(error.message);
      setShowLoading(false);
    }
  };

  return (
    <div className="loginPageBgColor">
      <Container>
        <Slide left >
          <Paper variant="outlined">
            <LinearProgress sx={{ display: showLoading ? "block" : "none" }} />
            <Stack>
              <div style={{ textAlign: "center", paddingTop: "25px" }}>
                <Image
                  src={logo}
                  quality={100}
                  alt="logo"
                  width={180}
                  height={180}
                />
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2} px={5} pb={3}>
                    <Typography
                      variant="bold"
                      component={"h3"}
                      sx={{ color: "#222222" }}
                      align="center"
                    >
                      MARINE FISHERIES ACADEMY
                    </Typography>
                    <Typography
                      component={"span"}
                      align="center"
                      sx={{ color: "red" }}
                    >
                      {err ? err : null}
                    </Typography>
                    <div>
                      <Divider textAlign="left">
                        <Typography
                          sx={{ color: "#0F7490", marginBottom: "15px" }}
                          variant="bold"
                          component={"h3"}
                        >
                          Login
                        </Typography>
                      </Divider>
                      <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Enter email address"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton disabled>
                                <EmailIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        color="secondary"
                        type={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                      />{" "}
                    </div>
                    <TextField
                      size="small"
                      color="secondary"
                      type={show ? "text" : "password"}
                      variant="outlined"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton onClick={hideShowPassword}>
                              {show ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ background: "#8D94CB", color: "#000000" }}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Stack>
                </form>
              </div>
            </Stack>
          </Paper>
        </Slide>
      </Container>
    </div>
  );
}
