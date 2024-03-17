import { Circle, MousePointer2, Pencil, RectangleHorizontal, Redo, Redo2, Square, StickyNote, Type, Undo, Undo2 } from "lucide-react"
import ToolButton from "./ToolButton"



const Toolbar = () => {
  return (
    <div className=" absolute top-3 left-[50%] -translate-x-[50%] flex flex-row gap-x-4">
        <div className=" bg-white rounded-md p-1.5 flex gap-x-1 flex-row items-center shadow-md">
            <ToolButton label="Select" icon={MousePointer2} onClick={()=> {}} isActive={false} />
            <ToolButton label="Text" icon={Type} onClick={()=> {}} isActive={false} />
            <ToolButton label="Sticky note" icon={StickyNote} onClick={()=> {}} isActive={false} />
            <ToolButton label="Rectangle" icon={Square} onClick={()=> {}} isActive={false} />
            <ToolButton label="Ellipse" icon={Circle} onClick={()=> {}} isActive={false} />
            <ToolButton label="Pen" icon={Pencil} onClick={()=> {}} isActive={false} />
        </div>
        <div className=" bg-white rounded-md p-1.5 flex gap-x-1 flex-row items-center shadow-md">
            <ToolButton label="Undo" icon={Undo2} onClick={()=> {}} disabled={false} />
            <ToolButton label="Redo" icon={Redo2} onClick={()=> {}} disabled={false} />
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