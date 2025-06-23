import React, { useState } from 'react'
import { Select, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useQuery } from '@tanstack/react-query'
import { getAllTasksAPI } from '@/services/allAPI'
import TaskModal from './TaskModal'

type Task = {
  id: string
  title: string
  description: string
  priority: string
  status: "todo" | "inprogress" | "done"
  dueDate: string
  assigneeId: string | number
}

const Dashboard = () => {
      const [selectedTask, setSelectedTask] = useState<Task | null>(null)
      const [searchQuery, setSearchQuery]= useState("")
      const {data: tasks=[], isLoading, isError} = useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: async ()=>{
          const res = await getAllTasksAPI()
          return res.data
        },
      })

      const filteredTasks = tasks.filter((task)=>
     task.title.toLowerCase().includes(searchQuery) 
      )

      const todoTasks = filteredTasks.filter((task)=> task.status === "todo")
      const inProgressTasks = filteredTasks.filter((task)=> task.status === "inprogress")
      const doneTasks = filteredTasks.filter((task)=> task.status==="done")

  return (
    <main className='relative z-10 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-6 py-4 mb-6 shadow-xl animate-fade-in'>Project Manager Dashboard</h1>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <Select>
          <SelectTrigger className='w-full sm:w-48 bg-white/5 backdrop-blur-md border border-white/10 text-muted-foreground shadow-md hover:shadow-lg transition-all duration-300'>
          <SelectValue placeholder="All Projects"/>
          </SelectTrigger>
        </Select>
        <Input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value.toLowerCase())} placeholder='Search Projects...' className='w-full sm:w-64 bg-white/5 backdrop-blur-md text-muted-foreground border border-white/10 shadow-md hover:shadow-lg transition-all duration-300'/>

      </div>
      {isLoading && <p className='text-white mt-6'>Loading tasks...</p>}
      {isError && <p className='text-red-400 mt-6'>Failed to load task.</p>}

        {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            {label: "To Do", color:"yellow", tasks: todoTasks},
            {label: "In Progress", color:"blue", tasks: inProgressTasks},
            {label: "Completed", color: "green", tasks: doneTasks},
          ].map(({ label, color, tasks})=>(
            <section key={label} className={`relative space-y-4 p-4 rounded-xl bg-gradient-to-br from-${color}-400/10 via-transparent to-transparent shadow-inner backdrop-blur-md`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2.5 h-2.5 rounded-full bg-${color}-400 animate-pulse`}/>
                <h2 className={`text-sm font-bold uppercase text-${color}-300 tracking-wide`}>{label}</h2>
              </div>
              {tasks.map((task)=>(
                <div className="cursor-pointer" onClick={()=> setSelectedTask(task)}>
                  <Card key={task.id} className={`relative group bg-${color}-200/10 backdrop-blur-lg border border-${color}-300/20 rounded-xl p-4 shadow-lg hover:shadow-${color}-300/40 transition-all duration-300`}>
                  <div className={`absolute left-0 top-0 h-full w-1 bg-${color}-400`}/>
                  <CardHeader>
                    <CardTitle className={`text-${color}-100`}>{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent className={`text-sm text-${color}-200`}>
                    {task.description} <br />
                    Deadline: {label === "Completed" ? "Completed" : task.dueDate}
                  </CardContent>
                </Card>
                </div>
              ))}
            </section>
          ))}
      </div>

        )}       
        <TaskModal task={selectedTask} onClose={()=> setSelectedTask(null)}/>
         
    </main>
  )
}

export default Dashboard