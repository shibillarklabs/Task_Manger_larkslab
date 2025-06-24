import React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllTasksAPI, updateTaskStatusAPI } from "@/services/allAPI"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { toast } from "@/hooks/use-toast"
import TaskDetailsModal from "./TaskDetailsModal"
import CommentModal from "./CommentModal"

type Task = {
  id: string
  title: string
  description: string
  priority: string
  status: "todo" | "inprogress" | "done"
  dueDate: string
  assigneeId: string
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

const DevDashboard = () => {
  const [taskDetails, setTaskDetails] = React.useState<Task | null>(null)
  const [commentModalTask, setCommentModalTask] = React.useState<Task | null>(null)

  const currentUser: User | null = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}")
    } catch {
      return null
    }
  }, [])

  const { data: tasks = [], isLoading, isError } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await getAllTasksAPI()
      return res.data
    },
  })

    const queryClient = useQueryClient()

    const mutation = useMutation({
      mutationFn: ({taskId, newStatus}: {taskId: string; newStatus: Task["status"]})=>
        updateTaskStatusAPI(taskId,newStatus),
      onSuccess: (_,{newStatus})=>{
        toast({
          title: "Task Updated",
          description: `Status changed to "${newStatus}" successfully`,
        })
        queryClient.invalidateQueries(["tasks"])

      },
      onError: ()=>{
        toast({
          title: "Update Failed",
          description: "Something went wrong updating the task",
          variant: "destructive",
        })
      },
    })

     
  const assignedTasks = tasks.filter(
    (task) => String(task.assigneeId) === String(currentUser?.id)
  )

  const getStatusClass = (status: string, type: "badge" | "hover" | "stripe") => {
    if (type === "badge") {
      if (status === "todo") return "bg-yellow-400 text-yellow-900"
      if (status === "inprogress") return "bg-blue-400 text-blue-900"
      return "bg-green-400 text-green-900"
    }
    if (type === "hover") {
      if (status === "todo") return "hover:shadow-yellow-400/30"
      if (status === "inprogress") return "hover:shadow-blue-400/30"
      return "hover:shadow-green-400/30"
    }
    if (type === "stripe") {
      if (status === "todo") return "bg-yellow-400"
      if (status === "inprogress") return "bg-blue-400"
      return "bg-green-400"
    }
    return ""
  }

  return (
    <section className="px-4 py-8 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome, {currentUser?.name || "Developer"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your assignments and manage your progress.
        </p>
      </div>

      {isLoading && (
        <p className="text-white text-sm mt-4">Loading tasks...</p>
      )}

      {isError && (
        <p className="text-red-500 text-sm mt-4">
          Something went wrong. Could not load tasks.
        </p>
      )}

      {!isLoading && assignedTasks.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">
          <p className="text-lg">🎉 You're all caught up!</p>
          <p className="text-sm mt-1">No tasks assigned to you right now.</p>
        </div>
      )}

      {!isLoading && assignedTasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {assignedTasks.map((task) => (
            <Card
              key={task.id}
              className={`relative group bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/10 rounded-xl shadow-md transition duration-300 ${getStatusClass(task.status, "hover")} hover:scale-[1.015] overflow-hidden`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 ${getStatusClass(
                  task.status,
                  "stripe"
                )} transition-transform group-hover:scale-y-105 origin-top`}
              />
              <CardHeader className="pb-1">
                <CardTitle className="text-lg font-semibold text-white">
                  {task.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusClass(
                      task.status,
                      "badge"
                    )}`}
                  >
                    {task.status === "todo"
                      ? "To Do"
                      : task.status === "inprogress"
                      ? "In Progress"
                      : "Completed"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {task.status === "done"
                      ? "Completed"
                      : `Due: ${task.dueDate}`}
                  </span>
                </div>

                <Select onValueChange={(value)=> mutation.mutate({taskId :task.id, newStatus: value as Task["status"]})}>
                  <SelectTrigger className="w-full bg-white/10 text-muted-foreground backdrop-blur border border-white/10 shadow-sm text-sm">
                    <SelectValue placeholder={task.status.charAt(0).toUpperCase() + task.status.slice(1)} />
                  </SelectTrigger>
                  <SelectContent className="text-black">
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <Button onClick={()=>setTaskDetails(task)} variant="secondary" className="text-xs px-3 py-1">
                    View Details
                  </Button>
                  <Button onClick={()=> setCommentModalTask(task)}
                    variant="ghost"
                    className="text-xs text-muted-foreground hover:text-white px-3"
                  >
                    💬 0
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <TaskDetailsModal task={taskDetails} onClose={()=>setTaskDetails(null)}/>
        <CommentModal isOpen={!!commentModalTask} taskTitle={commentModalTask?.title || ""} onClose={()=> setCommentModalTask(null)} taskId={commentModalTask?.id || ""} currentUser={currentUser}/>
    </section>
  )
}

export default DevDashboard