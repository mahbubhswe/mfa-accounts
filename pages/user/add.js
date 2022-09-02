import React from "react";
import AddUserForm from "../../components/AddUserForm";
import Protected from "../../components/Protected";
export default function Index() {
  return (
    <Protected pageTitle={"Add user | MFA Accounts"}>
    <AddUserForm/>
    </Protected>
  );
}
