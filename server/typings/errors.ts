export declare class ErrorBase extends Error {
    constructor(message: string, meta: Meta, statusCode: number);
}

export interface Meta {
    [key: string]: string;
}
