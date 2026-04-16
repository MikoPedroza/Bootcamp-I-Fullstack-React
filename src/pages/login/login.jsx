import { Link, useNavigate } from "react-router";
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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { LoginSchema } from "@/schema/login.schema";
import { useLogin } from "@/hooks/useLogin.hook";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

// export default function Login() {
//         return (
//             <>
//                 <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
//                     <div className="w-4/12">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Login</CardTitle>
//                                 <CardDescription>Login and Create Tasks</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <Input className="mb-4" type="email" placeholder="Email" />
//                                 <Input className="mb-4" type="pasword" placeholder="Password" />
//                             </CardContent>
//                             <CardFooter className="flex flex-row justify-between" >
//                                 <p className="basis-1/2">
//                                     Don't have an account? {" "}
//                                     <Link to="/signup" className="hover:text-blue-500" >
//                                         Signup Here
//                                     </Link>
//                                 </p>
//                                 <Button>
//                                     Login
//                                 </Button>
//                             </CardFooter>
//                         </Card>
//                     </div>
//                 </section>
//             </>
//         )
// }
export default function Login() {
    const { mutate, isLoading, isError, isSuccess } = useLogin();
    const [ login, setLogin  ] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
    });

    function onSubmit(values) {
        console.log(values);

        mutate(values); 
        form.reset();
    };

    useEffect( () => {
        if(isSuccess){
            console.log(isSuccess); 
            setLogin(true);    
        }
    }, [isSuccess]);

    useEffect( () => {
        if(login){
            // redirect to task page when true
            navigate("/tasks");
        }
    }, [ login ]);

    useEffect( () => {
        if(isError){
            toast({
                title: "Login request failed",
                description: "Please check your login details",
                variant: "destructive",
            })
        }
    }, [isError]);



        return (
            <>
                <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
                    <div className="w-4/12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>Login and Create Tasks</CardDescription>
                            </CardHeader>
                            <Form {...form}>
                                <form action="" onSubmit={ form.handleSubmit(onSubmit) }>
                                    <CardContent>
                                        <FormField
                                            control = {form.control}
                                            name = "email"
                                            render = { ({ field }) => (
                                                <FormItem className="mb-4">
                                                    <FormControl>
                                                        <Input 
                                                            type="email" 
                                                            placeholder="Email" 
                                                            {...field} 
                                                            value={ field.value ?? ""}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control = {form.control}
                                            name = "password"
                                            render = { ({ field }) => (
                                                <FormItem className="mb-4">
                                                    <FormControl>
                                                        <Input 
                                                            type="password" 
                                                            placeholder="Password" 
                                                            {...field}
                                                            value={ field.value ?? ""}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                    <CardFooter className="flex flex-row justify-between" >
                                        <p className="basis-1/2">
                                            Don't have an account? {" "}
                                            <Link to="/signup" className="hover:text-blue-500" >
                                                Signup Here
                                            </Link>
                                        </p>
                                        <Button type="submit">
                                            Login
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Form>
                        </Card>
                    </div>
                    <Toaster/>
                </section>
            </>
        )
}