import { PubSub } from 'graphql-subscriptions';
export interface AsyncIterableIteratorWithInitialState<T> extends AsyncIterableIterator<T> {
    initialValuePushed: boolean;
}
export declare class PubSubWithIntialValue extends PubSub {
    private withInitialValue;
    asyncIteratorWithInitialValue<T>(topic: string | string[], initialValueFn: () => Promise<T>): AsyncIterableIteratorWithInitialState<T>;
}
