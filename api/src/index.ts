// [IMPORT LIBRARY]
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

// [IMPORT ENV]
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';

// [IMPORT ERROR HANDLER]
import errorHandler from './middleware/errorHandler';

// [IMPORT ROUTES]
import authRoutes from './routes/auth.route';
import connectToDatabase from './config/db';

// [MIDDLEWARE]
const app = express();
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// [ROUTES]
app.use('/api/auth', authRoutes);

// [ERROR HANDLER]
app.use(errorHandler); // xử lí lỗi

// [RUN APP]
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
    connectToDatabase();
});
