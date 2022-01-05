export interface PaginatedList<GenericType> {
    count: number;
    next: any;
    previous: any;
    results: GenericType;
}