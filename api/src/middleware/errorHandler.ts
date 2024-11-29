import { ErrorRequestHandler, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constants/http';
import AppError from '../utils/AppError';
import z from 'zod';

const handleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        success: false,
        statusCode: error.statusCode,
        data: {
            error: error.message,
        },
    });
};

const handleZodError = (res: Response, error: z.ZodError) => {
    return res.status(BAD_REQUEST).json({
        success: false,
        statusCode: BAD_REQUEST,
        data: {
            error: error.message,
        },
    });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof AppError) {
        handleAppError(res, error);
        return;
    }

    if (error instanceof z.ZodError) {
        handleZodError(res, error);
        return;
    }
    console.log(error);

    res.status(INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: INTERNAL_SERVER_ERROR,
        data: {
            error: 'Internal Server Error',
        },
    });
};

export default errorHandler;
