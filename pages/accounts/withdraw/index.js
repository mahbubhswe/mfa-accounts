import React from "react";
import WithdrawForm from "../../../components/WithdrawForm";
import Protected from "../../../components/Protected";

export default function Index() {
  return (
    <Protected pageTitle={"Withdraw system | MFA Accounts"}>
      <WithdrawForm/>
    </Protected>
  );
}
