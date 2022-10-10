import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import UpdateUserForm from "../../components/UpdateUserForm";
export default function Update() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update user">
      <UpdateUserForm data={router.query} />
    </Layout>
  );
}
