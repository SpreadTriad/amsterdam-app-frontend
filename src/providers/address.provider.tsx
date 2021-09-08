import React, {useState, createContext} from 'react'
import {Address} from '../types/address'

type Context = {
  address: Address | undefined
  changeAddress: (text: Address) => void
  changeSaveInStore: (state: boolean) => void
  saveInStore: boolean | undefined
}

export const AddressContext = createContext<Context>({
  address: undefined,
  changeAddress: () => {},
  changeSaveInStore: () => {},
  saveInStore: undefined,
})

export const AddressProvider = ({children}: {children: React.ReactNode}) => {
  const [saveInStore, setSaveInStore] = useState<boolean | undefined>()
  const [address, setAddress] = useState<Address | undefined>()

  const changeSaveInStore = (state: boolean) => {
    setSaveInStore(state)
  }

  const changeAddress = (newAddress: Address) => {
    setAddress(newAddress)
  }

  return (
    <AddressContext.Provider
      value={{address, changeAddress, changeSaveInStore, saveInStore}}>
      {children}
    </AddressContext.Provider>
  )
}
