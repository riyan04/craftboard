import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships" // TODO: Read more about this

export const get = query({
    args: {
        organizationID: v.string(),
        search: v.optional(v.string()),
        favourites: v.optional(v.string())
    },
    handler: async (ctx, arg) => {

        const user = await ctx.auth.getUserIdentity()

        if(!user){
            throw new Error("Unauthorized")
        }

        if(arg.favourites){
            const favouritedBoards = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_organization", (q) => (
                q.eq("userID", user.subject).eq("organizationID", arg.organizationID)
            ))
            .order("desc")
            .collect()


            // TODO: Understand what's happening here
            const boardIDs = favouritedBoards.map((board) => board.boardID)
            const boards = await getAllOrThrow(ctx.db, boardIDs) // TODO: Read more about this 
            // and get to know the depth of getAllOrThrow function and try to write it in a normal
            // way without using convex-helpers

            return boards.map((board) => (
                {
                    ...board,
                    isFavourite: true
                }
            ))
        }

        const title = arg.search as string
        let boards = []

        if(title){
            // query with search index
            boards = await ctx.db
            .query("boards")
            .withSearchIndex("search_title", (q) => (
                q.search("title", title)
                .eq("organizationID", arg.organizationID)
            ))
            .collect()
        } else {
            // query without search index
            boards = await ctx.db
            .query("boards") // Begin a query for the given table name.
            .withIndex("by_organization", (q) => q.eq("organizationID", arg.organizationID))
            // eq: Restrict this range to documents where doc[fieldName] === value.
            // withIndex: Query by reading documents from an index on this table.
            .order("desc") //Define the order of the query output.
            .collect() //Execute the query and return all of the results as an array.
        }


        const boardsWithFavouriteRelation = boards.map((board) => {
            return ctx.db
            .query("userFavourites")
            .withIndex("by_user_board", (q) => (
                q.eq("userID", user.subject).eq("boardID", board._id)
            ))
            .unique()
            .then((favourite) => {
                return {
                    ...board,
                    isFavourite: !!favourite
                }
            })
        })

        // What we're doing here is, after we got all the boards we're mapping through them and individually
        // and checking if that board is in the userFavourites db, and if it is there then we're adding
        // an isFavourite field into it

        const boardsWithFavouriteBoolean = Promise.all(boardsWithFavouriteRelation)

        return boardsWithFavouriteBoolean // .... and then simply returning all the boards which now all of them has
        // isFavourite marked
    }
})

