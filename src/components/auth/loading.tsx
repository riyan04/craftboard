import Image from "next/image";

const Loading = () => {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
        <Image 
            src="/craftboardLogo.svg"
            alt="logo"
            width={70}
            height={100}
            className=" animate-pulse duration-500"
        />
    </div>
  )
}

export default Loading