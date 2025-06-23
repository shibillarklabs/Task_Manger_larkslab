import React from 'react'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import { getAllUsersAPI } from '@/services/allAPI'


type Task = {
    id: string
    title: string
    description: string
    priority: string
    status: "todo" | "inprogress" | "done"
    dueDate: string
    assigneeId: string | number
}

type TaskModalProps ={
    task: Task | null
    onClose: ()=> void
}

const TaskModal: React.FC<TaskModalProps> = ({task, onClose}) => {
    if(!task) return null

    const {data: users=[]} = useQuery({
        queryKey: ["users"],
        queryFn: async ()=>{
            const res = await getAllUsersAPI()
            return res.data
        },
        staleTime: 1000 * 60 * 5,
    })

    const getAssigneeName = (id:string | number)=>{
        const user = users.find((u)=> u.id === String(id))
        return user ? user.name : `user #${id}`
    }
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm '>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl max-w-md w-full text-white  shadow-2xl relative">
            <button className='absolute top-3 right-4 text-white text-lg hover:text-red-400' onClick={onClose}>
                &times;
            </button>
            <h2 className='text-xl font-semibold mb-4'>{task.title}</h2>
            <p className='text-sm text-muted-foreground mb-2'>{task.description}</p>
            <div className="text-sm space-y-1">
                <div><span className='text-muted-foreground'>Status</span>  {task.status}</div>

                <div><span className='text-muted-foreground'>{task.status === "done" ? "Deadline:" : "Due Date:"}</span> {task.status=== "done" ? "Completed" : task.dueDate}</div>
                <div><span className='text-muted-foreground'>Assigned to: </span> {getAssigneeName(task.assigneeId)} (Developer)</div>


            </div>
        </div>
    </div>
  )
}

export default TaskModal