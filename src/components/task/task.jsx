import React, { useState, useEffect } from "react";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useUpdateTask } from "@/hooks/useUpdateTask.hook"
import { useQueryClient } from "@tanstack/react-query";


// export function Task(props) {
//     // const {
//     //     title = "This is the default title",
//     //     description = "This is the default description",
//     //     status = "todo",
//     //     priority = "normal",
//     //     dueDate = new Date("2026-01-01T12-:00:00.000Z"),
//     // } = props;
//     const {
//         title = "This is the default title",
//         description = "This is the default description",
//         status = "todo",
//         priority = "normal",
//         dueDate = new Date("2026-01-01T12-:00:00.000Z"),
//         id,
//     } = props;

//     const formattedDate = dueDate.toLocaleDateString("en-GB", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//     });

//     return (
//         <Card className="w-full mb-8">
//         <CardHeader className="flex flex-row justify-between items-center">
//             <CardTitle className="flex basis-2/3 leading-8">
//                 {title}
//             </CardTitle>
//             <div>
//                 <Badge className="mr-2" variant="outline">
//                     1 Jan, 2026
//                 </Badge>
//                 {/* <Badge className="bg-sky-800" variant="outline">
//                     normal
//                 </Badge> */}

//                 { priority === "normal" && (
//                     <Badge className="bg-sky-800" variant="outline">
//                         { priority }
//                     </Badge>
//                 )}
//                 { priority === "high" && (
//                     <Badge className="bg-red-800" variant="outline">
//                         { priority }
//                     </Badge>
//                 )}
//                 { priority === "low" && (
//                     <Badge className="bg-green-800" variant="outline">
//                         { priority }
//                     </Badge>
//                 )}


//             </div>
//         </CardHeader>
//         <CardContent>
//             <CardDescription>{description}</CardDescription>

//         </CardContent>
//         <CardFooter className="flex justify-between">
//             {/* <Button variant="outline">Cancel</Button> */}
//             {/* <div className="flex items-center space-x-2"> */}
//             <div className="flex items-center">
//                 <Switch 
//                     checked = { status === "inProgress" ? true : false }
//                     onCheckedChange = { () => console.log("Switch changed") }
//                     id="in-progress" />
//                 <Label className="ml-4" htmlFor="in-progress">In Progress</Label>
//             </div>
//             <Button>Completed</Button>
//         </CardFooter>
//         </Card>
//     )
// }
export function Task(props) {
    const { mutate, isSuccess } = useUpdateTask();
    const [ progress, setProgress ] = useState(false);  // set false by default

    const queryClient = useQueryClient();


    const {
        title = "This is the default title",
        description = "This is the default description",
        status = "todo",
        priority = "normal",
        dueDate = new Date("2026-01-01T12-:00:00.000Z"),
        id,
    } = props;

    const formattedDate = dueDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    useEffect( () => {
        if( status === "inProgress") {
            // setProgress = true;
            setProgress(true);
        }
    }, [status]);

    function handleProgressChange(value) {
        setProgress(value);
        mutate({ 
            _id: id,
            status: value ? "inProgress" : "todo",
        });``

        queryClient.invalidateQueries({
            queryKey: ["fetchTasks"],
            exact: false,
            refetchType: "all", // refetch both active and inactive queries
        });
    }
    
    function handleTaskCompleted(value) {
        setProgress(value);
        mutate({ 
            _id: id,
            status: "completed",
        });

        queryClient.invalidateQueries({
            queryKey: ["fetchTasks"],
            exact: false,
            refetchType: "all", // refetch both active and inactive queries
        });
    }

    return (
        <Card className="w-full mb-8">
        <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="flex basis-2/3 leading-8">
                {title}
            </CardTitle>
            <div>
                <Badge className="mr-2" variant="outline">
                    1 Jan, 2026
                </Badge>
                {/* <Badge className="bg-sky-800" variant="outline">
                    normal
                </Badge> */}

                { priority === "normal" && (
                    <Badge className="bg-sky-800" variant="outline">
                        { priority }
                    </Badge>
                )}
                { priority === "high" && (
                    <Badge className="bg-red-800" variant="outline">
                        { priority }
                    </Badge>
                )}
                { priority === "low" && (
                    <Badge className="bg-green-800" variant="outline">
                        { priority }
                    </Badge>
                )}


            </div>
        </CardHeader>
        <CardContent>
            <CardDescription>{description}</CardDescription>

        </CardContent>
        <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            {/* <div className="flex items-center space-x-2"> */}
            <div className="flex items-center">
                {/* <Switch 
                    checked = { status === "inProgress" ? true : false }
                    onCheckedChange = { () => console.log("Switch changed") }
                    id="in-progress" />
                <Label className="ml-4" htmlFor="in-progress">In Progress</Label> */}
                <Switch 
                    checked = { progress }
                    onCheckedChange = { handleProgressChange }
                    id="in-progress" />
                <Label className="ml-4" htmlFor="in-progress">In Progress</Label>
            </div>
            <Button onClick = { handleTaskCompleted } >Completed</Button>
        </CardFooter>
        </Card>
    )
}
