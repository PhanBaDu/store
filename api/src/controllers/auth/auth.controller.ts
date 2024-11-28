import { CREATED, OK } from '../../constants/http';
import {
    createAccount,
    loginUser,
    verifyEmail,
} from '../../services/auth.service';
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
        userAgent: req.headers['user-agent'],
    });
    const { message } = await createAccount(request);
    return res.status(CREATED).json({ success: true, data: message });
});

export const signin = catchErrors(async (req, res, next) => {
    const request = signinSchema.parse({
        ...req.body,
        userAgent: req.headers['user-agent'],
    });

    const { accessToken, refreshToken } = await loginUser(request);

    return setAuthCookies({ res, accessToken, refreshToken })
        .status(OK)
        .json({ success: true, data: { message: 'Login successful' } });
});

export const verifyEmailHandler = catchErrors(async (req, res, next) => {
    const verificationCode = verificationCodeSchema.parse(req.params.code);

    await verifyEmail(verificationCode);

    return res.status(OK).json({ message: 'Email was successfully verified' });
});
