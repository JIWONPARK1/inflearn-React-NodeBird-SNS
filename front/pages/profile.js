import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/Applayout";
import FollowerList from "../components/FollowerList";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import Router from "next/router";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me && me.id) {
      Router.push("/");
    }
  }, [me && me.id]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>프로필 | noed bird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.FollowList} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
