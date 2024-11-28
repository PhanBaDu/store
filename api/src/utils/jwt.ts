import jwt, { VerifyOptions, SignOptions } from 'jsonwebtoken';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import { prisma } from '../config/db';

export type AccessTokenPayload = {
    userId: string;
    sessionId: string;
};

export type RefreshTokenPayload = {
    sessionId: string;
};

type SignOptionsAndSecret = SignOptions & {
    secret: string;
};

const accessTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: '15m',
    secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: '30d',
    secret: JWT_REFRESH_SECRET,
};

export const signToken = (
    payload: AccessTokenPayload | RefreshTokenPayload,
    options?: SignOptionsAndSecret,
) => {
    const { secret, ...signOpts } = options || accessTokenSignOptions;
    return jwt.sign(payload, secret, {
        ...signOpts,
    });
};
