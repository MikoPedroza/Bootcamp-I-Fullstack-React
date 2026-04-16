import { z } from "zod"

const passwordValidation = new RegExp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

export const SignupSchema = z.object ({
    firstName: z.string().min(3, {
        message: "First name must be at least 3 characters.",
    }).max(100, {
        message: "First name cannot be more than 100 characters",
    }),
    lastName: z
    .string()
    .max(100, {
        message: "Last name cannot be more than 100 characters",
    }).optional(),
    email: z.string().email()
    // .min(5, {
    //     message: "Email must be at least 5 characters.",
    // })
    ,
    // password: z
    // .string()
    // // .password()
    // // .min(8, {
    // //     message: "Password must be at least 8 characters.",
    // // })
    // .regex(passwordValidation, {
    //     message: "Password must include 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.",
    // }),
    password: z.string().regex(passwordValidation, {
    message:
        "Password must be atleast 8 characters and must include at least one number, one uppercase letter, one lowercase letter, and one special character.",
    }),
});