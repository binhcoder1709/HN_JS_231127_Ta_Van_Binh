import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../useSlice/userSlice';
import authSIice from '../useSlice/authSIice';
// tạo redux store
const store = configureStore({
    reducer: {
        user: userSlice,
        auth: authSIice
    }
})

export default store;