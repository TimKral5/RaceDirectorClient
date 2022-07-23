export declare class Dictionary<T, T2> {
    constructor(keys?: T[], values?: T2[]);
    get(index: T): T2 | undefined;
    set(index: T, value: T2): void;
    private _keys;
    get keys(): T[];
    private _values;
    get values(): T2[];
    get length(): number;
    get string_object(): {
        [key: string]: T2;
    };
    get num_object(): {
        [key: number]: T2;
    };
    get elements(): [{
        key: T;
        value: T2;
    }];
}
