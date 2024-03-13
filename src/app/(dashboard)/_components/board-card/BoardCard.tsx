"use client"

import Image from "next/image"
import Link from "next/link"
import Overlay from "./Overlay"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs"
import Footer from "./Footer"
import { Skeleton } from "@/components/ui/skeleton"




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
                </div>
                {/* CHALLENGE: Try using global state management system Redux-toolkit instead of passing props everywhere */}
                <Footer 
                    isFavourite={isFavourite}
                    title={title} 
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={()=>{}}
                    disabled={false}
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
