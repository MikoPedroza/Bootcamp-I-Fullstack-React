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





export function CreateTaskForm (){
    // const [date, setDate] = React.useState<Date>();
    const [date, setDate] = useState();

    return <div>
        <h2 className="text-xl mb-4">Create a task</h2>
        <form action="">
            <div className="py-2">
                <Input type="text" name="" id="" placeholder="Task Title" />
            </div>
            <div className="flex flex-row justify-between py-2">
                <div className="mr-2 w-full">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            {/* <SelectLabel>Fruits</SelectLabel> */}
                            <SelectItem value="todo">Todo</SelectItem>
                            <SelectItem value="inProgress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full ml-2">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="py-2">
                <Popover>
                    <PopoverTrigger asChild>
                        {/* <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button> */}
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon />
                            {date ? format(date, "PPP") : <span>Due Date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="py-2">
                <Textarea placeholder="Description of the task." />
            </div>
            <div className="py-2 flex justify-end">
                <Button>Create Task</Button>
            </div>
        </form>
    </div>

}