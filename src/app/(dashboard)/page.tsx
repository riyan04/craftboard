"use client"

import { useOrganization } from "@clerk/nextjs"
import EmptyOrg from "./_components/EmptyOrg"
import BoardList from "./_components/BoardList"

interface DashboardProps {
  searchParams: {
    search?: string,
    favourites?: string
  }
}


const Dashboard = ({searchParams}: DashboardProps) => {
  const { organization } = useOrganization()
  return (
    <div className=" flex-1 h-[calc(100%-80px)] p-7">
      {/* {JSON.stringify(searchParams)} */}
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList organizationId={organization.id} query={searchParams} />
      )}
    </div>
  )
}

export default Dashboard