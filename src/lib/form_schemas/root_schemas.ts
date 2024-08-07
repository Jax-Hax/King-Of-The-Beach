import { z } from 'zod';

export const loginSchema = z.object({
    password: z.string().min(6),
    email: z.string().email()
});
export const signupSchema = z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    email: z.string().email()
}).refine((schema) => schema.confirmPassword === schema.password, {message: "Passwords didn't match.", path: ["confirmPassword"]});


export type LoginSchema = typeof loginSchema;
export type SignupSchema = typeof signupSchema;