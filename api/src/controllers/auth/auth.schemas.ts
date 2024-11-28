import { z } from 'zod';

export const emailSchema = z.string().email().min(1).max(255);

const passwordSchema = z.string().min(6).max(255);

export const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    userAgent: z.string().optional(),
});

export const signinSchema = z.object({
    email: emailSchema,
    passwordUser: passwordSchema,
    userAgent: z.string().optional(),
});

export const verificationCodeSchema = z.string().min(1).max(36);
