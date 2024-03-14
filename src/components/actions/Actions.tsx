"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Link2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "../../../convex/_generated/api"
import ConfirmAlerts from "../alerts/ConfirmAlerts"
import { Button } from "../ui/button"

interface ActionsProps{
    children: React.ReactNode,
    side?: DropdownMenuContentProps["side"],
    sideOffset?: DropdownMenuContentProps["sideOffset"],
    id: string,
    title: string
}

const Actions = ({ children, side, sideOffset, id, title}: ActionsProps) => {
    const { mutate, awaiting } = useApiMutation(api.board.remove)
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
        .then(()=> toast.success("Link copied"))
        .catch(()=> toast.error("Failed to copy link"))
    }
    const onDeleteBoard = () => {
        mutate({
            id:id
        })
        .then(() => toast.success("Board deleted"))
        .catch(() => toast.error("Failed to delete board"))
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent
            side={side}
            sideOffset={sideOffset}
            className=" w-60"
            onClick={(e)=>e.stopPropagation()} // prevent redirecting to another page
        >
            <DropdownMenuItem className=" p-3 cursor-pointer" onClick={onCopyLink}>
                <Link2 className=" h-4 w-4 mr-2" />
                Copy board link
            </DropdownMenuItem>
            <ConfirmAlerts
                header="Do you want to delete the board?"
                description="This will delete the board and all of its contents."
                disabled={awaiting}
                onConfirm={onDeleteBoard}
            >

                <Button
                    variant={"ghost"} 
                    className=" p-3 cursor-pointer text-sm w-full justify-start font-normal" 
                    // onClick={onDeleteBoard}
                >
                    <Trash2 className=" h-4 w-4 mr-2" />
                    Delete board
                </Button>
            </ConfirmAlerts>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions