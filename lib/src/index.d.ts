import { PubSub } from "graphql-subscriptions";
export interface AsyncIterableIteratorWithInitialState<T> extends AsyncIterableIterator<T> {
    initialValuePushed: boolean;
}
export const withCancel: <T, P>(asyncIterator: AsyncIterator<T | undefined>, onCancel: (args?: P) => void, args?: P) => AsyncIterator<T | undefined>;
export class PubSubWithIntialValue extends PubSub {
    asyncIteratorWithInitialValue<T>(topic: string | string[], initialValueFn: () => Promise<T>): AsyncIterableIteratorWithInitialState<T>;
    withCancel<T, P>(asyncIterator: AsyncIterator<T | undefined>, onCancel: (args?: P) => void, args?: P): AsyncIterator<T, any, undefined>;
}

//# sourceMappingURL=index.d.ts.map
