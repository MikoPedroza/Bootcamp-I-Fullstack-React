import React,  { useContext, useEffect, useState } from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Pagination } from "@/components/ui/pagination"

import { TasksContext } from "@/context/tasks.context"
import { extractQueryString } from "@/lib/extractQueryString"
import { useNavigate } from "react-router"

// export function OrderSelect() {
//     return (
//         <Select>
//             <SelectTrigger className="w-[140px]">
//                 <SelectValue placeholder="Select Order" />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectGroup>
//                 {/* <SelectLabel>Fruits</SelectLabel> */}
//                 <SelectItem value="asc">Asc</SelectItem>
//                 <SelectItem value="dsc">Dsc</SelectItem>
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     )
// }
export function OrderSelect() {
    const { tasks, setTasks } = useContext(TasksContext);
    const [ currentOrder, setCurrentOrder ] = useState();
    const [ query, setQuery ] = useState();
    const navigate = useNavigate();

    // console.log("OrderSelect::tasks: ", tasks);

    // const order = tasks ? extractQueryString(tasks.pagination.links.next).get("order") : undefined;
    // console.log("OrderSelect::order: ", order);
    // check every property is defined 
    // const order = tasks?.pagination?.links?.next ? extractQueryString(tasks.pagination.links.next).get("order") : undefined;
    let order = tasks?.pagination?.links?.next ? extractQueryString(tasks.pagination.links.next).get("order") : undefined;
    // console.log("OrderSelect::order: ", order); 

    useEffect( () => {
        // if(tasks) {
        if(tasks?.pagination?.links?.currentPage) {
            let currentPage = extractQueryString( tasks.pagination.links.currentPage );
            // let query = currentPage ? `/tasks?limit=${currentPage.get("limit")}&page=${currentPage.get("page")}` : "/tasks";
            // change to undefined to satisfy 2nd useEffect condition
            let query = currentPage ? `/tasks?limit=${currentPage.get("limit")}&page=${currentPage.get("page")}` : undefined;
            // console.log("OrderSelect::currentPage: ", currentPage);

            setQuery(query);
        }
        
    }, [tasks]);

    useEffect( () => {
        if(currentOrder && query) {
            navigate(`${query}&order=${currentOrder}`);
        }
        if(currentOrder && !query) {
            navigate(`/tasks?order=${currentOrder}`);
        }
    }, [currentOrder] );

    return (
        // <Select>
        <Select 
            value = { currentOrder ?? order }
            onValueChange = { (value) => setCurrentOrder(value) }>
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Order" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="asc">Asc</SelectItem>
                <SelectItem value="dsc">Dsc</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
