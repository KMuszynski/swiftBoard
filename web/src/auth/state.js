import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {supabase} from '../api'
import {toast} from '../theme'

const initialState = {
  profileLoading: true,
}

export const fetchUser = createAsyncThunk('auth/fetchUser', async (user, {dispatch}) => {
  dispatch(setUser(user))
  if (!user) return

  const {data, error} = await supabase.from('users').select('*').eq('id', user.id).single()
  if (error) throw error

  return data
})

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setProfileLoading: (state, action) => {
      state.profileLoading = action.payload
    },
    setUser: (state, action) => {
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

export const selectUser = (state) => state.auth.user
export const selectProfileLoading = (state) => state.auth.profileLoading
export const selectProfile = (state) => state.auth.profile
export const selectRole = (state) => state.auth.profile?.role ?? 'user'

export default authSlice.reducer
