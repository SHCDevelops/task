import { Request } from 'express';
import { ResponsePagingMetadataPaginationDto } from 'src/common/response/dtos/response.paging.dto';

export interface IRequestApp<> extends Request {
    __pagination?: ResponsePagingMetadataPaginationDto;
}
