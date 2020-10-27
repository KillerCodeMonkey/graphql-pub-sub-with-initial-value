import { PubSub } from 'graphql-subscriptions';
export interface AsyncIterableIteratorWithInitialState<T> extends AsyncIterableIterator<T> {
    initialValuePushed: boolean;
}
export declare const withCancel: <T, P>(asyncIterator: AsyncIterator<T, any, undefined>, onCancel: (args?: P) => void, args?: P) => AsyncIterator<T, any, undefined>;
export declare class PubSubWithIntialValue extends PubSub {
    private withInitialValue;
    asyncIteratorWithInitialValue<T>(topic: string | string[], initialValueFn: () => Promise<T>): AsyncIterableIteratorWithInitialState<T>;
    withCancel<T, P>(asyncIterator: AsyncIterator<T | undefined>, onCancel: (args?: P) => void, args?: P): AsyncIterator<T, any, undefined>;
}
