import { faker } from "@faker-js/faker";


export const GithubDocParamsId = [
    {
        name: 'repo',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: faker.string.uuid(),
    },
];
