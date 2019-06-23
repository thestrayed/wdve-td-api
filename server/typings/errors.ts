export interface Meta {
    [key: string]: string;
}

export interface ErrorText {
    message: string;
    meta: object;
}
