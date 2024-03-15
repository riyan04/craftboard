// Refer https://docs.convex.dev/database/schemas for the documentation of schema

// TODO: Check what does "index" do

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    boards: defineTable({
        title: v.string(),
        organizationID: v.string(),
        authorID: v.string(),
        authorName: v.string(),
        imageURL: v.string()
    })
    .index("by_organization", ["organizationID"])
    .searchIndex("search_title", {
        searchField: "title",
        filterFields: ["organizationID"]
    }),

    userFavourites: defineTable({
        organizationID: v.string(),
        userID: v.string(),
        boardID: v.id("boards")
    })
    .index("by_board", ["boardID"])
    .index("by_user_organization", ["userID", "organizationID"])
    .index("by_user_board", ["userID", "boardID"])
    .index("by_user_board_organization", ["userID", "boardID", "organizationID"])
})