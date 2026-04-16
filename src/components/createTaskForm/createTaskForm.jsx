import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CreateTaskSchema } from "@/schema/createTask.schema"
import { useCreateTask } from "@/hooks/useCreateTask.hook"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
// to refetch after create task
import { useQueryClient } from "@tanstack/react-query"



export function CreateTaskForm (){
    const [date, setDate] = useState();
    const { mutate, isSuccess, isError, isPending } = useCreateTask();
    const { toast } = useToast();
    
    // for refetch
    const queryClient = useQueryClient();    

    const form = useForm({
        resolver: zodResolver(CreateTaskSchema),

        /*  To get rid of teh state change error add default values */
        defaultValues: {
        title: "",
        },
    });

    function onSubmit(values) {

        console.log("onSubmit:: values: ",values);

        // let dueDate = JSON.stringify( values.dueDate);
        let dueDate =  values.dueDate.toISOString();
        // console.log(dueDate);

        mutate( {...values, dueDate} );
        form.reset();

        // for refetch
        console.log("onSubmit:: invalidateQueries")
        queryClient.invalidateQueries({
            queryKey: ["fetchTasks"],
            exact: false,
            refetchType: "all", // refetch both active and inactive queries
        });
    };

    useEffect( () => {
        if(isSuccess){
            // load toast
            toast( {
                title: "New Task Created.",
                description: "Task Created Successfully.",
            } );
        }
    }, [isSuccess]);

    useEffect( () => {
        if(isError){
            // load toast
            toast( {
                title: "An error occurred creating a task.",
                description: "Please check the information.",
                variant: "destructive",
            } );
        }
    }, [isError]);

    return <div>
        <h2 className="text-xl mb-4">Create a task</h2>
        <Form {...form}>
            <form action="" onSubmit={ form.handleSubmit(onSubmit) } >
                <div className="py-2">
                    <FormField
                        control = {form.control}
                        name = "title"
                        render = { ({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        placeholder="Task Title" 
                                        {...field} 
                                        value={ field.value ?? ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-row justify-between py-2">
                    <div className="mr-2 w-full">
                        <FormField
                            control = {form.control}
                            name = "status"
                            render = { ({ field }) => (
                                <FormItem>
                                    <Select 
                                        onValueChange = { field.onChange }
                                        defaultValue = { field.value }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="todo">Todo</SelectItem>
                                                <SelectItem value="inProgress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full ml-2">
                        <FormField
                            control = {form.control}
                            name = "priority"
                            render = { ({ field }) => (
                                <FormItem>
                                    <Select 
                                        onValueChange = { field.onChange }
                                        defaultValue = { field.value }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="py-2">
                    <FormField
                        control = {form.control}
                        name = "dueDate"
                        render = { ({ field }) => (
                            <FormItem>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                                >
                                                {/* <CalendarIcon /> */}
                                                <CalendarIcon className="mr-4" />
                                                    {/* {date ? format(date, "PPP") : <span>Due Date</span>} */}
                                                    {field.value ? format(field.value, "PPP") : <span>Due Date</span>}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            // selected={date}
                                            selected={field.value}
                                            // onSelect={setDate}
                                            onSelect={field.onChange}
                                            disabled = { (date) => date < new Date() } // Disable/do not show dates before the current date
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />  
                </div>
                <div className="py-2">
                    <FormField
                        control = {form.control}
                        name = "description"
                        render = { ({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea 
                                        type="text" 
                                        placeholder="Description of the task." 
                                        {...field} 
                                        value={ field.value ?? ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />             
                </div>
                <div className="py-2 flex justify-end">
                    <Button type="submit" >Create Task</Button>
                </div>
            </form>
        </Form>
        <Toaster/>
    </div>

}