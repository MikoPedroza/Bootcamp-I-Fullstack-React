import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignupSchema } from "@/schema/signup.schema"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useSignup } from "@/hooks/useSignup.hook"


// export default function Signup() {
//     return (
//         <>
//             <h1 className="text-6xl">Signup Page</h1>
//         </>
//     )
// }

/* Note: For pseudo class (e.g. hover), there should be no spaces after ':' */
// export default function Signup() {
//     return (
//         <>
//             <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
//                 <div className="w-4/12">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Signup</CardTitle>
//                             <CardDescription>Create a new account to start creating tasks</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Input className="mb-4" type="text" placeholder="First Name" />
//                             <Input className="mb-4" type="text" placeholder="Last Name" />
//                             <Input className="mb-4" type="email" placeholder="Email" />
//                             <Input className="mb-4" type="pasword" placeholder="Password" />
//                         </CardContent>
//                         <CardFooter className="flex flex-row justify-between" >
//                             <p className="basis-1/2">
//                                 Already have an account? {" "}
//                                 <Link to="/" className="hover:text-blue-500" >
//                                     Login Here
//                                 </Link>
//                             </p>
//                             <Button>
//                                 Signup
//                             </Button>
//                         </CardFooter>
//                     </Card>
//                 </div>
//             </section>
//         </>
//     )
// }
export default function Signup() {

    const { mutate, isLoading, isError, isSuccess} = useSignup();

    const form = useForm({
        resolver: zodResolver(SignupSchema),
    });

    function onSubmit(values) {
        console.log(values);

        mutate(values);
        form.reset();
    };

    return (
        <>
            <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
                <div className="w-4/12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>Create a new account to start creating tasks</CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form action="" onSubmit={ form.handleSubmit(onSubmit) }>
                                <CardContent>
                                    <FormField
                                        control = {form.control}
                                        name = "firstName"
                                        render = { ({ field }) => (
                                            <FormItem className="mb-4">
                                                <FormControl>
                                                    <Input type="text" placeholder="First Name" {...field} value={ field.value ?? ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control = {form.control}
                                        name = "lastName"
                                        render = { ({ field }) => (
                                            <FormItem className="mb-4">
                                                <FormControl>
                                                    <Input type="text" placeholder="Last Name" {...field} value={ field.value ?? ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control = {form.control}
                                        name = "email"
                                        render = { ({ field }) => (
                                            <FormItem className="mb-4">
                                                <FormControl>
                                                    <Input type="email" placeholder="Email" {...field} value={ field.value ?? ""} />
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
                                                    <Input type="password" placeholder="Password" {...field} value={ field.value ?? ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="flex flex-row justify-between" >
                                    <p className="basis-1/2">
                                        Already have an account? {" "}
                                        <Link to="/" className="hover:text-blue-500" >
                                            Login Here
                                        </Link>
                                    </p>
                                    <Button type="submit">
                                        Signup
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>

                    </Card>
                </div>
            </section>
        </>
    )
}