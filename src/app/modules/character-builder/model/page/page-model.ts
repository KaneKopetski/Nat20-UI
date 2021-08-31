import {Sort} from "./sort-model";

export interface Page<T> {
  "content": Array<T>;
  "pageable": string;
  "totalPages": number;
  "last": boolean;
  "totalElements": number;
  "size": number;
  "number": number;
  "sort": Sort;
  "numberOfElements": number;
  "first": boolean;
  "empty": boolean;
}
