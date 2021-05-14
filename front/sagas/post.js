import {
  all,
  call,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import axios from "axios";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

/**
 * 게시글 목록 조회
 */

function loadPostsAPI() {
  return axios.get("/posts");
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

/**
 * 게시글 상세조회
 */

function loadPostAPI(postId) {
  return axios.get(`/post/${postId}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

/**
 * 게시글 등록
 */
function addPostAPI(content) {
  return axios.post("/post", { content });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

/**
 * 게시글 삭제
 */

function removePostAPI(postId) {
  return axios.delete(`/post/${postId}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

/**
 * 게시글 좋아요
 */

function likePostApi(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostApi, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

/**
 * 게시글 좋아요 취소
 */
function unlikePostApi(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostApi, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

/**
 * 댓글 등록
 */

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLikePosts() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePosts() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchLikePosts),
    fork(watchUnlikePosts),
  ]);
}
