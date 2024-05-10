import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../useSlice/userSlice';
import authSIice from '../useSlice/authSIice';
import tokenSlice from '../useSlice/tokenSlice';

// tạo redux store
const store = configureStore({
    reducer: {
        user: userSlice,
        auth: authSIice,
        token: tokenSlice
    }
})

export default store;