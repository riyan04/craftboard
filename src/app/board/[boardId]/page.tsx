import Room from "@/components/room/Room"
import Canvas from "./_components/Canvas"
import CanvasLoading from "./_components/CanvasLoading"

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = ({ params } : BoardIdPageProps) => {
    // console.log(params.boardId)
    return (
        <Room roomID={params.boardId} fallback={<div className="h-full w-full"><CanvasLoading /></div>}>

            <Canvas boardID={params.boardId} />
        </Room>
    )
}

export default BoardIdPage