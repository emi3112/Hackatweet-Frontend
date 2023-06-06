import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
		addTweet: (state, action) => {
			state.value.unshift(action.payload);
		},
		removeLikeStore: (state, action) => {
			state.value = state.value.filter((e) => e.text !== action.payload.text);
		},
		importTweet: (state, action) => {
			state.value = []
			state.value = action.payload.reverse()
		},
		deleteTweet: (state) => {
			state.value = []
		}
	},
});

export const { addTweet, removeLikeStore, importTweet, deleteTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;