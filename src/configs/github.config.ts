import { registerAs } from "@nestjs/config";

export default registerAs(
    'github',
    (): Record<string, any> => ({
        interval: 5,
        apiUri: 'https://api.github.com'
    })
);
