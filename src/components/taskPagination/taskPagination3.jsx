import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

// Context API
import { useContext, useState } from "react"
import { TasksContext } from "@/context/tasks.context.jsx"


// export function TaskPagination (){
//     return (
//         <Pagination>
//             <PaginationContent>
//                 <PaginationItem>
//                     <PaginationPrevious href="#" />
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationLink href="#">1</PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationLink href="#" isActive>2</PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationEllipsis />
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationNext href="#" />
//                 </PaginationItem>
//             </PaginationContent>
//         </Pagination>
//     )
// }
export function TaskPagination (){
    const { tasks, setTasks} = useContext(TasksContext);

    console.log("PaginationComponent:", tasks);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}