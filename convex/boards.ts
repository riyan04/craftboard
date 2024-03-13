import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {
        organizationID: v.string()
    },
    handler: async (ctx, arg) => {
        const user = ctx.auth.getUserIdentity()

        if(!user) {
            throw new Error("Unauthorized")
        }

        const boards = await ctx.db
        .query("boards") // Begin a query for the given table name.
        .withIndex("by_organization", (q) => q.eq("organizationID", arg.organizationID))
        // eq: Restrict this range to documents where doc[fieldName] === value.
        // withIndex: Query by reading documents from an index on this table.
        .order("desc") //Define the order of the query output.
        .collect() //Execute the query and return all of the results as an array.

        return boards
    }
})

