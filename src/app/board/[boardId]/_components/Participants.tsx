


const Participants = () => {
  return (
    <div className=" absolute top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-lg">
        List of users
    </div>
  )
}

Participants.Skeleton = function ParticipantsSkeleton (){
  return (

    <div className=" absolute top-2 right-2 rounded-md p-3 flex items-center shadow-lg w-[200px] animate-pulse" />
  )
}

export default Participants