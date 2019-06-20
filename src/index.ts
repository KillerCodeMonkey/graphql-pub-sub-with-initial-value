import { PubSub } from 'graphql-subscriptions'

export interface AsyncIterableIteratorWithInitialState<T> extends AsyncIterableIterator<T> {
  initialValuePushed: boolean
}

export class PubSubIntialValue extends PubSub {
  private withInitialValue<T>(iterator: AsyncIterator<T>, getInitialValue: () => Promise<T>): AsyncIterableIteratorWithInitialState<T> {
    return {
      [Symbol.asyncIterator](): AsyncIterableIterator<T> { return this },
      initialValuePushed: false,
      next(value?: unknown): Promise<IteratorResult<T>> {
        if (this.initialValuePushed) {
          return iterator.next(value).then(({ value, done }: IteratorResult<T>): IteratorResult<T> => ({
            done,
            value
          }))
        } else {
          return getInitialValue().then((value: T): IteratorResult<T> => {
            this.initialValuePushed = true
            return { done: false, value }
          })
        }
      },
      return(value?: unknown): Promise<IteratorResult<T>> {
        return iterator.return!(value)
      },
      throw(value?: unknown): Promise<IteratorResult<T>> {
        return iterator.throw!(value)
      }
    }
  }

  public asyncIteratorWithInitialState<T>(topic: string | string[], initialValueFn: () => Promise<T>): AsyncIterableIteratorWithInitialState<T> {
    return this.withInitialValue(this.asyncIterator<T>(topic), (): Promise<T> => initialValueFn())
  }
}
