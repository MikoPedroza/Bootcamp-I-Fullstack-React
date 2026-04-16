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
import { useContext, useState, useEffect } from "react"
import { TasksContext } from "@/context/tasks.context.jsx"
import { extractQueryString } from "@/lib/extractQueryString";

import { Link } from "react-router";

export function TaskPagination (){
    const [ links, setLinks ] = useState();
    const [ meta, setMeta ] = useState();
    const { tasks, setTasks} = useContext(TasksContext);

    // check every property is defined
    const previousPage = links?.previous ? extractQueryString(links.previous).toString() : "#";
    const nextPage = links?.next ? extractQueryString(links.next).toString() : "#";
    const order = links?.next ? extractQueryString(links.next).get("order") : "#";    

    // console.log("PaginationComponent:: tasks", tasks);

    // console.log("PaginationComponent:: meta", meta);

    useEffect( () => {
        if(tasks) {
            setLinks(tasks.pagination.links);
            setMeta(tasks.pagination.meta);
        }
    }, [tasks] );

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {/* <PaginationPrevious href={`/tasks?${previousPage}`} /> */}
                    <PaginationPrevious to = {`/tasks?${previousPage}`} />
                </PaginationItem>

                {/* {
                    meta && [...Array(meta.totalPages)].map( (item, index) => (
                        <PaginationItem key={`page${index}`}>
                            <PaginationLink 
                                href={`/tasks?limit=${meta.itemsPerPage}&page=${index + 1}&order=${order}`} 
                                isActive = { index + 1 == meta.currentPage ? true : false }
                            >
                                { index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ) )
                } */}
                {
                    meta && [...Array(meta.totalPages)].map( (item, index) => (
                        <PaginationItem key={`page${index}`}>
                            <PaginationLink 
                                to = {`/tasks?limit=${meta.itemsPerPage}&page=${index + 1}&order=${order}`} 
                                isActive = { index + 1 == meta.currentPage ? true : false }
                            >
                                { index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ) )
                }
                {/* {
                    meta ? [...Array(meta.totalPages)].map( (item, index) => (
                        <PaginationItem key={`page${index}`}>
                            <PaginationLink 
                                href={`/tasks?limit=${meta.itemsPerPage}&page=${index + 1}&order=${order}`} 
                                isActive = { index + 1 == meta.currentPage ? true : false }
                            >
                                { index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ) )
                    : null
                } */}

                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    {/* <PaginationNext href={`/tasks?${nextPage}`} /> */}
                    <PaginationNext to = {`/tasks?${nextPage}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}