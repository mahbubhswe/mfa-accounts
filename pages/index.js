import React from "react";
import Home from "../components/Home";
import Protected from "../components/Protected";
export default function Index() {
  return (
    <Protected>
      <Home></Home>
    </Protected>
  );
}
