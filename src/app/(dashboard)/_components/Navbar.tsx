"use client"

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs"
import SearchInput from "./SearchInput"
import Link from "next/link"
import Image from "next/image"
import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import InviteBtn from "./InviteBtn"

const font = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

const Navbar = () => {
  const {organization} = useOrganization()
  return (
    <div className=" flex items-center gap-x-4 p-3 border-b-2">
        <div className=" hidden lg:flex lg:flex-1">
            <SearchInput />
            {/* Add Search */}
        </div>
        <div className=" flex flex-row gap-x-2 items-center lg:hidden flex-1">
        <Link href="/">
          <div className=" flex items-center gap-3">
            <Image 
              src="/craftboardLogo.svg"
              alt="logo"
              height={60}
              width={60}
            />
          </div>
        </Link>
        <OrganizationSwitcher
         hidePersonal 
         appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "300px"
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
        </div>
        {organization && (

          <InviteBtn /> 
        )}
        <UserButton />
    </div>
  )
}

export default Navbar