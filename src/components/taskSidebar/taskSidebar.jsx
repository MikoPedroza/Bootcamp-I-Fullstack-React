import { Card } from "@/components/ui/card.jsx";
import styles from "./taskSidebar.module.css";
import UserProfile from "../userProfile/userProfile";
import { CreateTaskForm } from "../createTaskForm/createTaskForm";
import { Logout } from "../logout/logout";
import Cookies from "js-cookie";

// export function TaskSidebar (){
//     return (
//         <section className={`fixed right-4 top-4 ${ styles.sideBarHeight }`}>
//             <Card className="flex flex-col h-full w-full p-6 justify-between">
//                 <UserProfile></UserProfile>
//                 <CreateTaskForm></CreateTaskForm>
//                 <Logout></Logout>
//             </Card>
//         </section>
//     )
// }
export function TaskSidebar (){
    const user = JSON.parse(Cookies.get("user"));

    return (
        <section className={`fixed right-4 top-4 ${ styles.sideBarHeight }` } >
            <Card className="flex flex-col h-full w-full p-6 justify-between">
                <UserProfile firstName = {user ? user.firstName : ""} ></UserProfile>
                <CreateTaskForm></CreateTaskForm>
                <Logout></Logout>
            </Card>
        </section>
    )
}


