import { Circle, MousePointer2, Pencil, RectangleHorizontal, Redo, Redo2, Square, StickyNote, Type, Undo, Undo2 } from "lucide-react"
import ToolButton from "./ToolButton"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"

// type CanvasState= any
interface ToolbarProps{
    canvasState: CanvasState,
    setCanvasState: (newState: CanvasState) => void,
    undo: ()=>void,
    redo: ()=>void,
    canUndo: boolean,
    canRedo: boolean
}

const Toolbar = ({canvasState, setCanvasState, undo,redo, canUndo, canRedo}: ToolbarProps) => {
  return (
    <div className=" absolute top-3 left-[50%] -translate-x-[50%] flex flex-row gap-x-4">
        <div className=" bg-white rounded-md p-1.5 flex gap-x-1 flex-row items-center shadow-md">
            <ToolButton 
                label="Select" icon={MousePointer2} onClick={()=> setCanvasState({ mode : CanvasMode.None})} 
                isActive={
                    canvasState.mode === CanvasMode.None ||
                    canvasState.mode === CanvasMode.Translating ||
                    canvasState.mode === CanvasMode.Pressing ||
                    canvasState.mode === CanvasMode.Resizing ||
                    canvasState.mode === CanvasMode.SelectionNet
                }
            />
            <ToolButton 
                label="Pen" icon={Pencil}
                onClick={()=> setCanvasState({
                    mode: CanvasMode.Pencil
                })} 
                isActive={canvasState.mode === CanvasMode.Pencil} 
            />
            <ToolButton 
                label="Text" icon={Type} 
                onClick={()=> setCanvasState({
                    mode : CanvasMode.Inserting,
                    layerType: LayerType.Text
                })} 
                isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Text} 
            />
            <ToolButton 
                label="Rectangle" icon={Square}
                onClick={()=> setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Rectangle
                })} 
                isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle}
            />
            <ToolButton 
                label="Ellipse" icon={Circle}
                onClick={()=> setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Ellipse
                })} 
                isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse} 
            />
            <ToolButton 
                label="Sticky note" icon={StickyNote} 
                onClick={()=> setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Note
                })} 
                isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Note} 
            />
        </div>
        <div className=" bg-white rounded-md p-1.5 flex gap-x-1 flex-row items-center shadow-md">
            <ToolButton label="Undo" icon={Undo2} onClick={undo} disabled={!canUndo} />
            <ToolButton label="Redo" icon={Redo2} onClick={redo} disabled={!canRedo} />
        </div>
    </div>
  )
}

export const ToolbarSkeleton = () => {
    return (
        <div className=" absolute top-3 left-[50%] -translate-x-[50%] flex flex-row gap-x-4 animate-pulse">
        <div className=" rounded-md p-1.5 flex gap-x-1 flex-row items-center shadow-md w-[100px] h-[30px] " />
        <div className="rounded-md p-1.5 flex gap-x-1 flex-row items-center shadow-md w-[100px] h-[30px]" />
    </div>
    )
}

export default Toolbar