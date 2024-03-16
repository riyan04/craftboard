import Canvas from "./_components/Canvas"

interface BoardIdPageProps {
    params: {
        boardID: string
    }
}

const BoardIdPage = ({ params } : BoardIdPageProps) => {
    return (
        <Canvas boardID={params.boardID} />
    )
}

export default BoardIdPage