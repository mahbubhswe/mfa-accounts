import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function Layout({ pageTitle, children }) {
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "Dashboard | MFA Accounts"}</title>
      </Head>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer/>
    </React.Fragment>
  );
}
