import React from "react";
import Home from "../components/Home";
import Protected from "../components/Protected";
import Tb from "../components/ShowList";
export default function Index() {
  return (
    <Protected>
      <Home></Home>
    
    </Protected>
  );
}
