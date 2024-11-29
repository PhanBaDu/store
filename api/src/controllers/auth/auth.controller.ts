import { CREATED, OK } from '../../constants/http';
import { loginUser } from '../../services/authentication/signin.service';
import { createAccount } from '../../services/authentication/signup.service';
import { verifyEmail } from '../../services/authentication/verify-email.service';
import catchErrors from '../../utils/catchErrors';
import { setAuthCookies } from '../../utils/cookies';
import {
    signinSchema,
    signupSchema,
    verificationCodeSchema,
} from './auth.schemas';

export const signup = catchErrors(async (req, res, next) => {
    const request = signupSchema.parse({
        ...req.body,
    });
    const { message } = await createAccount(request);

    return res.status(CREATED).json({ success: true, data: message });
});

export const verifyEmailHandler = catchErrors(async (req, res, next) => {
    const verificationCode = verificationCodeSchema.parse({
        code: req.params.code,
        ...req.body,
    });

    const { message } = await verifyEmail(verificationCode);

    return res.status(OK).json({ success: true, data: message });
});

export const signin = catchErrors(async (req, res, next) => {
    const request = signinSchema.parse({
        ...req.body,
        userAgent: req.headers['user-agent'],
    });

    const { user, accessToken, refreshToken } = await loginUser(request);
    const { password, ...rest } = user;
    return setAuthCookies({ res, accessToken, refreshToken })
        .status(OK)
        .json({ success: true, data: { user: rest } });
});
