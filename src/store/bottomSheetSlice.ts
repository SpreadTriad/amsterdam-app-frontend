import {createSlice} from '@reduxjs/toolkit'
import {ReduxKey, RootState} from '@/store/types'

export type BottomSheetState = {
  isOpen: boolean
}

export const bottomSheetSlice = createSlice({
  name: ReduxKey.bottomSheet,
  initialState: {
    isOpen: false,
  } as BottomSheetState,
  reducers: {
    closeBottomSheet: state => ({
      ...state,
      isOpen: false,
    }),
    openBottomSheet: state => ({
      ...state,
      isOpen: true,
    }),
    toggleBottomSheet: state => ({
      ...state,
      isOpen: !state.isOpen,
    }),
  },
})

export const {closeBottomSheet, openBottomSheet, toggleBottomSheet} =
  bottomSheetSlice.actions

export const selectIsBottomSheetOpen = (state: RootState) =>
  state[ReduxKey.bottomSheet].isOpen
