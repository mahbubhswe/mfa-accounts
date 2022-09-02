import React from "react";
import AddStudentForm from "../../components/AddStudentForm";
import Protected from "../../components/Protected";
export default function Index() {
  return (
    <Protected pageTitle={"Add student | MFA Accounts"}>
      <AddStudentForm/>
    </Protected>
  );
}
