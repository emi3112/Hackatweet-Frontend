import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const hashtagsSlice = createSlice({
	name: 'hashtags',
	initialState,
	reducers: {
		importHashtags: (state, action) => {
			state.value = []
			state.value = action.payload.reverse()
		},
		deleteHastags: (state) => {
			state.value = []
		},
		removeHastag: (state, action) => {
			state.value = state.value.filter((e) => e.name !== action.payload);
		}
	},
});

export const { importHashtags, deleteHastags, removeHastag } = hashtagsSlice.actions;
export default hashtagsSlice.reducer;