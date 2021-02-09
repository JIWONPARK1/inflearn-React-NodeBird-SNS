export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "jiwon",
      },
      content: "첫번째 게시글  #해시태그 #익스프레스",
      Images: [
        { src: "https://placeimg.com/640/480/any" },
        { src: "https://placeimg.com/640/481/any" },
        { src: "https://placeimg.com/640/482/any" },
      ],
      Comments: [
        {
          User: {
            nickname: "jiwonnn",
          },
          content: "얼른 사고싶어요!",
        },
      ],
      imagePaths: [],
      postAdded: false,
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = {
  type: ADD_POST_REQUEST,
  data,
};

export const addComment = {
  type: ADD_COMMENT_REQUEST,
  data,
};

const dummyPost = {
  id: 2,
  content: "dummny content",
  User: {
    id: 1,
    nickname: "won",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
      };

    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
