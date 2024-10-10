import { DatabaseEntityAbstract } from "src/common/database/abstracts/database.entity.abstract";
import { DatabaseEntity, DatabaseProp, DatabaseSchema } from "src/common/database/decorators/database.decorator";
import { IDatabaseDocument } from "src/common/database/interfaces/database.interface";

const OwnerTableName = 'Owners';

@DatabaseEntity({ collection: OwnerTableName, timestamps: true })
export class OwnerEntity extends DatabaseEntityAbstract {

    @DatabaseProp({
        required: false,
        nullable: true
    })
    name?: string | null;

    @DatabaseProp({
        required: false,
        nullable: true
    })
    email?: string | null;

    @DatabaseProp({
        required: true
    })
    login: string;

    @DatabaseProp({
        required: true
    })
    id: number;

    @DatabaseProp({
        required: true
    })
    node_id: string;

    @DatabaseProp({
        required: true
    })
    avatar_url: string;

    @DatabaseProp({
        required: false,
        nullable: true
    })
    gravatar_id?: string | null;

    @DatabaseProp({
        required: true
    })
    url: string;

    @DatabaseProp({
        required: true
    })
    html_url: string;

    @DatabaseProp({
        required: true
    })
    followers_url: string;

    @DatabaseProp({
        required: true
    })
    following_url: string;

    @DatabaseProp({
        required: true
    })
    gists_url: string;

    @DatabaseProp({
        required: true
    })
    starred_url: string;

    @DatabaseProp({
        required: true
    })
    subscriptions_url: string;

    @DatabaseProp({
        required: true
    })
    organizations_url: string;

    @DatabaseProp({
        required: true
    })
    repos_url: string;

    @DatabaseProp({
        required: true
    })
    events_url: string;

    @DatabaseProp({
        required: true
    })
    received_events_url: string;

    @DatabaseProp({
        required: true
    })
    type: string;

    @DatabaseProp({
        required: true
    })
    site_admin: boolean;

    @DatabaseProp({
        required: false,
        nullable: true
    })
    starred_at?: string | null;
}

export const OwnerSchema = DatabaseSchema(OwnerEntity);
export type OwnerDoc = IDatabaseDocument<OwnerEntity>;