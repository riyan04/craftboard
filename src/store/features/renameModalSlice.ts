import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const defaultValues = { id : "", title: "" }

export interface renameModalProps {
    isOpen: boolean,
    initialValues: typeof defaultValues,
}

const initialState : renameModalProps = {
    isOpen: false,
    initialValues: { id: "", title: "" },

}

export const renameModalSlice = createSlice({
    name: 'rename',
    initialState: initialState,
    reducers: {
        onOpen: (state : renameModalProps, action: PayloadAction<renameModalProps>) =>{
            
            state.isOpen = action.payload.isOpen
            state.initialValues = action.payload.initialValues
        },

        onClose : (state : renameModalProps, action: PayloadAction<renameModalProps>) => {
            state.isOpen = action.payload.isOpen
            state.initialValues = action.payload.initialValues
        }
    }
})

export const { onOpen, onClose } = renameModalSlice.actions
export default renameModalSlice.reducer