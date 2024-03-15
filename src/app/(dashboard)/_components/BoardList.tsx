"use client"

import EmptyBoards from "./EmptyBoards"
import EmptyFavourites from "./EmptyFavourites"
import EmptySearch from "./EmptySearch"
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api"
import BoardCard from "./board-card/BoardCard";
import NewBoardBtn from "./NewBoardBtn";


interface BoardListProps {
    organizationId: string,
    query: {
        search?: string,
        favourites?: string
    }
}

const BoardList = ({ organizationId, query }: BoardListProps) => {

    const data = useQuery(api.boards.get, { organizationID: organizationId, ...query })

    if (data === undefined) {
        return (
            <div>
                <h2 className=" text-sm">{query.favourites ? "Favourite" : "Recents"}</h2>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-7 pb-10">
                    <NewBoardBtn organizationId={organizationId} disabled />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>
        )
    }

    if (!data?.length && query.search) {
        return (
            <EmptySearch />
        )
    }

    if (!data?.length && query.favourites) {
        return (
            <EmptyFavourites />
        )
    }

    if (!data?.length) {
        return (
            <EmptyBoards />
        )
    }

    return (
        <div>
            <h2 className=" text-sm">{query.favourites ? "Favourite" : "Recents"}</h2>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-7 pb-10">
                <NewBoardBtn organizationId={organizationId} />
                {data.map((board) => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageURL={board.imageURL}
                        authorID={board.authorID}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        organizationID={board.organizationID}
                        isFavourite={board.isFavourite}
                    />
                ))}
            </div>
        </div>
    )
}

export default BoardList