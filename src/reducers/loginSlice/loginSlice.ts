import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoginSliceState {
    phoneMask: string,
    dualCode: string,
    countryName: string,
    searchCountry: string
}

const initialState = {
  dualCode: '',
  phoneMask: '',
  countryName: '',
  searchCountry: ''
} as ILoginSliceState;

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeCountry(state, action: PayloadAction<{ mask: string, countryName: string }>) {
      state.phoneMask = action.payload.mask;
      state.countryName = action.payload.countryName;
    },
    changeDialCode(state, action: PayloadAction<string>) {
      state.dualCode = action.payload;
    },
    setSearchCountry(state, action: PayloadAction<string>) {
      state.searchCountry = action.payload;
    }
  }
});

export const {changeCountry, changeDialCode, setSearchCountry} = loginSlice.actions;

export const {reducer: loginReducer} = loginSlice;