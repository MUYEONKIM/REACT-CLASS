import { FormEvent } from "react";

// prettier-ignore
// export const wrapAsyncFunc = <E>(asyncFunc: (event: E) => Promise<void>) => (event: E) => {
//     void asyncFunc(event);
// }; 기존

export const wrapAsyncFunc = <E>(asyncFunc: (event: E) => Promise<void>) => (event: E) => {
        void asyncFunc(event);
    };

export const wrapFormAsyncFunc =
    (asyncFunc: () => Promise<void>) => (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void asyncFunc();
    };
