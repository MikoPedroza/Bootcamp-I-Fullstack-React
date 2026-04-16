import { Link } from "react-router";
import Tasks from "../tasks/tasks";
import Signup from "../signup/signup";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// export default function Login() {
//     return (
//         <>
//             <h1>This is a login page</h1>
//             <ul>
//                 <li>
//                     <Link to="tasks" >Tasks</Link>
//                 </li>
//                 <li>
//                     <Link to="signup" >Sign up</Link>
//                 </li>
//             </ul>
//         </>
//     );
// }
// export default function Login() {
//     return (
//         <>
//             <h1>This is a login page</h1>
//             <ul>
//                 <li>
//                     <Link to="tasks" >Tasks</Link>
//                 </li>
//                 <li>
//                     <Button asChild>
//                         <Link to="signup" >Sign up</Link>
//                     </Button>
//                 </li>
//             </ul>
//         </>
//     );
// }
export default function Login() {
        return (
            <>
                <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
                    <div className="w-4/12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>Login and Create Tasks</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Input className="mb-4" type="email" placeholder="Email" />
                                <Input className="mb-4" type="pasword" placeholder="Password" />
                            </CardContent>
                            <CardFooter className="flex flex-row justify-between" >
                                <p className="basis-1/2">
                                    Don't have an account? {" "}
                                    <Link to="/signup" className="hover:text-blue-500" >
                                        Signup Here
                                    </Link>
                                </p>
                                <Button>
                                    Login
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </section>
            </>
        )
}