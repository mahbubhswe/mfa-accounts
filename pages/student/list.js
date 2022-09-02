import React from "react";
import ShowStudent from "../../components/ShowStudent";
import Protected from "../../components/Protected";
export default function Index() {
  return (
    <Protected pageTitle={"Student list | MFA Accounts"}>
       <ShowStudent/>
    </Protected>
  );
}
