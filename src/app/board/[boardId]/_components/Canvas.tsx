"use client"

import { useState } from "react"
import { useHistory, useSelf, useCanRedo, useCanUndo } from "../../../../../liveblocks.config"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"
import { CanvasMode, CanvasState } from '@/types/canvas'

interface CanvasProps{
    boardID: string
}

const Canvas = ({boardID}: CanvasProps) => {

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const info = useSelf((me) => me.info)
  return (
    <main className=" h-full w-full relative bg-neutral-100 touch-none">
        <Info boardID={boardID} />
        <Participants />
        <Toolbar
          canvasState={canvasState}
          setCanvasState={setCanvasState}
          canRedo={canRedo}
          canUndo={canUndo}
          undo={history.undo}
          redo={history.redo}
        />
    </main>
  )
}

export default Canvas