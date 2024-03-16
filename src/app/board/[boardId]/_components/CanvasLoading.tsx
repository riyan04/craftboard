

import Image from "next/image"
import { InfoSkeleton } from "./Info"
import { ParticipantsSkeleton } from "./Participants"
import { ToolbarSkeleton } from "./Toolbar"


const CanvasLoading = () => {
  return (
    <main className=" h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
        <Image 
            src="/craftboardLogo.svg"
            alt="Load logo"
            width={30}
            height={50}
            className=" opacity-75 animate-ping"
        />
        <InfoSkeleton />
        <ParticipantsSkeleton />
        <ToolbarSkeleton />
    </main>
  )
}

export default CanvasLoading