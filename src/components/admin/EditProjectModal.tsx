import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectValue } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { updateTaskAPI } from '@/services/allAPI';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
    assigneeId: number;
}

interface EditProjectModalProps {
    task: Task;
    isOpen: boolean;
    onClose:()=>void;
    onProjectUpdated:()=>void;
}

const EditProjectModal:React.FC<EditProjectModalProps> = ({task, isOpen, onClose, onProjectUpdated,}) => {
    const { toast }= useToast();
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [priority,setPriority] = useState('medium');
    const [status, setStatus]= useState('todo');
    const [dueDate,setDueDate]= useState('');

    useEffect(()=>{
        if(task){
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            setStatus(task.status);
            setDueDate(task.dueDate);
        }
    },[task])

    const editProjectMutation = useMutation({
        mutationFn:(data: Task)=> updateTaskAPI(task.id, data),
        onSuccess:()=>{
            toast({
                title: 'Project Updated ✅',
                description: 'Changed saved successfully'
            });
            onProjectUpdated();
            onClose();
        },
        onError: ()=>{
            toast({
                title: 'Update failed ❌',
                description: 'Could not update the project',
                variant:'destructive',
            })
        }
    })
    const handleUpdate = () =>{
        editProjectMutation.mutate({
            ...task,title,description,priority,status,dueDate,
        });
    };

  return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white'>
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title'/>
                    <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description'/>
                    <Input value={dueDate} onChange={(e)=>setDueDate(e.target.value)} type='date'/>
              
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className='bg-gray-800 text-white'>
                        <SelectValue placeholder="Select Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='todo'>Todo </SelectItem>
                        <SelectItem value='inprogress'>In Progress </SelectItem>
                        <SelectItem value='done'>Done </SelectItem>

                    </SelectContent>
                </Select>
                <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className='bg-gray-700 text-white'>
                        <SelectValue placeholder="Select Priority"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='low'>Low</SelectItem>
                        <SelectItem value='medium'>Medium</SelectItem>
                        <SelectItem value='high'>High</SelectItem>

                    </SelectContent>
                </Select>
                <Button onClick={handleUpdate} className='w-full bg-blue-600 hover:bg-blue-700 text-white'>Update Project</Button>
                  </div>
            </DialogContent>
        </Dialog>
)
}

export default EditProjectModal