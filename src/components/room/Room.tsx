"use client"

import { ClientSideSuspense } from "@liveblocks/react"
import { RoomProvider } from "../../../liveblocks.config"

interface RoomProps{
    children: React.ReactNode
    roomID: string
    fallback: NonNullable<React.ReactNode> | null
}

const Room = ({children, roomID, fallback}: RoomProps) => {
  return (
    <RoomProvider id={roomID} initialPresence={{
      cursor: null
    }}>
        <ClientSideSuspense fallback={fallback}>
            {() => children}
        </ClientSideSuspense>
    </RoomProvider>
  )
}

export default Room