

const Toolbar = () => {
  return (
    <div className=" absolute top-3 left-[50%] -translate-x-[50%] flex flex-row gap-x-4">
        <div className=" bg-white rounded-md p-1.5 flex gap-x-1 flex-row items-center shadow-md">
            <div>
                Pencil
            </div>
            <div>
                Pencil
            </div>
            <div>
                Pencil
            </div>
            <div>
                Pencil
            </div>
            <div>
                Pencil
            </div>
        </div>
        <div className=" bg-white rounded-md p-1.5 flex gap-x-1 flex-row items-center shadow-md">
            <div>
                undo
            </div>
            <div>
                redo
            </div>
        </div>
    </div>
  )
}

export default Toolbar