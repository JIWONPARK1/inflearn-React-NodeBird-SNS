import Head from "next/head";
import { useSelector } from "react-redux";
import AppLayout from "../components/Applayout";
import FollowerList from "../components/FollowerList";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const followerList = [
    { nickname: "한솔" },
    { nickname: "은혜" },
    { nickname: "자영" },
    { nickname: "덕찬" },
  ];
  const followingList = [{ nickname: "동규" }, { nickname: "유림" }];

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
