import Image from "next/image"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import Hint from "@/components/hint/Hint"

interface ItemProps {
    id: string,
    name: string,
    imageUrl: string
}

const Item = ({ name, id, imageUrl }: ItemProps) => {
    
    const {organization} = useOrganization()
    const { setActive } = useOrganizationList()
    const isActive = organization?.id === id

    const onClick = () => {
        if(!setActive) return

        setActive({organization: id})
    }

    return (
        <div className=" aspect-square relative">
            <Hint label={name} side='right' align='start' sideOffset={12}>

                <Image
                    fill
                    src={imageUrl}
                    onClick={onClick}
                    alt="name"
                    // we use cn to give dynamic css like if something is clicked and active then the design is something else something different
                    // in cn function the first parameter is the normal class and the second parameter is the one where the element is active
                    className={cn(
                        "rounded-full cursor-pointer opacity-75 hover:opacity-100",
                        isActive && "opacity-100"
                    )}
                />
            </Hint>
        </div>
    )
}

export default Item