import { registerAs } from "@nestjs/config";
import ms from 'ms';

export default registerAs(
    'middleware',
    (): Record<string, any> => ({
        timeout: ms('30s'),
    })
)