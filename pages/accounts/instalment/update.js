import React from "react";
import Protected from "../../../components/Protected";
import UpdateInstalmentForm from "../../../components/UpdateInstalmentForm";
export default function Update() {
  
  return (
    <Protected pageTitle="update instalment | MFA Accounts">
      <UpdateInstalmentForm />
    </Protected>
  );
}
