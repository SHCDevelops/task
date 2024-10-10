import { DatabaseProp } from 'src/common/database/decorators/database.decorator';
import { v4 as uuidV4 } from 'uuid';

export abstract class DatabaseEntityAbstract {
    @DatabaseProp({
        type: String,
        default: uuidV4,
    })
    _id: string;

    @DatabaseProp({
        required: false,
        index: 'asc',
        type: Date,
    })
    createdAt?: Date;

    @DatabaseProp({
        required: false,
        index: 'asc',
        type: Date,
    })
    updatedAt?: Date;
}
