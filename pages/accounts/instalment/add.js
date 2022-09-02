import React from "react";
import Protected from "../../../components/Protected";
import AddInstalmentForm from "../../../components/AddInstalmentForm";
export default function Index() {
  return (
    <Protected pageTitle={"Add instalment | MFA Accounts"}>
      <AddInstalmentForm />
    </Protected>
  );
}
