import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  Divider,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@mui/material";
import React from "react";
import NextImage from "next/image";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckPaymentForStudent from "./CheckPaymentForStudent";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function StudentHome() {
  const [show, setShow] = useState(false);
  const [instalment, setInstalment] = useState();
  const [studentId, setStudentId] = useState();
  
  return (
    <>
      <Container sx={{ marginTop: "20px" }}>
        <Stack spacing={3}>
          <Typography component="div" align="center">
            <NextImage
              src={"/img/logo.png"}
              alt="logo"
              height={130}
              width={130}
              quality={100}
            />
          </Typography>
          <Divider>
            <Typography
              sx={{ color: "gray", fontSize: "150%" }}
              variant="bold"
              fontWeight={900}
            >
             Check Your Payment
            </Typography>
          </Divider>
        </Stack>

        <Stack
          spacing={2}
          sx={{
            width: { xs: "95%", sm: "70%", md: "50%", lg: "50%", xl: "40%" },
            margin: "auto",
              marginTop: "20px",
              padding:"30px",
            border: "1px solid #ccc",
            borderRadius:"4px"
           
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Select Instalment</InputLabel>
            <Select
              value={instalment}
              color="secondary"
              size="small"
              onChange={(e) => setInstalment(e.target.value)}
            >
              <MenuItem value={"1st"}>1st Instalment</MenuItem>
              <MenuItem value={"2nd"}>2nd Instalment</MenuItem>
              <MenuItem value={"3rd"}>3rd Instalment</MenuItem>
              <MenuItem value={"4th"}>4th Instalment</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Student ID"
            type={"text"}
            color="secondary"
            size="small"
            placeholder="Type Student ID"
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Button
            disabled={instalment && studentId ? false : true}
            variant="contained"
            color="secondary"
            size="small"
            onClick={()=>setShow(true)}
          >
            Show
          </Button>
        </Stack>
      </Container>

      <Dialog
        fullScreen
        open={show}
        onClose={() => setShow(!show)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#0D1013" }}>
          <Toolbar>
            <Typography
              align="center"
              variant="bold"
              component="h1"
              flexGrow={1}
            >
              Your Payment Details
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setShow(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CheckPaymentForStudent instalment={instalment} studentId={studentId} />
      </Dialog>
    </>
  );
}
