"use client"

import { useCallback, useState } from "react"
import { useHistory, useSelf, useCanRedo, useCanUndo, useMutation } from "../../../../../liveblocks.config"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"
import { CanvasMode, CanvasState, Coordinate } from '@/types/canvas'
import { CursorsPresence } from "./CursorPresence"
import { pointerEventToCanvasPoint } from "@/lib/utils"

interface CanvasProps{
    boardID: string
}

const Canvas = ({boardID}: CanvasProps) => {

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })
  const [coordinate, setCoordinate] = useState<Coordinate>({ x: 0, y: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const handleOnWheel = useCallback((e: React.WheelEvent) => { // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed.
    console.log({
      x: e.deltaX,
      y: e.deltaY
    })
    setCoordinate((coordinate) => ({
      x: coordinate.x - e.deltaX,
      y: coordinate.y - e.deltaY
    }))
  }, [])

  const handleOnPointerMove = useMutation(  // Creates a callback function that lets you mutate Liveblocks state.
                                      // Read More: https://liveblocks.io/docs/api-reference/liveblocks-react#useMutation
    ({setMyPresence}, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, coordinate)

      console.log({ current })

      setMyPresence({cursor: current})
    },
    []
  )

  const handleOnPointerLeave = useMutation(
    ({setMyPresence}) => {
      setMyPresence({cursor: null})
    },
    []
  )

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
        <svg
         className=" h-[100vh] w-[100vw]"
         onWheel={handleOnWheel}
         onPointerMove={handleOnPointerMove}
         onPointerLeave={handleOnPointerLeave}
        >

          <g>
            <CursorsPresence />
          </g>
        </svg>
    </main>
  )
}

export default Canvas