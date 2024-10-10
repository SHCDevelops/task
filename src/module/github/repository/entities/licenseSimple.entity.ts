import { DatabaseEntityAbstract } from "src/common/database/abstracts/database.entity.abstract";
import { DatabaseEntity, DatabaseProp } from "src/common/database/decorators/database.decorator";

@DatabaseEntity({ timestamps: false, _id: false })
export class LicenseSimpleEntity extends DatabaseEntityAbstract {

    @DatabaseProp({
        required: true
    })
    key: string;

    @DatabaseProp({
        required: true
    })
    name: string;

    @DatabaseProp({
        required: false,
        nullable: true
    })
    url?: string | null;

    @DatabaseProp({
        required: false,
        nullable: true
    })
    spdx_id?: string | null;

    @DatabaseProp({
        required: true
    })
    node_id: string;

    @DatabaseProp({
        required: false
    })
    html_url: string;
}