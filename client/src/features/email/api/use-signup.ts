import http from '@/features/http';

interface SignUpData {
    password: string;
    verifyId: string;
    confirmPassword: string;
}

interface Message {
    success: boolean;
    data: string;
}

export const verifyEmail = async (data: SignUpData) =>
    http.post<Message>(`/auth/email/verify/${data.verifyId}`, data);
