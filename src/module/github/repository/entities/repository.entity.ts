import { DatabaseEntityAbstract } from "src/common/database/abstracts/database.entity.abstract";
import { DatabaseEntity, DatabaseProp, DatabaseSchema } from "src/common/database/decorators/database.decorator";
import { OwnerEntity } from "./owner.entity";
import { LicenseSimpleEntity } from "./licenseSimple.entity";
import { PermissionsEntity } from "./permissions.entity";
import { IDatabaseDocument } from "src/common/database/interfaces/database.interface";

const RepositoryTableName = 'Repositories'

@DatabaseEntity({ collection: RepositoryTableName, timestamps: true })
export class RepositoryEntity extends DatabaseEntityAbstract {

    @DatabaseProp({
        required: true,
        index: true
    })
    id: number;

    @DatabaseProp({
        required: true
    })
    node_id: string;

    @DatabaseProp({
        required: true
    })
    name: string;

    @DatabaseProp({
        required: true
    })
    full_name: string;

    @DatabaseProp({
        required: false,
        ref: OwnerEntity.name,
        type: Number,
        nullable: true
    })
    owner?: number | null;

    @DatabaseProp({
        required: true
    })
    private: boolean;

    @DatabaseProp({
        required: true
    })
    html_url: string;

    @DatabaseProp({
        required: false,
        nullable: true
    })
    description?: string | null;

    @DatabaseProp({
        required: true
    })
    fork: boolean;

    @DatabaseProp({
        required: true
    })
    url: string;

    @DatabaseProp({
        required: true
    })
    created_at: Date;

    @DatabaseProp({
        required: true
    })
    updated_at: Date;

    @DatabaseProp({
        required: true
    })
    pushed_at: Date;

    @DatabaseProp({
        required: false,
        nullable: true
    })
    homepage?: string | null;

    @DatabaseProp({
        required: true
    })
    size: number;

    @DatabaseProp({
        required: true
    })
    stargazers_count: number;

    @DatabaseProp({
        required: true
    })
    watchers_count: number;

    @DatabaseProp({
        required: false,
        nullable: true
    })
    language?: string | null;

    @DatabaseProp({
        required: true
    })
    forks_count: number;

    @DatabaseProp({
        required: true
    })
    open_issues_count: number;

    @DatabaseProp({
        required: true
    })
    master_branch: string;

    @DatabaseProp({
        required: true
    })
    default_branch: string;

    @DatabaseProp({
        required: true,
        type: Number
    })
    score: number;

    @DatabaseProp({
        required: true
    })
    forks_url: string;

    @DatabaseProp({
        required: true
    })
    keys_url: string;

    @DatabaseProp({
        required: true
    })
    collaborators_url: string;

    @DatabaseProp({
        required: true
    })
    teams_url: string;

    @DatabaseProp({
        required: true
    })
    hooks_url: string;

    @DatabaseProp({
        required: true
    })
    issue_events_url: string;

    @DatabaseProp({
        required: true
    })
    events_url: string;

    @DatabaseProp({
        required: true
    })
    assignees_url: string;

    @DatabaseProp({
        required: true
    })
    branches_url: string;

    @DatabaseProp({
        required: true
    })
    tags_url: string;

    @DatabaseProp({
        required: true
    })
    blobs_url: string;

    @DatabaseProp({
        required: true
    })
    git_tags_url: string;

    @DatabaseProp({
        required: true
    })
    git_refs_url: string;

    @DatabaseProp({
        required: true
    })
    trees_url: string;

    @DatabaseProp({
        required: true
    })
    statuses_url: string;

    @DatabaseProp({
        required: true
    })
    languages_url: string;

    @DatabaseProp({
        required: true
    })
    stargazers_url: string;

    @DatabaseProp({
        required: true
    })
    contributors_url: string;

    @DatabaseProp({
        required: true
    })
    subscribers_url: string;

    @DatabaseProp({
        required: true
    })
    subscription_url: string;

    @DatabaseProp({
        required: true
    })
    commits_url: string;

    @DatabaseProp({
        required: true
    })
    git_commits_url: string;

    @DatabaseProp({
        required: true
    })
    comments_url: string;

    @DatabaseProp({
        required: true
    })
    issue_comment_url: string;

    @DatabaseProp({
        required: true
    })
    contents_url: string;

    @DatabaseProp({
        required: true
    })
    compare_url: string;

    @DatabaseProp({
        required: true
    })
    merges_url: string;

    @DatabaseProp({
        required: true
    })
    archive_url: string;

    @DatabaseProp({
        required: true
    })
    downloads_url: string;

    @DatabaseProp({
        required: true
    })
    issues_url: string;

    @DatabaseProp({
        required: true
    })
    pulls_url: string;

    @DatabaseProp({
        required: true
    })
    milestones_url: string;

    @DatabaseProp({
        required: true
    })
    notifications_url: string;

    @DatabaseProp({
        required: true
    })
    labels_url: string;

    @DatabaseProp({
        required: true
    })
    releases_url: string;

    @DatabaseProp({
        required: true
    })
    deployments_url: string;

    @DatabaseProp({
        required: true
    })
    git_url: string;

    @DatabaseProp({
        required: true
    })
    ssh_url: string;

    @DatabaseProp({
        required: true
    })
    clone_url: string;

    @DatabaseProp({
        required: true
    })
    svn_url: string;

    @DatabaseProp({
        required: true
    })
    forks: number;

    @DatabaseProp({
        required: true
    })
    open_issues: number;

    @DatabaseProp({
        required: true
    })
    watchers: number;

    @DatabaseProp({
        required: true,
        type: [String]
    })
    topics: string[];

    @DatabaseProp({
        required: false,
        nullable: true
    })
    mirror_url?: string | null;

    @DatabaseProp({
        required: true
    })
    has_issues: boolean;

    @DatabaseProp({
        required: true
    })
    has_projects: boolean;

    @DatabaseProp({
        required: true
    })
    has_pages: boolean;

    @DatabaseProp({
        required: true
    })
    has_wiki: boolean;

    @DatabaseProp({
        required: true
    })
    has_downloads: boolean;

    @DatabaseProp({
        required: true
    })
    has_discussions: boolean;

    @DatabaseProp({
        required: true
    })
    archived: boolean;

    @DatabaseProp({
        required: true
    })
    disabled: boolean;

    @DatabaseProp({
        required: true
    })
    visibility: string;

    @DatabaseProp({
        required: false,
        type: () => LicenseSimpleEntity,
        nullable: true
    })
    license?: LicenseSimpleEntity | null;

    @DatabaseProp({
        required: true,
        type: PermissionsEntity
    })
    permissions: PermissionsEntity;

    @DatabaseProp({
        required: true
    })
    temp_clone_token: string;

    @DatabaseProp({
        required: true
    })
    allow_merge_commit: boolean;

    @DatabaseProp({
        required: true
    })
    allow_squash_merge: boolean;

    @DatabaseProp({
        required: true
    })
    allow_rebase_merge: boolean;

    @DatabaseProp({
        required: true
    })
    allow_auto_merge: boolean;

    @DatabaseProp({
        required: true
    })
    delete_branch_on_merge: boolean;

    @DatabaseProp({
        required: true
    })
    allow_forking: boolean;

    @DatabaseProp({
        required: true
    })
    is_template: boolean;

    @DatabaseProp({
        required: true
    })
    web_commit_signoff_required: boolean;
}

export const RepositorySchema = DatabaseSchema(RepositoryEntity);
export type RepositoryDoc = IDatabaseDocument<RepositoryEntity>;