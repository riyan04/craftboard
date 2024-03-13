import Image from "next/image";

const EmptyFavourites = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
        <Image 
            src="/emptyFavourites.svg"
            alt="not found"
            height={200}
            width={200}
        />
        <h1 className=" text-2xl font-semibold mt-7">
            No Favourites found
        </h1>
        <p className=" text-muted-foreground textg-sm mt-3">
            Try marking something favourite
        </p>
    </div>
  )
}

export default EmptyFavourites