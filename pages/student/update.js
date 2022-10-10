import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import UpdateStudentForm from "../../components/UpdateStudentForm";
export default function Update() {
  const router = useRouter();
  return (
    <Layout pageTitle="Update student">
      <UpdateStudentForm data={router.query} />
    </Layout>
  );
}
