import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'


type Task = {
    id: string
    title: string
    description: string
    priority: string
    status: "todo" | "inprogress" | "done"
    dueDate: string
    assigneeId: string
}

type Props = {
    task: Task | null
    onClose: ()=> void
}



const TaskDetailsModal:React.FC<Props> = ({task, onClose}) => {
    if(!task) return null
  return (
    <Dialog open={!!task} onOpenChange={onClose}>
        <DialogContent className='bg-white/5 backdrop-blur border border-white/10 rounded-xl max-w-md sm:max-w-lg text-white '>
        <DialogHeader>
            <DialogTitle className='text-2xl font-semibold'>{task.title}</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>
                Task Details and deadlines
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
            <div>
                <label className='text-muted-foreground text-xs uppercase font-semibold'>Description</label>
                <p className="mt-1">{task.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <span className="text-xs uppercase font-semibold text-muted-foreground block">Status</span>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${task.status === "todo" ? "bg-yellow-400 text-yellow-900" : task.status === "inprogress" ? "bg-blue-400 text-blue-900" : task.status === "done" ? "bg-green-400 text-green-900" : "bg-gray-400 text-gray-900"}`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                </div>
                <div>
                    <span className="text-xs uppercase font-semibold text-muted-foreground block">Priority</span>
                    <Badge variant={'outline'} className='mt-1 text-gray-500'>{task.priority}</Badge>
                </div>
                <div>
                    <span className="text-xs uppercase font-semibold text-muted-foreground block">Due date</span>
                    <p className="mt-1 text-sm">{task.dueDate}</p>
                </div>
            </div>
        </div>
        <div className="pt-4 flex justify-end">
            <Button onClick={onClose} variant="secondary" className='text-sm'>
                Close
            </Button>
        </div>
        </DialogContent>
    </Dialog>
  )
}

export default TaskDetailsModal