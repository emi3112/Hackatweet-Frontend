import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    username: null, 
    token: null, 
    firstname: null, 
    location: null,
    birth: null,
    bio: null,
    likes: [], 
    imgBack: null, 
    imgFront: null, 
    // myTweets: [] 
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
    },
    logout: (state) => {
      state.value = {}
    },
    myLiked: (state, action) => {
      state.value.likes = action.payload
    },
    addImgBack: (state, action) => {
      state.value.imgBack = action.payload
    },
    addImgFront: (state, action) => {
      state.value.imgFront = action.payload
    },
    importMyTweets: (state, action ) => {
      state.value.myTweets = action.payload.reverse()
    },
    addPersonalInfos: (state, action) => {
      state.value.bio = action.payload.bio ? action.payload.bio : null
      state.value.location = action.payload.location ? action.payload.location : null
      state.value.birth = action.payload.birth ? action.payload.birth : null
      state.value.firstname = action.payload.firstname ? action.payload.firstname : null
    },
  }
});

export const { login, logout, myLiked, addImgBack, addImgFront, importMyTweets, addPersonalInfos } = userSlice.actions;
export default userSlice.reducer;