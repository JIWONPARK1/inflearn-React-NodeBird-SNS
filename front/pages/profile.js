import Head from "next/head";
import axios from "axios";
import { useSelector } from "react-redux";
import AppLayout from "../components/Applayout";
import FollowerList from "../components/FollowerList";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

const Profile = () => {
  const { userInfo, me } = useSelector((state) => state.user);

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
      {userInfo ? (
        <AppLayout>
          <NicknameEditForm />
          <FollowList header="팔로잉" data={me.FollowList} />
          <FollowList header="팔로워" data={me.FollowerList} />
        </AppLayout>
      ) : null}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;
