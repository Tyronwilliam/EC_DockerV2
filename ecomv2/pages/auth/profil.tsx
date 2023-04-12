import { useGetUserQuery } from "@/appli/services/auth";
import ProfilView from "@/features/auth/components/ProfilView";
import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { Page } from "@/features/common";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUserId } from "@/features/auth/slice";

function Profil() {
  const myId = useSelector(selectUserId);
  const { data, isLoading, isError } = useGetUserQuery(myId);

  return (
    <Page>
      <ProfilView user={data?.user} />
    </Page>
  );
}

export default Profil;
