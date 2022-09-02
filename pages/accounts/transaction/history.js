import React from "react";
import TransactionHistory from "../../../components/TransactionHistory";
import Protected from "../../../components/Protected";

export default function Index() {
  return (
    <Protected pageTitle={"Transiction history | MFA Accounts"}>
      <TransactionHistory />
    </Protected>
  );
}
