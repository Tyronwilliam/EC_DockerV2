import { useGetUserQuery } from "@/appli/services/auth";
import { Page } from "@/features/Home";
import ProfilView from "@/features/auth/components/ProfilView";
import Box from "@/features/common/components/Box";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function profil() {
  const { data, isLoading, isError } = useGetUserQuery(22);

  useEffect(() => {
    if (isLoading !== true) {
      console.log(data);
    }
  }, []);

  return (
    <Page>
      <ProfilView />
    </Page>
  );
}

export default profil;
