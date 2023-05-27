import {configureStore} from '@reduxjs/toolkit'
import type {Action, ThunkAction} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from 'react-redux'
import type {TypedUseSelectorHook} from 'react-redux'

import {supabase} from '@/api'
import authReducer, {fetchUser} from '@/auth/state'
import chatReducer from '@/chat/state'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

supabase.auth.onAuthStateChange(async (_, session) => {
  store.dispatch(fetchUser(session?.user ?? undefined))
})
