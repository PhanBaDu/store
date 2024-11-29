import { prisma } from '../../config/db';
import { NOT_FOUND } from '../../constants/http';
import AppError from '../../utils/AppError';
import { hashValue } from '../../utils/bcrypt';

interface VerifiParams {
    code: string;
    password: string;
    confirmPassword: string;
}
export const verifyEmail = async ({
    code,
    password,
    confirmPassword,
}: VerifiParams) => {
    const validCode = await prisma.verificationCode.findUnique({
        where: {
            id: code,
        },
        include: {
            user: true,
        },
    });

    if (!validCode || validCode.expiresAt < new Date()) {
        throw new AppError(NOT_FOUND, 'Invalid or expired verification code');
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: validCode.userId,
        },
        data: {
            verified: true,
            password: await hashValue(password, 10),
        },
    });

    await prisma.verificationCode.delete({
        where: {
            id: validCode.id,
        },
    });

    return {
        message: 'Email was successfully verified',
    };
};
