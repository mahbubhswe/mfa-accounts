import React from "react";
import Login from "./Login";
import Layout from "./Layout";
import dynamic from "next/dynamic";
import { useLocalStorage } from "@rehooks/local-storage";
 function Protected({pageTitle, children }) {
  const [userInfo] = useLocalStorage("userInfo");
  if (userInfo) {
    return <Layout pageTitle={pageTitle}>{children}</Layout>;
  } else {
    return <Login></Login>;
  }
}
export default dynamic(() => Promise.resolve(Protected), {
  ssr: false,
});
