import Head from "next/head";
import AppLayout from "../components/Applayout";
import FollowerList from "../components/FollowerList";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
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
        <FollowList header="팔로잉목록" data={followingList} />
        <FollowerList header="팔로워목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
