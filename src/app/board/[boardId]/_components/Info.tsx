"use client"

import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"
import { Montserrat } from "next/font/google"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Hint from "@/components/hint/Hint"
import { onOpen, onClose, renameModalProps } from "@/store/features/renameModalSlice"
import { useAppDispatch, useAppSelector, useAppStore } from "@/store/hooks"
import Actions from "@/components/actions/Actions"
import { Menu } from "lucide-react"

const font = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})


interface InfoProps {
  boardID: string
}

const Info = ({ boardID }: InfoProps) => {
  const data = useQuery(api.board.get, {
    id: boardID as Id<"boards">
  })
  const dispatch = useAppDispatch()
  if (!data) {
    return (
      <InfoSkeleton />
    )
  }
  const renameParameter : renameModalProps = {isOpen: true, initialValues: {id: data._id, title: data.title}}
  return (
    <div className=" absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-lg">

      <Hint label="Go to dashboard" side="bottom" sideOffset={10}>

        <Button className="px-2" variant={"board"} asChild>
          <Link href="/">
            <Image
              src="/craftboardLogo.svg"
              alt="Logo"
              height={40}
              width={40}
            />
            <span className={cn(
              "font-semibold text-lg ml-1",
              font.className
            )}>Craftboard
            </span>
          </Link>
        </Button>
      </Hint>
      <div>
        |
      </div>
      <Hint label="Edit title" side="bottom" sideOffset={10}>

        <Button variant={"board"} className=" text-base font-normal px-2" onClick={() => dispatch(onOpen(renameParameter))}>
                {data.title}
        </Button>
      </Hint>
      <div>
        |
      </div>
      <Actions
        id={data._id}
        title={data.title}
        side={"bottom"}
        sideOffset={10}
      >
        <div>
          <Hint label="more" side="bottom" sideOffset={10}>
              <Button size={"icon"} variant={"board"}>
                <Menu />
              </Button>
          </Hint>
        </div>
      </Actions>

    </div >
  )
}

export const InfoSkeleton = () => {
  return (
    <div className=" absolute top-2 left-2 rounded-md px-1.5 h-12 flex items-center shadow-lg w-[300px] animate-pulse" />
  )
}

export default Info