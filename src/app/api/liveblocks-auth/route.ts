
// Visit this for more details and doc: https://liveblocks.io/docs/rooms/authentication/access-token-permissions/nextjs

import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { use } from "react";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!) //A Convex client that runs queries and mutations over HTTP.


const liveblocks = new Liveblocks({
    secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!
})

export const POST = async (req: Request) => {
    const authorization = await auth()
    const user = await currentUser()


    // console.log("Auth info:", {
    //     authorization,
    //     user
    // })

    if(!authorization || !user){
        return new Response("Unauthorized", {status: 403})
    }

    const { room } = await req.json()

    const board = await convex.query(api.board.get, { id: room })

    // console.log("Room info:", {
    //     room,
    //     board,
    //     boardOrgId: board?.organizationID,
    //     userId: authorization.orgId
    // })

    if(board?.organizationID !== authorization.orgId){
        return new Response("Unauthorized", {status: 403})
    }

    const userInfo = {
        name: user.firstName!,
        picture: user.imageUrl!
    }

    // console.log(userInfo)

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo: userInfo}
    )

    if(room){
        session.allow(room, session.FULL_ACCESS)
    }

    const { status, body } = await session.authorize();
    // console.log({status, body}, "Access");
    
    return new Response(body, { status });
}