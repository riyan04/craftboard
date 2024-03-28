"use client"

import { connectionIdToColor } from "@/lib/utils"
import { useOthers, useSelf } from "../../../../../liveblocks.config"
import UserAvatar from "./UserAvatar"

const Participants = () => {

  const  MAXSHOWNUSERS = 2

  const users = useOthers()
  const currentUser = useSelf()
  const hasOtherUsers = users.length > MAXSHOWNUSERS
  return (
    <div className=" absolute top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-lg">
        <div className=" flex gap-x-2">
          {users.slice(0, MAXSHOWNUSERS).map(({connectionId, info}) => {
            return (
              <UserAvatar key={connectionId} src={info?.picture} name={info?.name} fallback={info?.name?.[0]} borderColor={connectionIdToColor(connectionId)} />
            )
          })}
          {currentUser && (
            
            <UserAvatar 
              src={currentUser.info?.picture}
              name={`${currentUser.info?.name} (You)`}
              fallback={currentUser.info?.name?.[0]}
              borderColor={connectionIdToColor(currentUser.connectionId)}

            />
          )}
          {hasOtherUsers && (
            <UserAvatar 
              name={`${users.length - MAXSHOWNUSERS} more`}
              fallback={`+ ${users.length - MAXSHOWNUSERS}`}
            />
          )}
        </div>
    </div>
  )
}

export const ParticipantsSkeleton =  () => {
  return (

    <div className=" absolute top-2 right-2 rounded-md p-3 flex items-center shadow-lg w-[200px] animate-pulse" />
  )
}

export default Participants