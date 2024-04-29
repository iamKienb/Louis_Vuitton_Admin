import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
interface DeleteProps{
  id:string
  item:string
}
const DeleteButton: React.FC<DeleteProps> = ({id, item}) => {
  const [loading, setLoading] = useState(false)
  const onDelete = async () =>{
    try{
      setLoading(true)
      const url = item === 'products' ?  `/api/products/${id}` :`/api/collections/${id}`
      const res = await fetch(url , {
        method: 'DELETE',
      })
      if(res.ok){
        setLoading(false)
        window.location.href = (`/${item}`) //refresh lại trang
      }

    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
    <AlertDialog >
      <AlertDialogTrigger>
      <Button className='bg-red-1 text-white'>
             <Trash className='h-4 w-4'/> 
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className = "bg-white-1 text-grey-1"> 
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className = "bg-red-1 text-white" onClick = {onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    </div>
  )
}

export default DeleteButton