"use client"

import { cn } from "@/lib/utils"
import { Heart, Star } from "lucide-react"

interface FooterProps {
    isFavourite: boolean,
    title: string,
    authorLabel: string,
    createdAtLabel: string,
    onClick: () => void,
    disabled: boolean
}

const Footer = ({ title, authorLabel, createdAtLabel, onClick, disabled, isFavourite }: FooterProps) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        onClick()
        
    }

    return (
        <div className=" relative bg-white p-3">
            <p className=" text-[14px] truncate max-w-[calc(100%-20px)]">
                {title}
            </p>
            <p className=" opacity-0 text-[10px] group-hover:opacity-100 transition-opacity text-muted-foreground truncate">
                {createdAtLabel} by {authorLabel}
            </p>
            <button
                disabled={disabled}
                onClick={handleClick}
                className={cn(
                    "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-red-600",
                    disabled && "cursor-not-allowed opacity-75"
                )}
            >
                
                <Heart 
                    className={cn(
                        "h-4 w-4",
                        isFavourite && "fill-red-600 text-red-600"
                    )}
                />
            </button>
        </div>
    )
}

export default Footer