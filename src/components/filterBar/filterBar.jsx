import { TaskPagination } from "../taskPagination/taskPagination"
import { OrderSelect } from "../orderSelect/orderSelect"


export function FilterBar (){
    return (
        <>
            <nav className="flex flex-row justify justify-between mb-8">
                <TaskPagination></TaskPagination>
                <OrderSelect></OrderSelect>
            </nav>
        </>
    )
}