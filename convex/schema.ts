// Refer https://docs.convex.dev/database/schemas for the documentation of schema

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
    })
})