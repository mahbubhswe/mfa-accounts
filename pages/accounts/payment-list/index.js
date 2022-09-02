import React from "react";
import PaymentList from "../../../components/PaymentList";
import Protected from "../../../components/Protected";

export default function Index() {
  return (
    <Protected pageTitle={"Payment List | MFA Accounts"}>
      <PaymentList/>
    </Protected>
  );
}
