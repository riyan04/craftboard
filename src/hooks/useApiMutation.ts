import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (func: any) => {
    const [awaiting, setAwaiting] = useState(false)
    const apiMutation = useMutation(func)

    const mutate = (payload: any) => {
        setAwaiting(true)
        return apiMutation(payload)
        .finally(()=>setAwaiting(false))
        .then((res)=>{
            return res
        })
        .catch(err => {throw err})
    }

    return {
        mutate,
        awaiting
    }
}