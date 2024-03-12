"use client"

import { useOrganization } from "@clerk/nextjs"
import EmptyOrg from "./_components/EmptyOrg"


const Dashboard = () => {
  const { organization } = useOrganization()
  return (
    <div className=" flex-1 h-[calc(100%-80px)] p-7">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <p>Board List</p>
      )}
    </div>
  )
}

export default Dashboard