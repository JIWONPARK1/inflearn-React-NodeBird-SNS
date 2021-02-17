import { Button, Card, Avatar } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          게시물수
          <br />
          {me.Posts.length}
        </div>,
        <div key="twit">
          팔로잉수
          <br /> {me.Followings.length}
        </div>,
        <div key="twit">
          팔로워수
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        title={me.nickname}
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
