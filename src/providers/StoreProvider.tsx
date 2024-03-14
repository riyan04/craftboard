"use client"

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'

interface StoreProviderProps {
    children: React.ReactNode
}

import React from 'react'

const StoreProvider = ({ children }: StoreProviderProps) => {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }
    return (
        <Provider store={storeRef.current}>{children}</Provider>
    )
}

export default StoreProvider