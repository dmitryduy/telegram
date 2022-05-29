import React from "react";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { themeColor } from "../../globalTypes";

export const MockStore = ({ initialState, children }: {initialState: {themeColor: themeColor}, children: React.ReactElement}) => (
    <Provider
        store={configureStore({
            reducer: {
                settings: createSlice({
                    name: 'settings',
                    initialState: initialState,
                    reducers: {},
                }).reducer,
            },
        })}
    >
        {children}
    </Provider>
);