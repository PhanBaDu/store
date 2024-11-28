import { prisma } from '../config/db';
import bcrypt from 'bcrypt';
import AppError from '../utils/AppError';
import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from '../constants/http';
import VerificationCodeType from '../constants/verificationCodeType';
import { oneYearFromNow } from '../utils/date';
import { APP_ORIGIN } from '../constants/env';
import { refreshTokenSignOptions, signToken } from '../utils/jwt';
import { compareValue, hashValue } from '../utils/bcrypt';
import { sendEmailer } from '../utils/sendMailer';

interface SignUpParams {
    email: string;
    password: string;
    userAgent?: string;
}

export const createAccount = async (data: SignUpParams) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) throw new AppError(CONFLICT, 'Email already in use');

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: await hashValue(data.password, 10),
            fullName: data.email.split('@')[0],
        },
    });

    const userId = user.id;

    const verificationCode = await prisma.verificationCode.create({
        data: {
            userId,
            type: VerificationCodeType.EmailVerification,
            expiresAt: oneYearFromNow(),
        },
    });

    const url = `<a href={${APP_ORIGIN}/email/verify/${verificationCode.id}}>${APP_ORIGIN}/email/verify/${verificationCode.id}</a>`;

    await sendEmailer({ to: user.email, subject: 'Verification', html: url });

    // const session = await prisma.session.create({
    //     data: {
    //         userId,
    //         userAgent: data.userAgent,
    //     },
    // });

    // const accessToken = signToken({
    //     userId,
    //     sessionId: session.id,
    // });

    // const refreshToken = signToken(
    //     {
    //         sessionId: session.id,
    //     },
    //     refreshTokenSignOptions,
    // );

    // const { password, ...rest } = user;

    return {
        message: 'Please go to gmail to confirm',
        // user: rest,
        // accessToken,
        // refreshToken,
    };
};

export const verifyEmail = async (code: string) => {
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
        },
    });

    await prisma.verificationCode.delete({
        where: {
            id: validCode.id,
        },
    });
    const { password, ...rest } = updatedUser;
    return {
        user: rest,
    };
};

type LoginParams = {
    email: string;
    passwordUser: string;
    userAgent?: string;
};

export const loginUser = async ({
    email,
    passwordUser,
    userAgent,
}: LoginParams) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) throw new AppError(UNAUTHORIZED, 'Invalid email or password');

    const isValid = await compareValue(passwordUser, user.password);
    if (!isValid) throw new AppError(UNAUTHORIZED, 'Invalid email or password');

    const userId = user.id;
    const session = await prisma.session.create({
        data: {
            userId,
            userAgent,
        },
    });

    const accessToken = signToken({
        userId,
        sessionId: session.id,
    });

    const refreshToken = signToken(
        {
            sessionId: session.id,
        },
        refreshTokenSignOptions,
    );

    const { password, ...rest } = user;

    return {
        user: rest,
        accessToken,
        refreshToken,
    };
};
