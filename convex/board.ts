import { error } from "console"
import { mutation } from "./_generated/server"
import { v } from "convex/values"

const images = [
    "/thumbnails/1.svg",
    "/thumbnails/2.svg",
    "/thumbnails/3.svg",
    "/thumbnails/4.svg",
    "/thumbnails/5.svg",
    "/thumbnails/6.svg",
    "/thumbnails/7.svg",
    "/thumbnails/8.svg",
    "/thumbnails/9.svg",
    "/thumbnails/10.svg",
]

export const create = mutation({
    args: {
        organizationID: v.string(),
        title: v.string()
    },
    handler: async (ctx, arg) => {
        const user = await ctx.auth.getUserIdentity() // gets the identity of the user

        if(!user){
            throw new Error("Unauthorized")
        }

        const randomImg = images[Math.floor(Math.random()*images.length)]

        const board = ctx.db.insert("boards", {
            title: arg.title,
            organizationID: arg.organizationID,
            authorID: user.subject,
            authorName: user.name!,
            imageURL: randomImg
        })

        return board
    }
})

export const remove = mutation({
    args: {
        id: v.id("boards")
    },
    handler: async (ctx, arg) => {
        const user = await ctx.auth.getUserIdentity() // gets the identity of the user

        if(!user){
            throw new Error("Unauthorized")
        }

        // TODO: delete favourite relations

        await ctx.db.delete(arg.id)
    }
})

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string()
    },

    handler: async (ctx, arg) => {
        const user = await ctx.auth.getUserIdentity() // gets the identity of the user

        if(!user){
            throw new Error("Unauthorized")
        }

        const title = arg.title.trim()

        if(!title){
            throw new Error("Title required")
        }

        if(title.length > 70){
            throw new Error("Title can't exceed 70 characters")
        }

        const board = await ctx.db.patch(arg.id, {
            title: arg.title
        })

        return board
    }

})

export const favourite = mutation({
    args: {
        id: v.id("boards"),
        organizationID: v.string()
    },
    handler: async (ctx, arg) => {
        const user = await ctx.auth.getUserIdentity() // gets the identity of the user

        if(!user){
            throw new Error("Unauthorized")
        }

        const board = await ctx.db.get(arg.id)
        
        if(!board){
            throw new Error("Board not found")
        }

        const userID = user.subject //Identifier for the end-user from the identity provider, not necessarily unique across different providers.

        const existingFavourite = await ctx.db
        .query("userFavourites")
        .withIndex("by_user_board_organization", (q) => (
            q.eq("userID", userID).eq("boardID", board._id).eq("organizationID", arg.organizationID)
            
        ))
        .unique()  // Execute the query and return the singular result if there is one.

        if(existingFavourite){
            throw new Error("Board alread favourited")
        }

        await ctx.db.insert("userFavourites", {
            userID: userID,
            boardID: board._id,
            organizationID: arg.organizationID
        })

        return board

    }
})

export const undoFavourite = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, arg) => {
        const user = await ctx.auth.getUserIdentity() // gets the identity of the user

        if(!user){
            throw new Error("Unauthorized")
        }

        const board = await ctx.db.get(arg.id)
        
        if(!board){
            throw new Error("Board not found")
        }

        const userID = user.subject //Identifier for the end-user from the identity provider, not necessarily unique across different providers.

        const existingFavourite = await ctx.db
        .query("userFavourites")
        .withIndex("by_user_board", (q) => (
            q.eq("userID", userID).eq("boardID", board._id)
            // is organizatioID required
            
        ))
        .unique()  // Execute the query and return the singular result if there is one.

        if(!existingFavourite){
            throw new Error("Favourited board not found")
        }

        await ctx.db.delete(existingFavourite._id)

        return board

    }
})