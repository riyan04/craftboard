"use client"

import { useOrganizationList } from "@clerk/nextjs"
import Item from "./Item"

useOrganizationList

const List = () => {
    const {userMemberships} = useOrganizationList(
        {
            userMemberships:{
                infinite: true
            }
        }
    )

    return (!userMemberships.data?.length) ? null : (
        <ul className="flex flex-col gap-y-3">
            {userMemberships.data.map((member) => (
                <Item key={member.organization.id} id={member.organization.id} name={member.organization.name} imageUrl={member.organization.imageUrl} />
            ))}
        </ul>
    )
}

export default List