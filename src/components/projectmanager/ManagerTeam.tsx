import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Button } from '../ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { assignTaskToDeveloperAPI, getAllTasksAPI, getAllUsersAPI } from '@/services/allAPI'
import { toast } from '@/hooks/use-toast'

const ManagerTeam = () => {
    const [tasks, setTasks]= useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [selectedDeveloperId, setSelectedDeveloperId] = useState('');
    const [editingTaskId, setEditingTaskId]= useState<string | null>(null);
    const [editDeveloperId, setEditDeveloperId] = useState('');

    useEffect(()=>{
        const fetchData = async()=>{
            const taskRes = await getAllTasksAPI();
            const userRes = await getAllUsersAPI();
            setTasks(taskRes.data || []);
            setUsers(userRes.data || []);
        };
        fetchData();

    },[]);

  const handleAssign = async ()=>{
    if(!selectedTaskId || !selectedDeveloperId){
        toast({
            variant: "destructive",
            title: "Selection Missing",
            description: "Please select both a project and a developer"
        });
        return;
    }
    try{
        await assignTaskToDeveloperAPI(selectedTaskId, selectedDeveloperId);
        const updatedTasks = await getAllTasksAPI();
        setTasks(updatedTasks.data || []);
        toast({
            title: "Success",
            description: "Task assigned successfully 🎯"
        });

    }catch(err){
        toast({
            variant: "destructive",
            title: "failed",
            description: "Something went wrong while assigning the task"
        })
    }
  };

const handleUpdateAssignment = async()=>{
    if(!editingTaskId || !editDeveloperId) return;
    try{
        await assignTaskToDeveloperAPI(editingTaskId, editDeveloperId);
        const updatedTasks = await getAllTasksAPI();
        setTasks(updatedTasks.data || []);
        setEditingTaskId(null);
        setEditDeveloperId('');
        toast({
            title:"Updated",
            description:"Assignment updated successfully",

        })
    }catch(err){
        toast({
            variant: 'destructive',
            title: "error",
            description: "Could not update the assignment",
        })
    }
}

    const developers = users.filter(u=>u.role.toLowerCase()==='developer')
    const assignedTasks = tasks.filter((task)=>task.assigneeId);

  return (
    <div className='max-w-5xl mx-auto py-10 px-4'>
        <h2 className='text-2xl font-semibold text-white mb-8'>Assign Developer to Project</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select onValueChange={setSelectedTaskId}>
                <SelectTrigger className='w-full sm:w-1/2 bg-gray-900 border-gray-700 text-white'>
                <SelectValue placeholder="Select Projects"/>
                </SelectTrigger>
                <SelectContent className='bg-gray-900 text-white border border-gray-700'>
                    {tasks.map(task=>(
                        <SelectItem value={task.id} key={task.id}>{task.title}</SelectItem>
                    ))}

                </SelectContent>
            </Select>
            <Select onValueChange={setSelectedDeveloperId}>
                <SelectTrigger className='w-full sm:w-1/2 bg-gray-900 border-gray-700 text-white'>
                    <SelectValue placeholder="Select Developer"/>
                </SelectTrigger>
                <SelectContent className='bg-gray-900 text-white border border-gray-700'>
                    {developers.map(dev=>(
                        <SelectItem value={dev.id} key={dev.id}>{dev.name}</SelectItem>
                    ))}
                    

                </SelectContent>
            </Select>
            <Button onClick={handleAssign} className='bg-purple-600 hover:bg-purple-700 text-white px-6 w-full sm:w-auto'>
                Assign Task
            </Button>
        </div>
        <h1 className='text-xl sm:text-2xl font-semibold text-white mb-4'>Current Assignment</h1>
        <div className="bg-slate-900/60 border border-gray-700 rounded-lg overflow-x-auto">
        <table className='min-w-full text-sm text-white'>
            <thead className='bg-slate-800/50 border-b border-gray-700'>
            <tr>
                <th className='py-3 px-4 text-left font-medium'>#</th>
                <th className='py-3 px-4 text-left font-medium'>Projects</th>
                <th className='py-3 px-4 text-left font-medium'>Developer</th>
                <th className='py-3 px-4 text-left font-medium'>Email</th>
                <th className='py-3 px-4 text-left font-medium'>Status</th>
                <th className='py-3 px-4 text-left font-medium'>Actions</th>

                
            </tr>
            </thead>
            <tbody>
               {assignedTasks.length=== 0 ? (
                <tr>
                    <td colSpan={6} className='py-6 px-4 text-center text-gray-400'>
                        No tasks have been assigned yet.
                    </td>
                </tr>
               ):(
                assignedTasks.map((task, index)=>{
                    const assignee = users.find((u)=> u.id === task.assigneeId);
                    return(
                         <tr key={task.id} className="border-b border-gray-700 hover:bg-slate-800/30">
                            {editingTaskId=== task.id ? (
                                <td className="py-3 px-4 whitespace-nowrap" colSpan={6}>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                       <div className="bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded-md min-w-[200px]">
                                         {task.title}
                                        </div>
                                        <Select  value={editDeveloperId} onValueChange={setEditDeveloperId}>
                                            <SelectTrigger className='bg-gray-800 text-white border-gray-600'>
                                                <SelectValue placeholder="Select Developer"/>
                                            </SelectTrigger>
                                            <SelectContent className='bg-gray-800 text-white border border-gray-600 '>
                                                {developers.map((dev)=>(
                                                    <SelectItem key={dev.id} value={dev.id}>
                                                        {dev.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button onClick={handleUpdateAssignment} className='bg-green-600 text-white'>
                                            Update
                                        </Button>
                                        <Button onClick={()=> setEditingTaskId(null)} variant="outline" className='border-gray-500 text-gray-300'>
                                            Cancel
                                        </Button>
                                    </div>
                                </td>
                            ):(
                                <>
                                 <td className='py-3 px-4 whitespace-nowrap'>{index + 1}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-400">{task.description}</div>
                    </td>
                    <td className='py-3 px-4 whitespace-nowrap'>
                        {assignee ? `${assignee.name} (${assignee.role})`: '-'}
                    </td>
                    <td className='py-3 px-4 whitespace-nowrap'>{assignee?.email || '-'}</td>
                    <td className='py-3 px-4 whitespace-nowrap text-yellow-400'>{task.status}</td>
                    <td className='py-3 px-4 whitespace-nowrap'>
                        <Button onClick={()=>{setEditingTaskId(task.id); setEditDeveloperId(task.assigneeId || '')}}  className='border-gray-600 bg-transparent hover:bg-red-40 text-gray-300 hover:text-yellow-400'>
                            <Pencil size={16}/>
                        </Button>
                       
                    </td>
                    </>
                            )}

                </tr>
                    )
                })
               )}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default ManagerTeam