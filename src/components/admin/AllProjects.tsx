import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Pencil, Trash2 } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteTaskAPI, getAllTasksAPI } from '@/services/allAPI'
import AddProjectModal from './AddProjectModal'
import EditProjectModal from './EditProjectModal'
import { useToast } from '@/hooks/use-toast'

interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assigneeId: number;
    dueDate: string;
}

const AllProjects = () => {
    const [searchTitle, setSearchTitle]= useState('');
    const [statusFilter, setStatusFilter]= useState('All');
    const [priorityFilter, setPriorityFilter]= useState('All')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTask, setEditTask]= useState<Task | null>(null);
    const [isEditOpen, setIsEditOpen]= useState(false)
    const { toast }=useToast();

    const {data: tasks = [],
        isLoading,
        isError,
        refetch,

    }=useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: async ()=>{
            const result: any = await getAllTasksAPI();
            return result.data;
        }


    })
    const deleteMutation = useMutation({
        mutationFn:deleteTaskAPI,
        onSuccess: ()=>{
            toast({
                title: 'Task Deleted 🗑️',
                description: 'The proejct has been removed'
            });
            refetch();

        },
        onError:()=>{
            toast({
                title: 'Delete Failed',
                description: 'Something went wrong trying to delete',
                variant: 'destructive'
            })
        }
    })
    

    const filteredTasks = tasks.filter((task: Task)=>{
        const titleMatch = (task.title || "").toLowerCase().includes(searchTitle.toLowerCase());
        const statusMatch = statusFilter === 'All' || task.status === statusFilter;
        const priorityMatch = priorityFilter === 'All' || task.priority ===priorityFilter;
        return titleMatch && statusMatch && priorityMatch;
    })

    if(isLoading)return <p className='text-white'>Loading Projects...</p>
    if(isError) return <p className='text-red-400'>Error fetching User</p>

    

  return (
    <div className='space-y-6'>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className='text-xl sm:text-2xl font-bold text-white '>Project Management</h1>
            <Button onClick={()=>setIsModalOpen(true)} className='bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out hover:scale-110'>+ Add Project</Button>
        </div>
        <div className="bg-gray-800 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <Input value={searchTitle} onChange={(e)=> setSearchTitle(e.target.value)} type='text' placeholder='Filter by Project Name' className='bg-gray-700 text-white placeholder-gray-400'/>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='bg-gray-700 text-white'>
                    <SelectValue placeholder="Filter by Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='All'>All</SelectItem>
                        <SelectItem value='todo'>Todo</SelectItem>
                        <SelectItem value='inprogress'>In Progress</SelectItem>
                        <SelectItem value='done'>Done</SelectItem>

                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className='bg-gray-700 text-white'>
                    <SelectValue placeholder="Filter by Priority"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='All'>All</SelectItem>
                        <SelectItem value='low'>Low</SelectItem>
                        <SelectItem value='medium'>Medium</SelectItem>
                        <SelectItem value='high'>High</SelectItem>
                     </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div className="hidden lg:block">
            <div className="grid grid-cols-6 gap-4 bg-gray-800 px-4 py-3 text-sm text-gray-300 font-semibold border-b border-gray-700 uppercase">
                <div>#</div>
                <div>Project Name</div>
                <div>Status</div>
                <div>Priority</div>
                <div>Due Date</div>
                <div className="text-right">Actions</div>
             </div>
            {filteredTasks.map((task,index)=>(
                 <div key={task.id} className="grid grid-cols-6 gap-4 items-center px-4 py-4 bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition ">
                <div>{index + 1}</div>
                <div className="text-white">{task.title}</div>
                <div className="text-yellow-400 font-medium">{task.status}</div>
                <div className="text-blue-400 font-medium">{task.priority}</div>
                <div className="text-gray-300">{task.dueDate}</div>
                <div className="flex justify-end gap-3">
                    <button className='text-yellow-400 hover:scale-110 transition-transform' onClick={()=>{setEditTask(task); setIsEditOpen(true)}}><Pencil size={20}/></button>
                    <button className="text-red-400 hover:scale-110 transition-transform" onClick={()=> deleteMutation.mutate(task.id)}><Trash2 size={20}/></button>
                </div>
             </div>
            ))}
             
        </div>
        <div className="lg:hidden space-y-4">
            {filteredTasks.map((task,index)=>(
                <div key={task.id} className="bg-gray-800 rounded-md p-4 space-y-2 hover:bg-gray-700 transition">
                <div className="flex justify-between items-center">
                <span className='bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm font-medium'>#{index + 1}</span>

                    <div className="text-white font-semibold">{task.title}</div>
                    <div className="flex gap-3">
                        <button className='text-yellow-400 hover:scale-110 transition-transform' onClick={()=>{setEditTask(task); setIsEditOpen(true)}}><Pencil size={18}/></button>
                        <button className="text-red-400 hover:scale-110 transition-transform" onClick={()=> deleteMutation.mutate(task.id)}><Trash2 size={18}/></button>
                    </div>
                </div>
                <div className="text-yellow-400 text-sm font-medium">{task.status}</div>
                <div className="text-blue-400 text-sm font-medium">Priority: {task.priority}</div>
                <div className="text-sm text-gray-300">
                    <strong>Due:</strong> {task.dueDate}
                </div>
            </div>
            ))}
            
        </div>
        <AddProjectModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onProjectAdded={()=>{refetch(); setIsModalOpen(false);}}/>
            {editTask && (
                <EditProjectModal task={editTask} isOpen={isEditOpen} onClose={()=>{setIsEditOpen(false); setEditTask(null); }}onProjectUpdated={refetch} />
            )}
    </div>
  )
}

export default AllProjects