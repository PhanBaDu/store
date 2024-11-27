import { prisma } from '../config/db';
import AppError from '../utils/AppError';
import { BAD_REQUEST } from '../constants/http';

interface SignUpParams {
    email: string;
    password: string;
    userAgent?: string;
}

export const createAccount = async (data: SignUpParams) => {
    throw new AppError(404, 'Trang khong ton tai');
};
