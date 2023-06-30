import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Address} from '@/modules/address/types'
import {ReduxKey, RootState} from '@/store/types'

export type AddressState = {address?: Address}

const initialState: AddressState = {}

export const addressSlice = createSlice({
  name: ReduxKey.address,
  initialState,
  reducers: {
    addAddress: (state, {payload: address}: PayloadAction<Address>) => ({
      ...state,
      address,
    }),
    removeAddress: () => initialState,
  },
})

export const {addAddress, removeAddress} = addressSlice.actions

export const selectAddress = (state: RootState) =>
  state[ReduxKey.address]?.address
