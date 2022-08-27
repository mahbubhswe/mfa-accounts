import React from "react";
import Login from "../../components/Login";
import NextHead from "next/head";
export default function index() {
  return (
    <>
      <NextHead>
        <title>Login</title>
      </NextHead>
      <Login />
    </>
  );
}
