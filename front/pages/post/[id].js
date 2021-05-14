import React from "react";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import AppLayout from "../../components/Applayout";
import PostCard from "../../components/PostCard";
import { useSelector } from "react-redux";

const Post = () => {
  const { singlePost } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 게시글</title>
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
