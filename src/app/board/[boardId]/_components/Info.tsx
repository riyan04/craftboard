


const Info = () => {
  return (
    <div className=" absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-lg">
        TODO: Info about the board
    </div>
  )
}

Info.Skeleton = function InfoSkeleton (){
  return (
    <div className=" absolute top-2 left-2 rounded-md px-1.5 h-12 flex items-center shadow-lg w-[300px] animate-pulse" />
  )
}

export default Info