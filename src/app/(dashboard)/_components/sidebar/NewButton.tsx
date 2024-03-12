"use client"

import { CreateOrganization } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Hint from '@/components/hint/Hint'

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=' aspect-square'>
          <Hint label='create organization' side='right' align='start' sideOffset={12}>
            <button className=' border-solid border-2 border-white rounded-lg h-full w-full flex justify-center items-center opacity-60 hover:opacity-100 transition'>
              <Plus className=' text-white' />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className=' p-0 bg-transparent border-none mx-w-[480px]'>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  )
}

export default NewButton