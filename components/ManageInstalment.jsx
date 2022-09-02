import {
  Divider,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import useSWR from "swr";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/router";
import { Details, Edit } from "@mui/icons-material";
import ShowInstalmentDetails from "./ShowInstalmentDetails";
import UpdateInstalmentForm from "./UpdateInstalmentForm";
const getInstalment = (url) => axios.get(url).then((res) => res.data);
export default function ShowUserTable() {
  const [open, setOpen] = useState(false);
  const [upateData, setUpdateData] = useState();
  const [openUpdate, setOpenUpdate] = useState(false);
  const router = useRouter();
  const [instalmentDetails, setInstalmentDetails] = useState();
  const { data, error } = useSWR("/api/getInstalment", getInstalment);
  if (!data) {
    return (
      <div style={{ height: "500px", display: "grid", placeContent: "center" }}>
        <FadeLoader />
      </div>
    );
  }

  return (
    <>
      <Divider>
        <Typography variant="bold" component="h1" align="center">
          Manage Instalment
        </Typography>
      </Divider>
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        <TableContainer
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "10px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Instalment</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Details</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.instalment}</TableCell>
                <TableCell align="center">{item.amount}</TableCell>
                <TableCell align="center">
                  {moment(item.createdAt).format("YY-MM-DD")}
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="secondary"
                    startIcon={<Details />}
                    onClick={() => {
                      setInstalmentDetails(item);
                      setOpen(true);
                    }}
                  >
                    Details
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="secondary"
                    startIcon={<Edit />}
                    onClick={() => {
                      setUpdateData(item);
                      setOpenUpdate(true);
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </div>
      {/* //details dailog */}
      <Dialog open={open}>
        <Paper sx={{ width: "500px" }}>
          <DialogTitle>
            <Stack direction="row">
              <Typography flexGrow={1}>
                {instalmentDetails
                  ? instalmentDetails.instalment
                    ? instalmentDetails.instalment
                    : null
                  : null}{" "}
                Instalment
              </Typography>
              <Button
                onClick={() => setOpen(false)}
                variant="outlined"
                color="error"
              >
                Close
              </Button>
            </Stack>
          </DialogTitle>
          <Divider></Divider>
          <DialogContent>
            <ShowInstalmentDetails instalmentDetails={instalmentDetails} />
          </DialogContent>
        </Paper>
      </Dialog>
      {/* //update dailog */}
      <Dialog
        fullScreen
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "black" }}>
          <Toolbar>
            <Typography
              flexGrow={1}
              variant="h4"
              component="div"
              align="center"
            >
              MFA Accounts
            </Typography>
            <Button
              autoFocus
              color="inherit"
              startIcon={<CloseIcon />}
              onClick={() => setOpenUpdate(false)}
            >Close</Button>
          </Toolbar>
        </AppBar>
        <UpdateInstalmentForm data={upateData} setOpenUpdate={setOpenUpdate} />
      </Dialog>
    </>
  );
}
