"use client"


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useAppDispatch, useAppSelector, useAppStore } from "@/store/hooks"
import { onOpen, onClose, renameModalProps } from "@/store/features/renameModalSlice"
import {  FormEventHandler, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "../../../convex/_generated/api"
import { toast } from "sonner"




const RenameModal = () => {

  const { mutate, awaiting} = useApiMutation(api.board.update)

  let isOpen = useAppSelector((state) => state.rename.isOpen)
  let initialTitle = useAppSelector((state) => state.rename.initialValues.title)
  const initialId = useAppSelector((state) => state.rename.initialValues.id)
  const [title, setTitle] = useState(initialTitle)

  useEffect(() => {
    setTitle(initialTitle)
  }, [initialTitle])

  const dispatch = useAppDispatch()

  const postRenameParameter : renameModalProps = {isOpen: false, initialValues: {id: "", title: ""}}

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    mutate({
      id: initialId,
      title: title
    })
    .then(() => toast.success("Board name edited"))
    .catch(() => toast.error("Error while editing name of the board"))

    dispatch(onClose(postRenameParameter))
  }

  

  return (
    <Dialog open={isOpen} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit board title
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter new title for the board
        </DialogDescription>
        <form onSubmit={onSubmit} className=" space-y-4">
          <Input
            disabled={awaiting}
            required
            maxLength={70}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={awaiting} type={"submit"}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal