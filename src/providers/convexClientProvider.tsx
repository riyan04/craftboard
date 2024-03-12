"use client"

// Refered from https://docs.convex.dev/auth/clerk


import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient, AuthLoading, Authenticated} from 'convex/react'
import React from "react"
import Loading from "@/components/auth/loading"

interface convexClientProviderProps {
    children: React.ReactNode
};

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!) // we put ! cuz The non-null assertion operator tells the TypeScript compiler that a value typed as optional cannot be null or undefined

export const ConvexClientProvider = ({children}: convexClientProviderProps) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Authenticated>

                    {children}
                </Authenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}