"use client"

import Image from "next/image"
import Link from "next/link"
import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"

const font = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

const OrganizationSidebar = () => {
  const searchParams = useSearchParams()
  const favourites = searchParams.get("favourites")
  return (
    <div className=" hidden lg:flex flex-col space-y-6 w-[300px] p-4 border-r-2">
        <Link href="/">
          <div className=" flex items-center gap-3">
            <Image 
              src="/craftboardLogo.svg"
              alt="logo"
              height={60}
              width={60}
            />
            <span className={cn(
              "font-semibold text-lg",
              font.className
            )}>Craftboard</span>
          </div>
        </Link>
        <OrganizationSwitcher
        //  hidePersonal 
         appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "5px",
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #31363F",
              justifyContent: "space-between",
            }
          }
         }}
        />
        <div className=" space-y-2 w-full">
         <Button variant={favourites ? "outline" : "secondary"} asChild size="lg" className=" font-normal justify-start w-full">
          <Link href="/">
            <LayoutDashboard className=" h-5 w-5 mr-2" />
            Team Boards
          </Link>
         </Button>
         <Button variant={favourites ? "secondary" : "outline"} asChild size="lg" className=" font-normal justify-start w-full">
          <Link href={{
            pathname: "/",
            query: {favourites: true}
          }}>
            <Star className=" h-5 w-5 mr-2" />
            Favourite Boards
          </Link>
         </Button>
        </div>
    </div>
  )
}

export default OrganizationSidebar