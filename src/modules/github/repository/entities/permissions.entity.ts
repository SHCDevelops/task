import { DatabaseEntityAbstract } from "src/common/database/abstracts/database.entity.abstract";
import { DatabaseEntity, DatabaseProp } from "src/common/database/decorators/database.decorator";


@DatabaseEntity({ timestamps: false, _id: false })
export class PermissionsEntity extends DatabaseEntityAbstract {

    @DatabaseProp({
        required: true
    })
    admin: boolean;

    @DatabaseProp({
        required: false
    })
    maintain?: boolean;

    @DatabaseProp({
        required: true
    })
    push: boolean;

    @DatabaseProp({
        required: false
    })
    triage?: boolean;

    @DatabaseProp({
        required: true
    })
    pull: boolean;
}