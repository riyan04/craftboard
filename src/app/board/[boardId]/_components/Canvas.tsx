"use client"

import { useSelf } from "../../../../../liveblocks.config"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"

interface CanvasProps{
    boardID: string
}

const Canvas = ({boardID}: CanvasProps) => {
  const info = useSelf((me) => me.info)
  return (
    <main className=" h-full w-full relative bg-neutral-100 touch-none">
        <Info boardID={boardID} />
        <Participants />
        <Toolbar />
    </main>
  )
}

export default Canvas