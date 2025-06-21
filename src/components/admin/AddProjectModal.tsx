import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectItem, SelectTrigger } from '../ui/select';
import { SelectContent, SelectValue } from '@radix-ui/react-select';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mutation, useMutation } from '@tanstack/react-query';
import { postTaskAPI } from '@/services/allAPI';

interface AddProjectModalProps {
    isOpen : boolean;
    onClose: ()=> void;
    onProjectAdded: ()=> void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({isOpen, onClose, onProjectAdded}) => {
    const { toast } = useToast();
    const [title, setTitle]= useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority]= useState('medium');
    const [status, setStatus]= useState('todo');
    const [dueDate, setDueDate]= useState('');

    const addprojectMutation = useMutation({
        mutationFn: postTaskAPI,
        onSuccess: ()=>{
            toast({
                title: 'Project added ✅',
                description: 'The new Project has been created',
            });
            onProjectAdded();
            onClose();
            setTitle('');
            setDescription('');
            setPriority('medium');
            setStatus('todo');
            setDueDate('');
        },
        onError: ()=>{
            toast({
                title: 'Something went wrong 🥲',
                description: 'Could not create project',
                variant: 'destructive',
            });
        },
    });

    const handleAdd = ()=>{
        addprojectMutation.mutate({
            title,
            description,
            priority,
            status,
            dueDate,
            assigneeId:1

        })
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='bg-gray-900 border-gray-700 text-white'>
            <DialogHeader>
                <DialogTitle className='text-white'>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Project Title'/>
                <Textarea value={description} onChange={(e)=> setDescription(e.target.value)} placeholder='Project Description'/>
                <Input value={dueDate} onChange={(e)=>setDueDate(e.target.value)} type='date'/>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className='bg-gray-800 text-white'>
                        <SelectValue placeholder="Select Status"/>
                    </SelectTrigger>
                    <SelectContent className='bg-gray-800 text-white'>
                        <SelectItem value='todo' >Todo</SelectItem>
                        <SelectItem value='inprogress'>In Progress</SelectItem>
                        <SelectItem value='done'>Done</SelectItem>

                    </SelectContent>
                </Select>
                <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className='bg-gray-700 text-white'>
                        <SelectValue placeholder="Select Priority"/>
                    </SelectTrigger>
                    <SelectContent className='bg-gray-800 text-white'>
                        <SelectItem value='low'>Low</SelectItem>
                        <SelectItem value='medium'>Medium</SelectItem>
                        <SelectItem value='high'>High</SelectItem>

                    </SelectContent>
                </Select>
                <Button onClick={handleAdd} className='w-full bg-blue-600 hover:bg-blue-700 text-white '>Add Project</Button>
            </div>
        </DialogContent>

    </Dialog>
  )
}

export default AddProjectModal