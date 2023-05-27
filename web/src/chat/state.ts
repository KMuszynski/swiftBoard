import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {ChatMessage} from '@/api/models'
import {RootState} from '@/store'

export interface State {
  prompts: ChatMessage[]
}

const initialState: State = {
  prompts: [
    {role: 'system', content: 'You are a helpful assistant.'},
    {role: 'assistant', content: 'Witaj w SwiftBoard! Jak mogę ci dzisiaj pomóc?'},
  ],
}

export const chatSlice = createSlice({
  initialState,
  name: 'chat',
  reducers: {
    setPrompts: (state, action: PayloadAction<ChatMessage[]>) => {
      state.prompts = action.payload
    },
  },
})

export const {setPrompts} = chatSlice.actions

export const selectPrompts = (state: RootState) => state.chat.prompts

export default chatSlice.reducer
