import {configureStore} from '@reduxjs/toolkit'

import {supabase} from '../api'
import authReducer, {fetchUser} from '../auth/state'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

supabase.auth.onAuthStateChange(async (_, session) => {
  store.dispatch(fetchUser(session?.user ?? undefined))
})
