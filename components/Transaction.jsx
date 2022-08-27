import {
  Stack,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Avatar,
  Divider,
  Badge,
  Box,
} from "@mui/material";
import * as React from "react";
import ListIcon from "@mui/icons-material/List";
import AtmIcon from "@mui/icons-material/Atm";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import HistoryIcon from "@mui/icons-material/History";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PaidIcon from "@mui/icons-material/Paid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import AddStudentForm from "./AddStudentForm";
import WithdrawForm from "./WithdrawForm";
import LoanForm from "./LoanForm";
import AddUserForm from "./AddUserForm";
import useSWR from "swr";
import axios from "axios";
import PayDueForm from "./PayDueForm";
import PaymentsIcon from "@mui/icons-material/Payments";
import CheckRequest from "./CheckRequest";
import ShowStudent from "./ShowStudent";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useLocalStorage } from "@rehooks/local-storage";
import UserList from "./UserList";
import MoreIcon from "@mui/icons-material/More";
import { useRouter } from "next/router";
import TransactionHistory from "./TransactionHistory";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const getRequestCount = (url) => axios.get(url).then((res) => res.data);
export default function Transaction() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showLoan, setShowLoan] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showPayDue, setShowPayDue] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const { isAdmin } = userInfo;
  const router = useRouter();
  const hostName = window.location.host.split(".")[0];
  const { data: count, error } = useSWR(
    "/api/getRequestCount",
    getRequestCount
  );

  return (
    <>
      <div style={{ height: "150px", display: "grid", placeContent: "center" }}>
        <Avatar
          src="/img/profile.png"
          sx={{ height: 100, width: 100 }}
        ></Avatar>
      </div>
      <Divider>{userInfo.name}</Divider>
      <List dense={true}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/student-payment-list")}>
            <ListItemIcon>
              <PaymentsIcon />
            </ListItemIcon>
            <ListItemText>Payment List</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setShowWithdraw(true)}>
            <ListItemIcon>
              <AtmIcon />
            </ListItemIcon>
            <ListItemText>Withdraw</ListItemText>
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton onClick={() => setShowLoan(true)}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText>Loan</ListItemText>
          </ListItemButton>
        </ListItem> */}
        {/* <ListItem disablePadding>
          <ListItemButton onClick={() => setShowPayDue(true)}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText>Pay Due</ListItemText>
          </ListItemButton>
        </ListItem> */}
        {/* <ListItem
          disablePadding
          sx={{
            display: isAdmin == "true" ? "block" : "none",
          }}
        >
          <ListItemButton onClick={() => setShowRequest(true)}>
            <ListItemIcon>
              <Badge badgeContent={!!count ? count : 0} color="secondary">
                <CircleNotificationsIcon color="action" />
              </Badge>
            </ListItemIcon>
            <ListItemText>Request</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: isAdmin == "true" ? "block" : "none",
          }}
        >
          <ListItemButton onClick={() => setShowHistory(true)}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </ListItemButton>
        </ListItem> */}

        <div style={{ display: moreOption ? "block" : "none" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setShowAddStudent(true)}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText>Add Student</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setShowStudentList(true)}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText>Student List</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: isAdmin == "true" ? "block" : "none" }}
          >
            <ListItemButton onClick={() => setShowAddUser(true)}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText>Add User</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: isAdmin == "true" ? "block" : "none" }}
          >
            <ListItemButton onClick={() => setShowUserList(true)}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText>User List</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("student-portal")}>
              <ListItemIcon>
                <FactCheckIcon />
              </ListItemIcon>
              <ListItemText>Student Portal</ListItemText>
            </ListItemButton>
          </ListItem>
        </div>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setMoreOption(!moreOption)}>
            <ListItemIcon>
              <MoreIcon />
            </ListItemIcon>
            <ListItemText>{moreOption ? "Less" : "More"}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>

      {/* withdraw dailog */}
      <Dialog
        fullScreen
        open={showWithdraw}
        onClose={() => setShowWithdraw(!showWithdraw)}
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
              MFA Acounts
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setShowWithdraw(!showWithdraw);
                router.reload(window.location.pathname);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <WithdrawForm />
      </Dialog>
      {/* loan dailog */}
      <Dialog
        fullScreen
        open={showLoan}
        onClose={() => setShowLoan(!showLoan)}
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
              MFA Acounts
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setShowLoan(false);
                router.reload(window.location.pathname);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <LoanForm />
      </Dialog>
      {/* pay due dailog */}
      <Dialog
        fullScreen
        open={showPayDue}
        onClose={() => setShowPayDue(!showPayDue)}
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
              MFA Acounts
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setShowPayDue(false);
                router.reload(window.location.pathname);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <PayDueForm />
      </Dialog>
      {/* check request */}
      <Dialog
        fullScreen
        open={showRequest}
        onClose={() => setShowRequest(!showRequest)}
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
              MFA Acounts
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setShowRequest(false);
                router.reload(window.location.pathname);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CheckRequest />
      </Dialog>
      {/*check history*/}
      <Dialog
        fullScreen
        open={showHistory}
        onClose={() => setShowHistory(!showHistory)}
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
              MFA Acounts
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setShowHistory(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <TransactionHistory />
      </Dialog>
      {/* user list */}
      <Dialog
        fullScreen
        open={showUserList}
        onClose={() => setShowUserList(!showUserList)}
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
              User List
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setShowUserList(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <UserList />
      </Dialog>
      {/* add user */}
      <Dialog
        fullScreen
        open={showAddUser}
        onClose={() => setShowAddUser(!showAddUser)}
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
              MFA Acounts
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setShowAddUser(false);
                router.reload(window.location.pathname);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AddUserForm />
      </Dialog>
      {/* add student */}
      <Dialog
        fullScreen
        open={showAddStudent}
        onClose={() => setShowAddStudent(!showAddStudent)}
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
              MFA Acounts
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setShowAddStudent(false);
                router.reload(window.location.pathname);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AddStudentForm />
      </Dialog>
      {/* show student */}
      <Dialog
        fullScreen
        open={showStudentList}
        onClose={() => setShowStudentList(!showStudentList)}
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
              MFA Acounts
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setShowAddStudent(false);
                router.reload(window.location.pathname);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ShowStudent />
      </Dialog>
    </>
  );
}
