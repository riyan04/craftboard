"use client"

import EmptyBoards from "./EmptyBoards"
import EmptyFavourites from "./EmptyFavourites"
import EmptySearch from "./EmptySearch"


interface BoardListProps {
    organizationId: string,
    query: {
        search?: string,
        favourites?: string
    }
}

const BoardList = ({ organizationId, query }: BoardListProps) => {
    const data = []  // Change to API call later

    if(!data?.length && query.search){
        return (
            <EmptySearch />
        )
    }

    if(!data?.length && query.favourites){
        return (
            <EmptyFavourites />
        )
    }

    if(!data?.length){
        return (
            <EmptyBoards />
        )
    }

    return (
        <div>
            {JSON.stringify(query)}
        </div>
    )
}

export default BoardList