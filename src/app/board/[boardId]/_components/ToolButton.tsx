"use client"
import Hint from "@/components/hint/Hint"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface ToolButtonProps{
    label: string,
    icon: LucideIcon,
    onClick: () => void,
    isActive?: boolean,
    disabled?: boolean
}

const ToolButton = ({label, icon: Icon, onClick, isActive, disabled}: ToolButtonProps) => {
  return (
    <Hint label={label} side={"bottom"} sideOffset={10}>
        <Button disabled={disabled} onClick={onClick} size={"icon"} variant={isActive ? "boardActive" : "board"}>
            <Icon />
        </Button>
    </Hint>
  )
}

export default ToolButton