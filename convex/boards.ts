import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {
        organizationID: v.string()
    },
    handler: async (ctx, arg) => {

        const user = await ctx.auth.getUserIdentity()

        if(!user){
            throw new Error("Unauthorized")
        }

        const boards = await ctx.db
        .query("boards") // Begin a query for the given table name.
        .withIndex("by_organization", (q) => q.eq("organizationID", arg.organizationID))
        // eq: Restrict this range to documents where doc[fieldName] === value.
        // withIndex: Query by reading documents from an index on this table.
        .order("desc") //Define the order of the query output.
        .collect() //Execute the query and return all of the results as an array.

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

