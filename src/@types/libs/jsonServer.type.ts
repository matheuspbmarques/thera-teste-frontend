export type JsonServerPaginateReturn<Data> = {
    data: Data,
    first: number,
    items: number,
    last: number,
    next: number,
    pages: number,
    prev: unknown
};