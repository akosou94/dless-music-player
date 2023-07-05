import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAudios } from '@/api';
import type { RootState } from '@/src/redux/store/store';

export type TGetAudios = {
  audios: any;
  currentAudio: any[];
  currentPlayAudio: any;
  pending: boolean;
  error: boolean;
};
const initialState: TGetAudios = {
  audios: null,
  currentPlayAudio: null,
  currentAudio: [],
  pending: false,
  error: false,
};

export const getAudiosProvider = createAsyncThunk(
  'audios/getAudios',
  async () => {
    const response = await getAudios();

    return response;
  }
);

const getAudiosSlice = createSlice({
  name: 'audios',
  initialState,
  reducers: {
    playNewTrack: (state, action) => {
      state.audios = action.payload;
    },
    // addTrackInQueue: (state, action) => {
    //   const isExists = state.audios.filter();
    //   if (isExists) {
    //   }
    //   state.audios;
    // },
    setCurrentAudio: (state, action) => {
      state.currentAudio = action.payload;
    },
    setCurrentPlayAudio: (state, action) => {
      state.currentPlayAudio = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAudiosProvider.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAudiosProvider.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.audios = payload;
      })
      .addCase(getAudiosProvider.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { playNewTrack, setCurrentAudio, setCurrentPlayAudio } =
  getAudiosSlice.actions;
export const selectAudios = (state: RootState): TGetAudios => state.audiosAll;
export default getAudiosSlice.reducer;
