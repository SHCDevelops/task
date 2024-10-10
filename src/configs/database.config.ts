import { registerAs } from "@nestjs/config";


export default registerAs(
    'database',
    (): Record<string, any> => ({
        uri:
            process.env?.DATABASE_URI ??
            'mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019',

        debug: process.env.DATABASE_DEBUG === 'true' || false,
        timeoutOptions: {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 10000,
            heartbeatFrequencyMS: 30000,
        },
    })
)