import React from "react";
import Protected from "../../../components/Protected";
import PaymentForm from "../../../components/PaymentForm";
export default function Index() {
  return (
    <Protected pageTitle={"Payment System | MFA Accounts"}>
      <PaymentForm />
    </Protected>
  );
}
