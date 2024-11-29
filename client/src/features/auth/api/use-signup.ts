import http from '@/features/http';

interface SignUpData {
    email: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface MessageSignUp {
    success: boolean;
    data: string;
}

interface MessageSignIn {
    success: boolean;
    data: {
        user: {
            id: string;
            fullName: string;
            email: string;
            phoneNumber: string | null;
            avatarUrl: string | null;
            gender: string | null;
            verified: boolean;
            createdAt: string;
            updatedAt: string;
        };
    };
}

export const signup = (data: SignUpData) =>
    http.post<MessageSignUp>('/auth/sign-up', data);

export const signin = (data: SignInData) =>
    http.post<MessageSignIn>('/auth/sign-in', data);
