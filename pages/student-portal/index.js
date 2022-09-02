import React from "react";
import StudentHome from "../../components/StudentHome";
import Protected from "../../components/Protected";
export default function index() {
  return (
    <Protected pageTitle={"Student portal | MFA Accounts"}>
      <StudentHome />
    </Protected>
  );
}
