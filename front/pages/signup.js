import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AppLayout from "../components/Applayout";
import { Button, Form, Input, Checkbox } from "antd";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from "../reducers/user";
import Router from "next/router";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user
  );

  const [email, onChangeEmail] = useInput("jiwon@gmail.com");
  const [nickname, onChangeNickname] = useInput("jiwon");
  const [password, onChangePassword] = useInput("wldnjs92");
  const [passwordCheck, setPasswordCheck] = useState("wldnjs92");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const ErrorMessage = styled.div`
    color: red;
  `;

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setTermError(false);
    },
    [term]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
      },
    });
  }, [email, password, passwordCheck, term]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  return (
    <AppLayout>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | noed bird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            required
            type="email"
            name="user-email"
            value={email}
            onChange={onChangeEmail}
          ></Input>
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            required
            value={nickname}
            name="user-nickname"
            onChange={onChangeNickname}
          ></Input>
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            required
            type="password"
            value={password}
            name="user-password"
            onChange={onChangePassword}
          ></Input>
        </div>
        <div>
          <label htmlFor="user-passwordCheck">비밀번호 확인</label>
          <br />
          <Input
            required
            type="password"
            name="user-passwordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          ></Input>
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-terms" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Signup;
