import { Query } from "@nestjs/common";
import { IPaginationQueryOptions } from "../interfaces/pagination.interface";
import { PaginationOrderPipe } from "../pipes/pagination.order.pipe";
import { PaginationPagingPipe } from "../pipes/pagination.paging.pipe";
import { PaginationSearchPipe } from "../pipes/pagination.search.pipe";


// Pagination query helper
export function PaginationQuery(
    options?: IPaginationQueryOptions
): ParameterDecorator {
    return Query(
        PaginationSearchPipe(options?.availableSearch),
        PaginationPagingPipe(options?.defaultPerPage),
        PaginationOrderPipe(
            options?.defaultOrderBy,
            options?.defaultOrderDirection,
            options?.availableOrderBy
        )
    );
}