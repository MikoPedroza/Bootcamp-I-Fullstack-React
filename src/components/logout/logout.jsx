import { Button } from "../ui/button"
import { LogOut } from "lucide-react" // Already installed with shadcnui

import Cookies from "js-cookie"
import { useNavigate } from "react-router"

// export function Logout (){
//     return (
//         <div className="flex justify-end">
//             <Button variant="outline" size="icon">
//                 <LogOut className="h-4 w-4"/>
//             </Button>
//         </div>
//     )

// }
export function Logout (){
    const navigate = useNavigate();

    function handleClick() {
        Cookies.remove("token");
        navigate("/");
    }

    return (
        <div className="flex justify-end">
            <Button onClick={handleClick} variant="outline" size="icon">
                <LogOut className="h-4 w-4"/>
            </Button>
        </div>
    )

}