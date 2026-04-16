import { TasksCounter } from "@/components/tasksCounter/tasksCounter.jsx";
import { FilterBar } from "@/components/filterBar/filterBar";
import { Task } from "@/components/task/task";
import { TaskSidebar } from "@/components/taskSidebar/taskSidebar";
import { useFetchTasks } from "@/hooks/useFetchTasks.hook";
// import { useState } from "react";
import { useState, useContext, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton"

import { TasksContext } from "@/context/tasks.context";
import { useSearchParams } from "react-router";


function DisplaySkeleton() {
    return (
        <div className="flex items-center space-x-4 mb-12">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[500px]" />
                <Skeleton className="h-4 w-[400px]" />
            </div>
        </div>
    )
}

function todaysDate() {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    };

    const formattedDate = today.toLocaleDateString("en-GB", options);

    return formattedDate;
}

export default function Tasks() {
    // Hooks
    const [searchParams, setSearchParams] = useSearchParams();
    // console.log("Tasks: ", searchParams);
    // console.log("Tasks limit: ", searchParams.get("limit"));

    let queryLimit = searchParams.get("limit") ?? 5;
    let queryPage = searchParams.get("page") ?? 1;
    let queryOrder = searchParams.get("order") ?? "asc";

    // const [order, setOrder] = useState( queryOrder ?? "asc" );
    // const [limit, setLimit] = useState( queryLimit ?? 5 );
    // const [page, setPage] = useState( queryPage ?? 1 );

    // Context API 
    const { tasks, setTasks } = useContext(TasksContext);

    const { data, isError, isSuccess, isPending, error } = useFetchTasks({
        order : queryOrder,
        limit : queryLimit,
        page : queryPage,
    }); // shorthand for order: order, etc.

    // console.log(data);

    // console.log("Tasks.jsx useEffect: ", data);

    useEffect( () => {
        if(data) {
            setTasks(data);
        }
    }, [data]);

    console.log("Tasks:: ", tasks);

    return (
        <section className="flex flex-row w-full p-4 gap-8 ">
            <section className="flex basis-2/3 justify-center">
                <div className="flex flex-col w-10/12 p-4 items-center">
                    {/* <h1 className="text-white font-bold text-2xl mb-8 w-full">
                        Tasks as on: Wednesday, 1 Jan 2025
                    </h1> */}
                    <h1 className="text-white font-bold text-2xl mb-8 w-full">
                        Tasks as on: {todaysDate()}
                    </h1>
                    <div className="w-11/12 flex flex-col">
                        <div className="flex justify-between mb-16">
                            {/* <TasksCounter count={4} type="todo"></TasksCounter>
                            <TasksCounter count={10} type="inProgress"></TasksCounter>
                            <TasksCounter count={5} type="completed"></TasksCounter> */}

                            {/* Updated counters with server side */}
                            <TasksCounter
                                count={tasks ? tasks.pagination.meta.todoTasks : 0}
                                type="todo"
                            />
                            <TasksCounter
                                count={tasks ? tasks.pagination.meta.inProgressTasks : 0}
                                type="inProgress"
                            />
                            <TasksCounter
                                count={tasks ? tasks.pagination.meta.completedTasks : 0}
                                type="completed"
                            />

                        </div>
                        <FilterBar></FilterBar>
                        {/* {data && <FilterBar />} */}

                        {/*Display loading when data is not yet available*/}
                        { !data && 
                            // [ ...Array(limit)]
                            //     .map((_entry, index) => (
                            //         <DisplaySkeleton key={ `${index}skel` } />
                            //     ))
                            [ ...Array(queryLimit)]
                                .map((_entry, index) => (
                                    <DisplaySkeleton key={ `${index}skel` } />
                                ))
                        }

                        {/*Load the tasks */}
                        { data && 
                            data.data.map( (task) => (
                                <Task 
                                    key= { task["_id"] }
                                    title = { task.title }
                                    priority = { task.priority }
                                    status = { task.status }
                                    description = { task.description }
                                    dueDate = { new Date( task.dueDate ) }
                                    id = { task._id }
                                /> 
                            ) 
                        )}
                        {/* <Task></Task>                      */}
                    </div>

                </div>
            </section>
            {/* <section className="flex basis-1/3 justify-center"> */}
            <section className="flex basis-1/3 justify-center">
                {/* Create Task Section */}
                <TaskSidebar></TaskSidebar>
            </section>
        </section>
    );
}