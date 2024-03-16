import Room from "@/components/room/Room"
import Canvas from "./_components/Canvas"

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = ({ params } : BoardIdPageProps) => {
    // console.log(params.boardId)
    return (
        <Room roomID={params.boardId} fallback={<div>Loading...</div>}>

            <Canvas boardID={params.boardId} />
        </Room>
    )
}

export default BoardIdPage