import React from "react";
import Protected from "../../components/Protected";
import AddNewPayment from "../../components/AddNewPayment";
export default function Index() {
  return (
    <Protected pageTitle={"Payment System | MFA Accounts"}>
      <AddNewPayment />
    </Protected>
  );
}
