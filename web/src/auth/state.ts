import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {User} from '@supabase/supabase-js'

import {supabase} from '@/api'
import {UserProfile} from '@/api/models'
import {RootState} from '@/store'
import {toast} from '@/theme'

export interface State {
  profile?: UserProfile
  profileLoading: boolean
  user?: User
}

const initialState: State = {
  profileLoading: true,
}

export const fetchUser = createAsyncThunk('auth/fetchUser', async (user: User | undefined, {dispatch}) => {
  dispatch(setUser(user))
  if (!user) return

  const {data, error} = await supabase.from('user_profile').select('*').single()
  if (error) throw error

  return data
})

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.profileLoading = action.payload
    },
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.profileLoading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.profileLoading = false
      state.profile = action.payload ?? undefined
    })
    builder.addCase(fetchUser.rejected, (state, {error}) => {
      state.profileLoading = false
      state.profile = undefined

      console.error('Failed to fetch user', error)
      toast({title: 'Logowanie nie powiodło sie', status: 'error'})
    })
  },
})

export const {setProfileLoading, setUser} = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectProfileLoading = (state: RootState) => state.auth.profileLoading
export const selectProfile = (state: RootState) => state.auth.profile
export const selectRole = (state: RootState) => state.auth.profile?.role ?? 'user'

export default authSlice.reducer
