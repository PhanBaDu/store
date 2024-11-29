import { prisma } from '../../config/db';
import { UNAUTHORIZED } from '../../constants/http';
import AppError from '../../utils/AppError';
import { compareValue } from '../../utils/bcrypt';
import { refreshTokenSignOptions, signToken } from '../../utils/jwt';

type LoginParams = {
    email: string;
    password: string;
    userAgent?: string;
};

export const loginUser = async ({
    email,
    password,
    userAgent,
}: LoginParams) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            verified: true,
        },
    });
    if (!user) throw new AppError(UNAUTHORIZED, 'Invalid email or password');

    const isValid = await compareValue(password, user.password);
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

    return {
        user: user,
        accessToken,
        refreshToken,
    };
};
