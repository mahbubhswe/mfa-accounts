import React from "react";
import Protected from "../../../components/Protected";
import ManageInstalment from "../../../components/ManageInstalment";
export default function Index() {
  return (
    <Protected pageTitle={"Manage instalment | MFA Accounts"}>
      <ManageInstalment />
    </Protected>
  );
}
