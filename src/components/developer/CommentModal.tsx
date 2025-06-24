import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteCommentAPI, getAllCommentAPI, getAllUsersAPI, postCommentAPI, updateCommentAPI } from '@/services/allAPI'
import { toast } from '@/hooks/use-toast'
import { Pencil, Trash2 } from 'lucide-react'


type Props = {
    isOpen: boolean
    onClose: () => void
    taskId: string
    taskTitle: string
    currentUser: {id:string; name: string}
}

const CommentModal: React.FC<Props> = ({isOpen, onClose , taskTitle, taskId, currentUser}) => {
    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState<string | null>(null)
    const [editValue, setEditValue] = useState("")
    const queryClient = useQueryClient()

    const { data = []}= useQuery({
        queryKey: ["comments"],
        queryFn: async ()=>{
            const res = await getAllCommentAPI()
            return res.data
        },
    })

    const comments = data.filter((c: any)=> c.taskId === taskId)

    const {data: users =[]} = useQuery({
        queryKey: ["users"],
        queryFn: async () =>{
            const res = await getAllUsersAPI()
            return res.data
        },
    })

    const mutation = useMutation({
        mutationFn: postCommentAPI,
        onSuccess: ()=>{
            toast({
                title: "Comment Added",
                description:"Comment succesfull added"
            })
            setMessage("")
            queryClient.invalidateQueries(["comments"])
        },
        onError: ()=>{
            toast({title: "Failed", description:"Could not post comment", variant:"destructive"})
        }
    })

        const deleteMutation = useMutation({
            mutationFn: deleteCommentAPI,
            onSuccess: ()=>{
                toast({
                    title: "Comment deleted",
                    description:"comment Deleted successfully",
                })
                queryClient.invalidateQueries(["comments"])
            },
            onError: ()=>{
                toast({
                    title: "Delete failed",
                    description: "Unable to delete comment"
                })
            }
        })
        const editMutation = useMutation({
            mutationFn: ({id, message}:{id: string; message: string })=>
                updateCommentAPI(id,{message, timestamp:new Date().toISOString()}),
            onSuccess: ()=>{
                toast({
                    title: "Comment Updated",
                    description: "Comment Updated Succesfully"
                })
                setEditing(null)
                queryClient.invalidateQueries(["comments"])
            },
            onError: ()=>{
                toast({ 
                    title: "Updated failed",
                    description: "Could not update comment",
                    variant: "destructive"
                    })
            }
        })

        const filteredComments = comments.filter((c: any)=>c.taskId === taskId)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white max-w-md'>
            <DialogHeader>
                <DialogTitle className='text-lg font-semibold'>
                    💬 Comments for: <span className='text-xl text-white/60'> {taskTitle}</span>
                </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4 max-h-[300px] overflow-y-auto">
                {filteredComments.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No comments yet.</p>
                )}
                {filteredComments.map((c: any)=>(
                    <div key={c.id} className="bg-white/10 p-3 rounded-lg">
                        {editing === c.id ? (
                            <div className="flex gap-2 items-center">
                                <Input value={editValue} onChange={(e)=> setEditValue(e.target.value)} className='text-sm bg-white/10 text-white' />
                                <Button size="sm" onClick={()=>editMutation.mutate({id: c.id, message: editValue})}>Save</Button>
                                <Button size="sm" variant="ghost" onClick={()=> setEditing(null)}>Cancel</Button>
                            </div>
                        ):(
                            <>
                            <p className="text-sm">"{c.message}"</p>
                            <span className='text-xs text-muted-foreground mt-1 block'>- {c.userId === currentUser.id ? "you" : users.find ((u: any)=> u.id ===c.userId)?.name ||`User: ${c.userId}`}</span>
                            {c.userId === currentUser.id &&(
                                <div className="flex gap-2 mt-2">
                                    <Button className='text-xs' onClick={()=>{setEditing(c.id); setEditValue(c.message)}}><Pencil size={16}/></Button>
                                    <Button  variant="destructive" className='text-xs' onClick={()=> deleteMutation.mutate(c.id)}><Trash2 size={16}/></Button>
                                </div>
                            )}


                            </>
                        )}
                </div>
                ))}
               
            </div>
            <div className="pt-4 flex gap-2">
                <Input onChange={(e)=> setMessage (e.target.value)} placeholder='Write a comment..' className='bg-white/10 text-white'/>
                <Button onClick={()=>mutation.mutate({taskId,userId: currentUser.id, message,timestamp: new Date().toISOString(),})}  variant="secondary" className='text-sm'>Send</Button>
            </div>
        </DialogContent>

    </Dialog>
  )
}

export default CommentModal