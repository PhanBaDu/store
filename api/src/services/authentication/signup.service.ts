import { prisma } from '../../config/db';
import { APP_ORIGIN } from '../../constants/env';
import { CONFLICT } from '../../constants/http';
import VerificationCodeType from '../../constants/verificationCodeType';
import AppError from '../../utils/AppError';
import { hashValue } from '../../utils/bcrypt';
import { oneYearFromNow } from '../../utils/date';
import { sendEmailer } from '../../utils/sendMailer';

interface SignUpParams {
    email: string;
}

export const createAccount = async (data: SignUpParams) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
        if (existingUser.verified) {
            throw new AppError(CONFLICT, 'Email already in use');
        }

        await prisma.verificationCode.deleteMany({
            where: { userId: existingUser.id },
        });

        const verificationCode = await prisma.verificationCode.create({
            data: {
                userId: existingUser.id,
                type: VerificationCodeType.EmailVerification,
                expiresAt: oneYearFromNow(),
            },
        });

        const verificationLink = `${APP_ORIGIN}/email/verify/${verificationCode.id}`;

        const url = `<a href="${verificationLink}">Verify your email</a> <p>This code will expire in 5 minutes.</p>`;

        await sendEmailer({
            to: existingUser.email,
            subject: 'Verification',
            html: url,
        });

        return {
            message: 'Please go to gmail to confirm',
        };
    }

    const user = await prisma.user.create({
        data: {
            email: data.email,
            fullName: data.email.split('@')[0],
            password: await hashValue(data.email, 10),
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

    const verificationLink = `${APP_ORIGIN}/email/verify/${verificationCode.id}`;

    const url = `<a href="${verificationLink}">Verify your email</a>`;

    await sendEmailer({
        to: user.email,
        subject: 'Verification',
        html: url,
    });

    return {
        message: 'Please go to gmail to confirm',
    };
};
