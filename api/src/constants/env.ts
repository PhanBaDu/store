const getEnv = (key: string, defaultValue?: string) => {
    const value = process.env[key] || defaultValue;

    if (value === undefined)
        throw Error(`Missing String environment variable for ${key}`);

    return value;
};

export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const PORT = getEnv('PORT', '3001');
export const APP_ORIGIN = getEnv('APP_ORIGIN');

export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');

export const MAILER_HOST = getEnv('MAILER_HOST');
export const MAILER_PORT = getEnv('MAILER_PORT');
export const MAILER_USER = getEnv('MAILER_USER');
export const MAILER_PASSWORD = getEnv('MAILER_PASSWORD');
