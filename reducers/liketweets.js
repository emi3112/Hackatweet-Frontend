import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const likesSlice = createSlice({
	name: 'likes',
	initialState,
	reducers: {
		addLike: (state, action) => {
			state.value.push(action.payload);
		},
		removeLike: (state, action) => {
			state.value = state.value.filter(
                like => like.title !== action.payload.title);
		},
	},
});

export const { addLike, removeLike } = likesSlice.actions;
export default likesSlice.reducer;