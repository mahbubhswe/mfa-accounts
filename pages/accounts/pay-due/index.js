import React from "react";
import PayDueForm from "../../../components/PayDueForm";
import Protected from "../../../components/Protected";

export default function Index() {
  return (
    <Protected pageTitle={"Pay due system | MFA Accounts"}>
      <PayDueForm/>
    </Protected>
  );
}
