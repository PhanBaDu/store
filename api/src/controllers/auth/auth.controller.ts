import { createAccount } from '../../services/auth.service';
import catchErrors from '../../utils/catchErrors';
import { signupSchema } from './auth.schemas';

export const signup = catchErrors(async (req, res, next) => {
    const request = signupSchema.parse({
        ...req.body,
        userAgent: req.headers['user-agent'],
    });
    await createAccount(request);
});
