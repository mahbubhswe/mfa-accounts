import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Avatar,
  Divider,
  Badge,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AtmIcon from "@mui/icons-material/Atm";
import ListIcon from "@mui/icons-material/List";
import HistoryIcon from "@mui/icons-material/History";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentsIcon from "@mui/icons-material/Payments";
import AddIcon from "@mui/icons-material/Add";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import useSWR from "swr";
import axios from "axios";
import { useLocalStorage } from "@rehooks/local-storage";
import { useRouter } from "next/router";
const getRequestCount = (url) => axios.get(url).then((res) => res.data);
export default function SideMenuOptions() {
  const [userInfo] = useLocalStorage("userInfo");
  const { isAdmin } = userInfo;
  const router = useRouter();
  const { data, error } = useSWR("/api/getRequestCount", getRequestCount);

  return (
    <>
      <div style={{ height: "120px", display: "grid", placeContent: "center" }}>
        <Avatar src="/img/profile.png" sx={{ height: 80, width: 80 }}></Avatar>
      </div>
      <Divider>{userInfo.name}</Divider>
      <List dense={true}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/accounts/payment-list")}>
            <ListItemIcon>
              <PaymentsIcon />
            </ListItemIcon>
            <ListItemText>Payment List</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/accounts/withdraw")}>
            <ListItemIcon>
              <AtmIcon />
            </ListItemIcon>
            <ListItemText>Withdraw</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/accounts/loan")}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText>Loan</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/accounts/pay-due")}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText>Pay Due</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: isAdmin ? "block" : "none",
          }}
        >
          <ListItemButton
            onClick={() => router.push("/accounts/transaction/request")}
          >
            <ListItemIcon>
              <Badge badgeContent={!!data ? data : 0} color="secondary">
                <CircleNotificationsIcon color="action" />
              </Badge>
            </ListItemIcon>
            <ListItemText>Request</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: isAdmin  ? "block" : "none",
          }}
        >
          <ListItemButton
            onClick={() => router.push("/accounts/transaction/history")}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/student/add")}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText>Add Student</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/student/list")}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText>Student List</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{ display: isAdmin  ? "block" : "none" }}
        >
          <ListItemButton onClick={() => router.push("/user/add")}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText>Add User</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{ display: isAdmin  ? "block" : "none" }}
        >
          <ListItemButton onClick={() => router.push("/user/list")}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText>User List</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{ display: isAdmin  ? "block" : "none" }}
        >
          <ListItemButton
            onClick={() => router.push("/accounts/instalment/add")}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>Add Instalment</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{ display: isAdmin ? "block" : "none" }}
        >
          <ListItemButton
            onClick={() => router.push("/accounts/instalment/manage")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Manage Instalment</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/student-portal")}>
            <ListItemIcon>
              <FactCheckIcon />
            </ListItemIcon>
            <ListItemText>Student Portal</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
