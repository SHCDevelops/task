import { registerAs } from "@nestjs/config";


export default registerAs(
    'app',
    (): Record<string, any> => ({
        debug: process.env.APP_DEBUG === 'true' || false,
        http: {
            host: process.env.HTTP_HOST ?? 'localhost',
            port: process.env.HTTP_PORT
                ? Number.parseInt(process.env.HTTP_PORT)
                : 3000,
        },
    })
)