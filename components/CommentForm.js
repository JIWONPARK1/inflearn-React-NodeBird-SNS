import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.user
  );
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  const onSubmitComment = useCallback(() => {
    dispatch(addComment({ content: commentText, postId: post.id, userId: id }));
  }, [commentText, id]);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  return (
    <Form onFinish={onSubmitComment} encType="multipart/form-data">
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 9 }}
        >
          댓글 달기
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object,
};

export default CommentForm;
