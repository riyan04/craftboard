"use client"

import RenameModal from "@/components/modals/RenameModal"
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMutated, setIsMutated] = useState(false)
    useEffect(()=>{
        setIsMutated(true)
    },[])

  return (!isMutated) ? null : (
    <>
        <RenameModal />
    </>
  )
}

export default ModalProvider