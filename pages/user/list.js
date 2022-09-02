import React from "react";
import UserList from "../../components/UserList";
import Protected from "../../components/Protected";
export default function Index() {
  return (
    <Protected pageTitle={"User list | MFA Accounts"}>
       <UserList/>
    </Protected>
  );
}
