"use client"

import List from "./List"
import NewButton from "./NewButton"

const Sidebar = () => {
  return (
    <aside className=" fixed z-[1] left-0 bg-[#222831] h-full w-[60px] p-2 flex flex-col gap-y-4 text-[#EEEEEE]">
        <List />
        <NewButton />
    </aside>
  )
}

export default Sidebar