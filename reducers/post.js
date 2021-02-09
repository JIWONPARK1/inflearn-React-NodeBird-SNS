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
  postAdded: false,
};

const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
