import * as React from "react";


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

export function Task(props) {
    const {
        title = "This is the default title",
        description = "This is the default description",
        status = "todo",
        priority = "normal",
        dueDate = new Date("2026-01-01T12-:00:00.000Z"),
    } = props;

    const formattedDate = dueDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }); 

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
                <Switch 
                    checked = { status === "inProgress" ? true : false }
                    onCheckedChange = { () => console.log("Switch changed") }
                    id="in-progress" />
                <Label className="ml-4" htmlFor="in-progress">In Progress</Label>
            </div>
            <Button>Completed</Button>
        </CardFooter>
        </Card>
    )
}
