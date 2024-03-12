import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
  

const EmptyOrg = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
        <Image
            src="/welcome.png"
            alt="boartTemplate"
            width={600}
            height={600}
        />
        <h1 className=" text-2xl font-semibold mt-6">
            Welcome to Craftboard
        </h1>
        <p>Create your first organization and get started</p>
        <div className="mt-7">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Create Organization
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                    <CreateOrganization />
                </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default EmptyOrg