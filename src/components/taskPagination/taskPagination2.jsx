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

// Moved to lib: extractQueryString.js
// function extractQueryString(url) {
//     const parsedURL = new URL(url);

//     console.log("extractQueryString:: parsedURL:", parsedURL);

//     const params = new URLSearchParams(parsedURL.searchParams);

//     return params;
// }

export function TaskPagination (){
    const [ links, setLinks ] = useState();
    const [ meta, setMeta ] = useState();
    const { tasks, setTasks} = useContext(TasksContext);

    // const previousPage = links ? extractQueryString(links.previous).toString() : "#";
    // const nextPage = links ? extractQueryString(links.next).toString() : "#";
    // const order = links ? extractQueryString(links.next).get("order") : "#";
    // check every property is defined
    const previousPage = links?.previous ? extractQueryString(links.previous).toString() : "#";
    const nextPage = links?.next ? extractQueryString(links.next).toString() : "#";
    const order = links?.next ? extractQueryString(links.next).get("order") : "#";
    // const currentPage = links ? extractQueryString(links.currentPage).get("page") : "#";
    

    // console.log("PaginationComponent:: tasks", tasks);

    // console.log("PaginationComponent:: meta", meta);

    useEffect( () => {
        if(tasks) {
            setLinks(tasks.pagination.links);
            setMeta(tasks.pagination.meta);
        }
    }, [tasks] );

    // return (
    //     <Pagination>
    //         <PaginationContent>
    //             <PaginationItem>
    //                 <PaginationPrevious href="#" />
    //             </PaginationItem>
    //             <PaginationItem>
    //                 <PaginationLink href="#">1</PaginationLink>
    //             </PaginationItem>
    //             <PaginationItem>
    //                 <PaginationLink href="#" isActive>2</PaginationLink>
    //             </PaginationItem>
    //             <PaginationItem>
    //                 <PaginationEllipsis />
    //             </PaginationItem>
    //             <PaginationItem>
    //                 <PaginationNext href="#" />
    //             </PaginationItem>
    //         </PaginationContent>
    //     </Pagination>
    // )
    // const previouslink = currentPage > 1 ? currentPage -1 : 1;
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`/tasks?${previousPage}`} />
                </PaginationItem>
                {/* <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem> */}
                {/* <PaginationItem>
                    <PaginationLink href="#">{previouslink}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>{currentPage}</PaginationLink>
                </PaginationItem> */}

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
                }

                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext href={`/tasks?${nextPage}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}