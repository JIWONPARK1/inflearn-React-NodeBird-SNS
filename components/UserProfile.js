import { Button, Card, Avatar } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          게시물수
          <br />
          10
        </div>,
        <div key="twit">
          팔로잉수
          <br />2
        </div>,
        <div key="twit">
          팔로워수
          <br />0
        </div>,
      ]}
    >
      <Card.Meta title="jiwon" avatar={<Avatar>jw</Avatar>} />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
