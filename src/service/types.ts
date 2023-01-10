export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type ResponseAPI<T> = ResponseSuccessWrapper<T> | ResponseFailWrapper<T>;

export interface ResponseSuccessWrapper<T> {
    data?: T;
    message: string;
    code: IntRange<0, 300>;
    timestamp: string;
}
export interface ResponseFailWrapper<T> {
    data?: T;
    message: string;
    code: IntRange<301, 599>;
    timestamp: string;
}