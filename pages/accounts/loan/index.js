import React from "react";
import LoanForm from "../../../components/LoanForm";
import Protected from "../../../components/Protected";

export default function Index() {
  return (
    <Protected pageTitle={"Loan system | MFA Accounts"}>
      <LoanForm/>
    </Protected>
  );
}
