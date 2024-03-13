import Image from "next/image";

const EmptySearch = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
        <Image 
            src="/emptySearch.svg"
            alt="not found"
            height={200}
            width={200}
        />
        <h1 className=" text-2xl font-semibold mt-7">
            No results found
        </h1>
        <p className=" text-muted-foreground textg-sm mt-3">
            Search for something else
        </p>
    </div>
  )
}

export default EmptySearch