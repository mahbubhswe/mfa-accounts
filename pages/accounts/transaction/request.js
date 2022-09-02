import React from "react";
import TransactionRequest from "../../../components/TransactionRequest";
import Protected from "../../../components/Protected";

export default function Index() {
  return (
    <Protected pageTitle={"Transiction request | MFA Accounts"}>
      <TransactionRequest/>
    </Protected>
  );
}
