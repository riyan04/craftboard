"use client"

import Image from "next/image"
import Link from "next/link"
import Overlay from "./Overlay"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs"
import Footer from "./Footer"
import { Skeleton } from "@/components/ui/skeleton"
import Actions from "@/components/actions/Actions"
import { MoreHorizontal } from "lucide-react"
import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "../../../../../convex/_generated/api"
import { toast } from "sonner"




interface BoardCardProps {
    id: string,
    title: string,
    imageURL: string,
    authorID: string,
    authorName: string,
    createdAt: number,
    organizationID: string,
    isFavourite: boolean
}

const BoardCard = ({ id, title, imageURL, authorID, authorName, createdAt, organizationID, isFavourite }: BoardCardProps) => {
    
    const { userId } = useAuth()

    const authorLabel = (authorID === userId) ? "You" : authorName
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    })
    // formatDistanceToNow: Return the distance between the given date and now in words.
    // addSuffix: Add "X ago"/"in X" in the locale language

    const { mutate : mutateFavourite, awaiting: awaitingFavourite } = useApiMutation(api.board.favourite)
    const { mutate: mutateUndoFavourite, awaiting: awaitingUndoFavourite } = useApiMutation(api.board.undoFavourite)
    // what we're doing here is giving each four a different names cuz variables were repeating itself, which is not allowed

    const toggleFavourite = () => {
        if(isFavourite){
            mutateUndoFavourite({ id})
            .catch(()=> toast.error("Failed to unfavourite"))
        } else {
            mutateFavourite({ id, organizationID})
            .catch(()=> toast.error("Failed to favourite"))
        }
    }

    return (
        <Link href={`board/${id}`}>
            <div className=" group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className=" relative flex-1 bg-[#EEEEEE]">
                    <Image
                        src={imageURL}
                        alt={`thumbnail ${title}`}
                        fill
                        className=" object-fill"
                    />
                    <Overlay />
                    <Actions 
                        id={id}
                        title={title}
                        side={"right"}
                    >
                        <button className=" border rounded-lg absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal
                                className=" text-white opacity-75 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    </Actions>
                </div>
                {/* CHALLENGE: Try using global state management system Redux-toolkit instead of passing props everywhere */}
                <Footer 
                    isFavourite={isFavourite}
                    title={title} 
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavourite}
                    disabled={awaitingFavourite || awaitingUndoFavourite}
                />
            </div>
        </Link>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton(){
    return(
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className=" h-full w-full" />
        </div>
    )
}

export default BoardCard
